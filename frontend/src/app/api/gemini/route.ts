import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { createRateLimiter, getTrustedClientKey } from '@/lib/server/rateLimit';

export const runtime = 'nodejs';

type ChatMessage = { role: 'user' | 'model'; text: string };
type RequestBody = {
  operation?: 'chat' | 'global' | 'voice' | 'image' | 'vision';
  history?: ChatMessage[];
  message?: string;
  prompt?: string;
  base64Image?: string;
  mimeType?: string;
};

const MAX_BODY_BYTES = 6 * 1024 * 1024;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 20;
const takeRateLimitSlot = createRateLimiter(WINDOW_MS, MAX_REQUESTS);

const json = (body: Record<string, unknown>, status = 200) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

const readBody = async (request: NextRequest, maxBytes: number) => {
  const reader = request.body?.getReader();
  if (!reader) return '';
  const decoder = new TextDecoder();
  let body = '';
  let bytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) return body + decoder.decode();
    bytes += value.byteLength;
    if (bytes > maxBytes) {
      await reader.cancel();
      throw new Error('Request body too large');
    }
    body += decoder.decode(value, { stream: true });
  }
};

const isSameOrigin = (request: NextRequest) => {
  const origin = request.headers.get('origin');
  return !origin || origin === request.nextUrl.origin;
};

const isText = (value: unknown, maxLength: number): value is string =>
  typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;

const parseImage = (base64Image: unknown, mimeType: unknown) => {
  if (typeof base64Image !== 'string' || typeof mimeType !== 'string') return null;
  const match = base64Image.match(/^data:(image\/(?:png|jpeg|webp|gif));base64,([A-Za-z0-9+/=]+)$/);
  if (!match || match[1] !== mimeType) return null;
  const data = match[2];
  const bytes = Buffer.from(data, 'base64');
  if (bytes.length === 0 || bytes.length > MAX_IMAGE_BYTES) return null;
  return { data, mimeType };
};

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  return apiKey ? new GoogleGenAI({ apiKey }) : null;
};

const chatConfig = {
  systemInstruction: `შენ ხარ IMI.GE-ის ქართული AI ასისტენტი. ისაუბრე ბუნებრივად, ადამიანურად, თბილად და პროფესიონალურად. შენი ამოცანაა მომხმარებელს დაეხმარო IMI.GE-ის სერვისების გაგებაში: AI CRM ინტეგრაცია, AI-first CRM ტრანსფორმაცია, ხმოვანი AI ასისტენტები, RAG სისტემები, ბიზნეს ავტომატიზაცია, AI Operator და Social Commerce AI. უპასუხე ქართულად. არ მოიგონო ფასი, კლიენტის შედეგი, API, ინტეგრაცია ან ფუნქცია, რომელიც ამ კონტექსტში არ არის დადასტურებული. თუ კითხვა სცდება IMI.GE-ის ცოდნის სფეროს, თქვი ეს პირდაპირ და შესთავაზე კონსულტაციის მოთხოვნა. მოკლე კითხვაზე უპასუხე მოკლედ, რთულზე კი ახსენი ნაბიჯებად. არ გამოიყენო ხელოვნური მარკეტინგული ფრაზები და არ წარმოაჩინო თავი ადამიანად.`,
  temperature: 0.7,
};

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return json({ error: 'Cross-origin requests are not allowed.' }, 403);
  if (!takeRateLimitSlot(getTrustedClientKey(request))) return json({ error: 'Too many AI requests; try again later.' }, 429);

  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) return json({ error: 'Request is too large.' }, 413);
  let rawBody: string;
  try {
    rawBody = await readBody(request, MAX_BODY_BYTES);
  } catch {
    return json({ error: 'Request is too large.' }, 413);
  }

  let body: RequestBody;
  try {
    body = JSON.parse(rawBody) as RequestBody;
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ error: 'Invalid request.' }, 400);

  const ai = getAI();
  if (!ai) return json({ error: 'AI provider is not configured.' }, 503);

  try {
    if (body.operation === 'chat' || body.operation === 'global') {
      const history = Array.isArray(body.history) ? body.history : [];
      if (history.length > 12 || history.some((item) => !item || !['user', 'model'].includes(item.role) || !isText(item.text, 4000)) || !isText(body.message, 4000)) {
        return json({ error: 'Invalid conversation.' }, 400);
      }
      const totalLength = history.reduce((total, item) => total + item.text.length, body.message.length);
      if (totalLength > 24000) return json({ error: 'Conversation is too large.' }, 400);
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: body.operation === 'global' ? {
          systemInstruction: 'შენ ხარ IMI.GE-ის ხმოვანი ასისტენტი. უპასუხე ქართულად. პასუხი 20 სიტყვაზე ნაკლები იყოს, სიისა და markdown-ის გარეშე.',
          temperature: 0.5,
          maxOutputTokens: 50,
        } : chatConfig,
        history: history.map((item) => ({ role: item.role, parts: [{ text: item.text.trim() }] })),
      });
      const result = await chat.sendMessage({ message: body.message.trim() });
      return json({ text: result.text || 'ვერ გავიგე.' });
    }

    if (body.operation === 'voice') {
      if (!isText(body.message, 1000)) return json({ error: 'Invalid voice message.' }, 400);
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: 'შენ ხარ IMI.GE-ის ხმოვანი ასისტენტი. უპასუხე ქართულად მოკლედ, ბუნებრივად და მკაფიოდ. მაქსიმუმ ორი ან სამი წინადადება, markdown-ის გარეშე.',
          temperature: 0.7,
        },
      });
      const result = await chat.sendMessage({ message: body.message.trim() });
      return json({ text: result.text || 'ვერ გავიგე.' });
    }

    if (body.operation === 'image') {
      if (!isText(body.prompt, 1000)) return json({ error: 'Invalid image prompt.' }, 400);
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: body.prompt.trim(),
        config: { numberOfImages: 1, outputMimeType: 'image/jpeg', aspectRatio: '16:9' },
      });
      const imageBytes = response.generatedImages?.[0]?.image?.imageBytes;
      return json({ image: imageBytes ? `data:image/jpeg;base64,${imageBytes}` : null });
    }

    if (body.operation === 'vision') {
      const image = parseImage(body.base64Image, body.mimeType);
      if (!image || !isText(body.prompt, 2000)) return json({ error: 'Invalid image request.' }, 400);
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          role: 'user',
          parts: [{ inlineData: image }, { text: `${body.prompt.trim()} (უპასუხე ქართულად)` }],
        },
      });
      return json({ text: response.text || 'ვერ შევძელი სურათის გაანალიზება.' });
    }

    return json({ error: 'Unknown AI operation.' }, 400);
  } catch (error) {
    console.error('Gemini server error:', error instanceof Error ? error.message : 'unknown error');
    return json({ error: 'AI service is temporarily unavailable.' }, 502);
  }
}
