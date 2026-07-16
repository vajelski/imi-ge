
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import 'dotenv/config';
import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { GoogleAuth } from 'google-auth-library';
import fetch from 'node-fetch';
import dns from 'node:dns/promises';
import { isIP } from 'node:net';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.disable('x-powered-by');
app.use(compression());
app.use(express.json({ limit: process?.env?.API_PAYLOAD_MAX_SIZE || "7mb" }));

// Rate limit for form submissions (per IP)
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many submissions; try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const analyzerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many analysis requests; try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const optionalText = (value, maxLength) => {
  if (value === undefined || value === null) return '';
  if (typeof value !== 'string') return null;
  const text = value.trim();
  return text.length <= maxLength ? text : null;
};

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const isPrivateIPv4 = (address) => {
  const octets = address.split('.').map(Number);
  if (octets.length !== 4 || octets.some((octet) => !Number.isInteger(octet) || octet < 0 || octet > 255)) return true;
  const [a, b] = octets;
  return a === 0 || a === 10 || a === 127 || (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && (b === 0 || b === 168)) || (a === 198 && (b === 18 || b === 19)) ||
    (a === 198 && b === 51) || (a === 203 && b === 0) || a >= 224;
};

const ipv6ToBigInt = (address) => {
  let normalized = address.toLowerCase();
  if (normalized.includes('.')) {
    const lastColon = normalized.lastIndexOf(':');
    const ipv4 = normalized.slice(lastColon + 1).split('.').map(Number);
    if (ipv4.length !== 4 || ipv4.some((octet) => !Number.isInteger(octet) || octet < 0 || octet > 255)) return null;
    normalized = `${normalized.slice(0, lastColon)}:${((ipv4[0] << 8) | ipv4[1]).toString(16)}:${((ipv4[2] << 8) | ipv4[3]).toString(16)}`;
  }
  const [left, right] = normalized.split('::');
  const leftParts = left ? left.split(':') : [];
  const rightParts = right ? right.split(':') : [];
  if (!right && leftParts.length !== 8) return null;
  if (leftParts.length + rightParts.length > 8) return null;
  const parts = [...leftParts, ...Array(8 - leftParts.length - rightParts.length).fill('0'), ...rightParts];
  if (parts.length !== 8 || parts.some((part) => !/^[0-9a-f]{1,4}$/.test(part))) return null;
  return parts.reduce((result, part) => (result << 16n) + BigInt(`0x${part}`), 0n);
};

const isPrivateIPv6 = (address) => {
  const value = ipv6ToBigInt(address);
  if (value === null) return true;
  const high96 = value >> 32n;
  if (high96 === 0n || high96 === 0xffffn) {
    const ipv4Value = value & 0xffffffffn;
    const ipv4 = [24n, 16n, 8n, 0n].map((shift) => Number((ipv4Value >> shift) & 0xffn)).join('.');
    if (isPrivateIPv4(ipv4)) return true;
  }
  const cidr = (prefix, bits) => (value >> BigInt(128 - prefix)) === (bits >> BigInt(128 - prefix));
  return cidr(7, 0xfc000000000000000000000000000000n) || // Unique local
    cidr(10, 0xfe800000000000000000000000000000n) || // Link local
    cidr(8, 0xff000000000000000000000000000000n) || // Multicast
    cidr(32, 0x20010db8000000000000000000000000n) || // Documentation
    value === 0n || value === 1n;
};

const isPrivateIp = (address) => isIP(address) === 4 ? isPrivateIPv4(address) : isPrivateIPv6(address);

const withTimeout = (promise, timeoutMs) => {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('DNS resolution timed out')), timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
};

const parsePublicWebUrl = (value) => {
  try {
    if (typeof value !== 'string' || value.length > 2048) return null;
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, '').replace(/\.$/, '');
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || (url.port && !['80', '443'].includes(url.port)) || !host) return null;
    if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal') || host === '::1') return null;
    if (isIP(host) && isPrivateIp(host)) return null;
    return url;
  } catch { return null; }
};

const resolvePublicFetchTarget = async (rawUrl, timeoutMs = 5000) => {
  const url = parsePublicWebUrl(rawUrl);
  if (!url) throw new Error('Unsafe public URL');
  const hostname = url.hostname.replace(/^\[|\]$/g, '');
  let address;
  let family;
  if (isIP(hostname)) {
    address = hostname;
    family = isIP(hostname);
  } else {
    const resolved = await withTimeout(dns.lookup(hostname, { all: true, verbatim: true }), timeoutMs);
    if (!resolved.length || resolved.some(({ address: candidate }) => isPrivateIp(candidate))) {
      throw new Error('URL resolves to a private or reserved address');
    }
    ({ address, family } = resolved[0]);
  }
  if (isPrivateIp(address)) throw new Error('URL resolves to a private or reserved address');
  return {
    url,
    // Pin the lookup result so a DNS rebinding cannot change the destination during this request.
    lookup: (_hostname, _options, callback) => callback(null, address, family),
  };
};

const fetchPublicUrl = async (rawUrl, options = {}, timeoutMs = 5000) => {
  let currentUrl = rawUrl;
  for (let redirectCount = 0; redirectCount <= 3; redirectCount += 1) {
    const target = await resolvePublicFetchTarget(currentUrl, timeoutMs);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let response;
    try {
      response = await fetch(target.url.toString(), {
        ...options,
        redirect: 'manual',
        lookup: target.lookup,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }
    if (![301, 302, 303, 307, 308].includes(response.status)) return response;
    const location = response.headers.get('location');
    if (response.body && typeof response.body.destroy === 'function') response.body.destroy();
    if (!location || redirectCount === 3) throw new Error('Unsafe or excessive redirect chain');
    currentUrl = new URL(location, target.url).toString();
  }
  throw new Error('Unsafe redirect chain');
};

app.get('/api/health', (_req, res) => res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() }));

// Use __dirname to reliably locate content.json relative to server.js
const CONTENT_FILE = path.join(__dirname, 'data', 'content.json');


console.log('--- Server Starting ---');
console.log('Registering /api/content route...');

// --- Content API ---
app.get('/api/content', (req, res) => {
  console.log('GET /api/content hit');
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const data = fs.readFileSync(CONTENT_FILE, 'utf8');
      // Cache content for 1 hour (3600s) to improve load performance
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.json(JSON.parse(data));
    } else {
      res.status(404).json({ error: 'Content file not found' });
    }
  } catch (error) {
    console.error('Error reading content file:', error);
    res.status(500).json({ error: 'Failed to read content' });
  }
});

app.post('/api/content', (req, res) => {
  if (process.env.ALLOW_CONTENT_WRITE !== 'true') {
    return res.status(403).json({ error: 'Content writes are disabled' });
  }
  console.log('POST /api/content hit');
  try {
    const newContent = req.body;
    if (!newContent || typeof newContent !== 'object' || Array.isArray(newContent)) {
      return res.status(400).json({ error: 'Invalid content payload' });
    }
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(newContent, null, 2), 'utf8');
    res.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error writing content file:', error);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// --- Email Transporter (Brevo) ---
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `Imi.ge <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      subject: subject,
      text: text,
      html: html,
    });
    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Simple email format check
const isValidEmail = (v) => typeof v === 'string' && v.length <= 254 && !/[\r\n]/.test(v) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

app.post('/api/leads', formLimiter, async (req, res) => {
  try {
    if (!isPlainObject(req.body)) return res.status(400).json({ error: 'Invalid request' });
    const { email, url, reportType, _hp, website } = req.body;
    if (_hp !== undefined && typeof _hp !== 'string') return res.status(400).json({ error: 'Invalid request' });
    if (typeof _hp === 'string' && _hp.trim()) return res.status(400).json({ error: 'Invalid request' });
    if (website !== undefined && typeof website !== 'string') return res.status(400).json({ error: 'Invalid request' });
    if (typeof website === 'string' && website.trim()) return res.status(400).json({ error: 'Invalid request' });
    const emailValue = optionalText(email, 254);
    const urlValue = optionalText(url, 2048);
    const reportTypeValue = optionalText(reportType, 100);
    if (emailValue === null || urlValue === null || reportTypeValue === null) return res.status(400).json({ error: 'Invalid request' });
    if (!emailValue) return res.status(400).json({ error: 'Email required' });
    if (!isValidEmail(emailValue)) return res.status(400).json({ error: 'Invalid email format' });

    // Lead PII is delivered to the configured mailbox only; it is not retained in the repository or on disk.
    const receivedAt = new Date().toISOString();

    // Send Email Notification
    const subject = 'New audit lead';
    const text = `New lead generated from Audit Widget.\nEmail: ${emailValue}\nURL: ${urlValue}\nType: ${reportTypeValue}\nDate: ${receivedAt}`;
    const html = `
      <h3>New Lead captured!</h3>
      <p><strong>Email:</strong> ${escapeHtml(emailValue)}</p>
      <p><strong>URL:</strong> ${escapeHtml(urlValue)}</p>
      <p><strong>Type:</strong> ${escapeHtml(reportTypeValue)}</p>
      <p><strong>Date:</strong> ${escapeHtml(receivedAt)}</p>
    `;
    const emailSent = await sendEmail(subject, text, html);
    if (!emailSent) {
      return res.status(500).json({ error: 'Failed to send lead' });
    }

    res.json({ success: true, message: 'Lead received' });
  } catch (error) {
    console.error('Lead save error:', error);
    res.status(500).json({ error: 'Failed to save lead' });
  }
});

// --- Contact Form API ---
app.post('/api/contact', formLimiter, async (req, res) => {
  try {
    if (!isPlainObject(req.body)) return res.status(400).json({ error: 'Invalid request' });
    const { name, company, email, interests, message, _hp, website } = req.body;
    if (_hp !== undefined && typeof _hp !== 'string') return res.status(400).json({ error: 'Invalid request' });
    if (typeof _hp === 'string' && _hp.trim()) return res.status(400).json({ error: 'Invalid request' });
    if (website !== undefined && typeof website !== 'string') return res.status(400).json({ error: 'Invalid request' });
    if (typeof website === 'string' && website.trim()) return res.status(400).json({ error: 'Invalid request' });
    const nameValue = optionalText(name, 200);
    const companyValue = optionalText(company, 200);
    const emailValue = optionalText(email, 254);
    const msg = optionalText(message, 5000);
    const interestValues = interests === undefined ? [] : interests;
    if (nameValue === null || companyValue === null || emailValue === null || msg === null ||
      !Array.isArray(interestValues) || interestValues.length > 20 ||
      interestValues.some((interest) => typeof interest !== 'string' || interest.length > 100)) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    if (!emailValue || !msg) return res.status(400).json({ error: 'Email and message are required' });
    if (!isValidEmail(emailValue)) return res.status(400).json({ error: 'Invalid email format' });
    if (msg.length < 10) return res.status(400).json({ error: 'Message too short' });
    if (msg.length > 5000) return res.status(400).json({ error: 'Message too long' });

    const subject = 'New contact form submission';
    const text = `
      Name: ${nameValue}
      Company: ${companyValue}
      Email: ${emailValue}
      Interests: ${interestValues.length ? interestValues.join(', ') : 'None'}
      Message: ${msg}
    `;
    const html = `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${escapeHtml(nameValue)}</p>
      <p><strong>Company:</strong> ${escapeHtml(companyValue)}</p>
      <p><strong>Email:</strong> ${escapeHtml(emailValue)}</p>
      <p><strong>Interests:</strong> ${escapeHtml(interestValues.length ? interestValues.join(', ') : 'None')}</p>
      <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #333;">
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(msg).replace(/\r?\n/g, '<br>')}</p>
      </div>
    `;

    const emailSent = await sendEmail(subject, text, html);

    if (emailSent) {
      res.json({ success: true, message: 'Message sent successfully' });
    } else {
      res.status(500).json({ error: 'Failed to send email' });
    }

  } catch (error) {
    console.error('Contact API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/analyze', analyzerLimiter, async (req, res) => {
  try {
    if (!isPlainObject(req.body)) return res.status(400).json({ error: 'A public HTTP(S) URL is required' });
    const { url } = req.body;
    const parsedUrl = parsePublicWebUrl(url);
    if (!parsedUrl) return res.status(400).json({ error: 'A public HTTP(S) URL is required' });
    try {
      await resolvePublicFetchTarget(parsedUrl.toString());
    } catch {
      return res.status(400).json({ error: 'The URL must resolve to a public address' });
    }
    const publicUrl = parsedUrl.toString();

    console.log(`Analyzing: ${publicUrl}`);

    // Helper: fetch with AbortController timeout
    const fetchWithTimeout = (fetchUrl, options = {}, timeoutMs = 20000) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      return fetch(fetchUrl, { ...options, redirect: 'error', signal: controller.signal })
        .finally(() => clearTimeout(timer));
    };

    // Google PageSpeed Insights API
    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY || process.env.PSI_API_KEY || '';
     const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(publicUrl)}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo${apiKey ? `&key=${apiKey}` : ''}`;

    let data;
    try {
      const apiRes = await fetchWithTimeout(apiUrl, {}, 22000);
      const text = await apiRes.text();
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Google API returned non-JSON');
      }

      // If API Key fails (e.g. invalid key), try again without key
      if (data?.error && apiKey) {
        console.warn('API Key failed, retrying without key...', data.error?.message);
         const retryUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(publicUrl)}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo`;
        const retryRes = await fetchWithTimeout(retryUrl, {}, 18000);
        const retryText = await retryRes.text();
        data = JSON.parse(retryText);
      }
    } catch (fetchErr) {
      console.warn('Google API fetch failed:', fetchErr.message);
      // Fallback mock
       const hash = publicUrl.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const pr = (s) => Math.floor((Math.sin(hash + s) * 10000) % 36 + 60);
      let securityScore = 0;
      try {
         const headRes = await fetchPublicUrl(publicUrl, { method: 'HEAD' }, 5000);
        ['strict-transport-security', 'x-frame-options'].forEach(h => {
          if (headRes.headers.get(h)) securityScore += 25;
        });
      } catch {}
      return res.json({
         url: publicUrl,
        scores: { performance: pr(1), accessibility: pr(2), bestPractices: pr(3), seo: pr(4) },
        securityScore,
        recommendations: [{ id: 'check', title: 'Google API temporarily unavailable', description: 'Please try again later.' }],
        isMock: true,
        apiError: fetchErr.message,
      });
    }

    if (data.error) {
      console.warn('PSI API Error, using fallback:', data.error.message);
      // Fallback — Google quota/error-ის დროს ვაბრუნებთ სავარაუდო მონაცემებს
       const hash = publicUrl.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const pseudoRandom = (seed) => {
        const x = Math.sin(hash + seed) * 10000;
        return x - Math.floor(x);
      };

      const mockScores = {
        performance: Math.floor(pseudoRandom(1) * (95 - 60) + 60),
        accessibility: Math.floor(pseudoRandom(2) * (100 - 80) + 80),
        bestPractices: Math.floor(pseudoRandom(3) * (100 - 75) + 75),
        seo: Math.floor(pseudoRandom(4) * (100 - 85) + 85),
      };

      const mockRecommendations = [
        { id: 'unused-javascript', title: 'Reduce unused JavaScript', description: 'Remove unused JavaScript to reduce bytes consumed by network activity.' },
        { id: 'images-optimization', title: 'Efficiently encode images', description: 'Optimized images load faster and consume less cellular data.' },
        { id: 'render-blocking-resources', title: 'Eliminate render-blocking resources', description: 'Resources are blocking the first paint of your page.' },
      ];

      let securityScore = 0;
      const securityHeaders = {
        'Strict-Transport-Security': 30,
        'Content-Security-Policy': 30,
        'X-Frame-Options': 20,
        'X-Content-Type-Options': 20,
      };

      try {
         const headRes = await fetchPublicUrl(publicUrl, { method: 'HEAD' }, 5000);
        const headers = headRes.headers;
        Object.keys(securityHeaders).forEach(header => {
          if (headers.get(header.toLowerCase())) {
            securityScore += securityHeaders[header];
          }
        });
      } catch (err) {
        console.warn('Security header check failed:', err.message);
      }

      return res.json({
         url: publicUrl,
        scores: mockScores,
        securityScore,
        recommendations: mockRecommendations,
        isMock: true,
        apiError: data.error.message,
      });
    }

    const lighthouse = data.lighthouseResult;
    if (!lighthouse || !lighthouse.categories) {
      console.warn('PSI API returned unexpected format (no lighthouseResult), using fallback');
       const hash = publicUrl.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const pseudoRandom = (seed) => {
        const x = Math.sin(hash + seed) * 10000;
        return x - Math.floor(x);
      };
      return res.json({
         url: publicUrl,
        scores: {
          performance: Math.floor(pseudoRandom(1) * 35 + 60),
          accessibility: Math.floor(pseudoRandom(2) * 20 + 80),
          bestPractices: Math.floor(pseudoRandom(3) * 25 + 75),
          seo: Math.floor(pseudoRandom(4) * 15 + 85),
        },
        securityScore: 0,
        recommendations: [{ id: 'api-format', title: 'Unexpected API response', description: 'Google PageSpeed returned an unexpected format. Please try again.' }],
        isMock: true,
        apiError: 'lighthouseResult missing from response',
      });
    }

    const categories = lighthouse.categories;

    const scores = {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
    };

    const recommendations = [];
    // Check some key audits
    if (lighthouse.audits) {
      Object.keys(lighthouse.audits).forEach(key => {
        const audit = lighthouse.audits[key];
        if (audit.score !== null && audit.score < 0.5 && recommendations.length < 5) {
          recommendations.push({
            id: key,
            title: audit.title,
            description: audit.description
          });
        }
      });
    }

    // Security Headers Check (Manual fetch with timeout)
    let securityScore = 0;
    const securityHeaders = {
      'Strict-Transport-Security': 30,
      'Content-Security-Policy': 30,
      'X-Frame-Options': 20,
      'X-Content-Type-Options': 20
    };

    try {
       const headRes = await fetchPublicUrl(publicUrl, { method: 'HEAD' }, 5000);
      const headers = headRes.headers;

      Object.keys(securityHeaders).forEach(header => {
        if (headers.get(header.toLowerCase())) {
          securityScore += securityHeaders[header];
        }
      });
    } catch (err) {
      console.warn('Security header check failed:', err.message);
    }

    res.json({
       url: lighthouse.finalUrl || publicUrl,
      scores,
      securityScore,
      recommendations: recommendations.slice(0, 5)
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze website' });
  }
});

const PORT = process.env.API_BACKEND_PORT || 3004;

// Production: backend serves API only. Frontend runs via next start -p 3003
// API is proxied to this backend via Next.js rewrites

const API_BACKEND_HOST = process?.env?.API_BACKEND_HOST || "127.0.0.1";
const GOOGLE_CLOUD_LOCATION = process?.env?.GOOGLE_CLOUD_LOCATION || '';
const GOOGLE_CLOUD_PROJECT = process?.env?.GOOGLE_CLOUD_PROJECT || '';

if (!GOOGLE_CLOUD_PROJECT || !GOOGLE_CLOUD_LOCATION) {
  console.warn("Warning: GOOGLE_CLOUD_PROJECT and GOOGLE_CLOUD_LOCATION not set. /api-proxy will return 503.");
}

const API_CLIENT_MAP = [
  {
    name: "VertexGenAi:generateContent",
    patternForProxy: "https://aiplatform.googleapis.com/{{version}}/publishers/google/models/{{model}}:generateContent",
    getApiEndpoint: (context, params) => {
      return `https://aiplatform.clients6.google.com/${params['version']}/projects/${context.projectId}/locations/${context.region}/publishers/google/models/${params['model']}:generateContent`;
    },
    isStreaming: false,
    transformFn: null,
  },
  {
    name: "VertexGenAi:predict",
    patternForProxy: "https://aiplatform.googleapis.com/{{version}}/publishers/google/models/{{model}}:predict",
    getApiEndpoint: (context, params) => {
      return `https://aiplatform.clients6.google.com/${params['version']}/projects/${context.projectId}/locations/${context.region}/publishers/google/models/${params['model']}:predict`;
    },
    isStreaming: false,
    transformFn: null,
  },
  {
    name: "VertexGenAi:streamGenerateContent",
    patternForProxy: "https://aiplatform.googleapis.com/{{version}}/publishers/google/models/{{model}}:streamGenerateContent",
    getApiEndpoint: (context, params) => {
      return `https://aiplatform.clients6.google.com/${params['version']}/projects/${context.projectId}/locations/${context.region}/publishers/google/models/${params['model']}:streamGenerateContent`;
    },
    isStreaming: true,
    transformFn: (response) => {
      let normalizedResponse = response.trim();
      while (normalizedResponse.startsWith(',') || normalizedResponse.startsWith('[')) {
        normalizedResponse = normalizedResponse.substring(1).trim();
      }
      while (normalizedResponse.endsWith(',') || normalizedResponse.endsWith(']')) {
        normalizedResponse = normalizedResponse.substring(0, normalizedResponse.length - 1).trim();
      }

      if (!normalizedResponse.length) {
        return { result: null, inProgress: false };
      }

      if (!normalizedResponse.endsWith('}')) {
        return { result: normalizedResponse, inProgress: true };
      }

      try {
        const parsedResponse = JSON.parse(`${normalizedResponse}`);
        const transformedResponse = `data: ${JSON.stringify(parsedResponse)}\n\n`;
        return { result: transformedResponse, inProgress: false };
      } catch (error) {
        throw new Error(`Failed to parse response: ${error}.`);
      }
    },
  },
  {
    name: "ReasoningEngine:query",
    patternForProxy: "https://{{endpoint_location}}-aiplatform.googleapis.com/{{version}}/projects/{{project_id}}/locations/{{location_id}}/reasoningEngines/{{engine_id}}:query",
    getApiEndpoint: (context, params) => {
      return `https://${params['endpoint_location']}-aiplatform.clients6.google.com/v1beta1/projects/${params['project_id']}/locations/${params['location_id']}/reasoningEngines/${params['engine_id']}:query`;
    },
    isStreaming: false,
    transformFn: null,
  },
  {
    name: "ReasoningEngine:streamQuery",
    patternForProxy: "https://{{endpoint_location}}-aiplatform.googleapis.com/{{version}}/projects/{{project_id}}/locations/{{location_id}}/reasoningEngines/{{engine_id}}:streamQuery",
    getApiEndpoint: (context, params) => {
      return `https://${params['endpoint_location']}-aiplatform.clients6.google.com/v1beta1/projects/${params['project_id']}/locations/${params['location_id']}/reasoningEngines/${params['engine_id']}:streamQuery`;
    },
    isStreaming: true,
    transformFn: null,
  },
].map((client) => ({ ...client, patternInfo: parsePattern(client.patternForProxy) }));

// Uses Google Application Default Credentials (ADC).
// Users need to run "gcloud auth application-default login" in order to use the proxy.
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parsePattern(pattern) {
  const paramRegex = /\{\{(.*?)\}\}/g;
  const params = [];
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = paramRegex.exec(pattern)) !== null) {
    params.push(match[1]);
    const literalPart = pattern.substring(lastIndex, match.index);
    parts.push(escapeRegex(literalPart));
    parts.push(`(?<${match[1]}>[^/]+)`);
    lastIndex = paramRegex.lastIndex;
  }
  parts.push(escapeRegex(pattern.substring(lastIndex)));
  const regexString = parts.join('');

  return { regex: new RegExp(`^${regexString}$`), params };
}

function extractParams(patternInfo, url) {
  const match = url.match(patternInfo.regex);
  if (!match) return null;
  const params = {};
  patternInfo.params.forEach((paramName, index) => {
    params[paramName] = match[index + 1];
  });
  return params;
}

async function getAccessToken(res) {
  try {
    const authClient = await auth.getClient();
    const token = await authClient.getAccessToken();
    return token.token;
  } catch (error) {
    console.error('[Node Proxy] Authentication error:', error);
    if (error.code === 'ERR_GCLOUD_NOT_LOGGED_IN' || (error.message && error.message.includes('Could not load the default credentials'))) {
      res.status(401).json({
        error: 'Authentication Required',
        message: 'Google Cloud Application Default Credentials not found or invalid. Please run "gcloud auth application-default login" and try again.',
      });
    } else {
      res.status(500).json({ error: `Authentication failed: ${error.message}` });
    }
    return null;
  }
}

function getRequestHeaders(accessToken) {
  return {
    'Authorization': `Bearer ${accessToken}`,
    'X-Goog-User-Project': GOOGLE_CLOUD_PROJECT,
    'Content-Type': 'application/json',
  };
}

// --- Proxy Endpoint ---
app.post('/api-proxy', async (req, res) => {
  if (process.env.ENABLE_VERTEX_PROXY !== 'true') {
    return res.status(404).json({ error: 'Not found' });
  }
  if (!GOOGLE_CLOUD_PROJECT || !GOOGLE_CLOUD_LOCATION) {
    return res.status(503).json({
      error: 'Vertex AI proxy not configured',
      message: 'GOOGLE_CLOUD_PROJECT and GOOGLE_CLOUD_LOCATION must be set in backend .env.local',
    });
  }
  // Check for the custom header added by the shim
  if (req.headers['x-app-proxy'] !== 'local-vertex-ai-app') {
    return res.status(403).send('Forbidden: Request must originate from the local Vertex App shim.');
  }

  if (!isPlainObject(req.body)) {
    return res.status(400).send('Bad Request: invalid proxy payload.');
  }
  const { originalUrl, method, headers, body } = req.body;
  if (typeof originalUrl !== 'string' || !originalUrl ||
    (method !== undefined && method !== 'POST') ||
    (headers !== undefined && !isPlainObject(headers)) ||
    (body !== undefined && typeof body !== 'string')) {
    return res.status(400).send('Bad Request: originalUrl is required.');
  }

  // 1. Find the matching API client
  const apiClient = API_CLIENT_MAP.find(p => {
    // We store extractedParams on req for use later if needed, though getVertexUrl takes it as arg.
    req.extractedParams = extractParams(p.patternInfo, originalUrl);
    return req.extractedParams !== null;
  });

  if (!apiClient) {
    console.error(`[Node Proxy] No API client handler found for URL: ${originalUrl}`);
    return res.status(404).json({ error: `No proxy handler found for URL: ${originalUrl}` });
  }

  const extractedParams = req.extractedParams;
  console.log(`[Node Proxy] Matched API client: ${apiClient.name}`);
  try {
    // 2. Get authenticated access token
    const accessToken = await getAccessToken(res);
    if (!accessToken) return;

    // 3. Construct the full API URL using env-set GOOGLE_CLOUD_PROJECT/LOCATION and extracted params
    const context = { projectId: GOOGLE_CLOUD_PROJECT, region: GOOGLE_CLOUD_LOCATION };
    const apiUrl = apiClient.getApiEndpoint(context, extractedParams);
    console.log(`[Node Proxy] Forwarding to Vertex API: ${apiUrl}`);

    // 4. Prepare headers for the API call
    const apiHeaders = getRequestHeaders(accessToken);

    const apiFetchOptions = {
      method: 'POST',
      headers: apiHeaders,
      body: body ? body : undefined,
    };

    // 5. Make the call to the API
    const apiResponse = await fetch(apiUrl, apiFetchOptions);

    // 6. Respond to the client based on stream type
    if (apiClient.isStreaming) {
      console.log(`[Node Proxy] Sending STREAMING response for ${apiClient.name}`);
      // Set headers for a streaming JSON response
      res.writeHead(apiResponse.status, {
        'Content-Type': 'text/event-stream',
        'Transfer-Encoding': 'chunked',
        'Connection': 'keep-alive',
      });
      // Immediately send headers
      res.flushHeaders();

      if (!apiResponse.body) {
        console.error('[Node Proxy] Streaming response has no body.');
        return res.end(JSON.stringify({ error: 'Streaming response body is null' }));
      }

      const decoder = new TextDecoder();
      let deltaChunk = '';
      apiResponse.body.on('data', (encodedChunk) => {
        if (res.writableEnded) return; // Prevent writing after res.end()

        try {
          if (!apiClient.transformFn) {
            res.write(encodedChunk);
          } else {
            const decodedChunk = decoder.decode(encodedChunk, { stream: true });
            deltaChunk = deltaChunk + decodedChunk;

            const { result, inProgress } = apiClient.transformFn(deltaChunk);
            if (result && !inProgress) {
              deltaChunk = '';
              res.write(new TextEncoder().encode(result));
            }
          }
        } catch (error) {
          console.error(`[Node Proxy] Error processing streaming response for ${apiClient.name}`);
          console.error(error);
        }
      });

      apiResponse.body.on('end', () => {
        deltaChunk = '';
        console.log(`[Node Proxy] Vertex stream finished and all data processed for ${apiClient.name}`);
        res.end();
      });

      apiResponse.body.on('error', (streamError) => {
        console.error('[Node Proxy] Error from Vertex stream:', streamError);
        if (!res.writableEnded) {
          res.end(JSON.stringify({ proxyError: 'Stream error from Vertex AI' }));
        }
      });

      res.on('error', (resError) => {
        console.error('[Node Proxy] Error writing to client response:', resError);
        // The source stream might need to be destroyed if an error occurs here.
        if (apiResponse.body && typeof apiResponse.body.destroy === 'function') {
          apiResponse.body.destroy(resError);
        }
      });
    } else {
      // Non-streaming response handling
      console.log(`[Node Proxy] Sending JSON response for ${apiClient.name}`);
      const data = await apiResponse.json();
      res.status(apiResponse.status).json(data);
    }
  } catch (error) {
    console.error(`[Node Proxy] Error proxying request for ${apiClient.name}`);
    console.error(error)
    res.status(500).json({ error: 'Vertex AI proxy request failed' });
  }
});

app.listen(PORT, API_BACKEND_HOST, () => {
  console.log(`Vertex AI Backend listening at http://localhost:${PORT}`);
});

