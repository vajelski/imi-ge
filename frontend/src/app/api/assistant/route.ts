import { NextRequest, NextResponse } from 'next/server';
import { createRateLimiter, getTrustedClientKey } from '@/lib/server/rateLimit';

export const runtime = 'nodejs';

type Message = { role: 'user' | 'assistant'; content: string };

const systemPrompts = { ka: `შენ ხარ IMI.GE-ის ქართული AI ასისტენტი. ისაუბრე ბუნებრივად, ადამიანურად, თბილად და პროფესიონალურად. დაეხმარე მომხმარებელს IMI.GE-ის სერვისების გაგებაში: AI CRM ინტეგრაცია, AI-first CRM ტრანსფორმაცია, ხმოვანი AI ასისტენტები, RAG სისტემები, ბიზნეს ავტომატიზაცია, AI Operator და Social Commerce AI. უპასუხე ქართულად. არ მოიგონო ფასი, კლიენტის შედეგი, API, ინტეგრაცია ან ფუნქცია, რომელიც არ არის დადასტურებული. თუ კითხვა სცდება IMI.GE-ის ცოდნის სფეროს, თქვი ეს პირდაპირ და შესთავაზე კონსულტაციის მოთხოვნა. მოკლე კითხვაზე უპასუხე მოკლედ, რთულზე კი ახსენი ნაბიჯებად. არ წარმოაჩინო თავი ადამიანად და არ გამოიყენო ხელოვნური მარკეტინგული დაპირებები.`, en: `You are IMI.GE's English AI assistant. Speak naturally, warmly, and professionally. Explain IMI.GE's verified AI CRM, voice AI, RAG, automation, AI Operator, and Social Commerce capabilities. Answer in English. Never invent pricing, results, APIs, integrations, or capabilities. Say clearly when a question is outside the verified scope and suggest a consultation. Do not pretend to be human.` };

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 20;
const MAX_BODY_BYTES = 128 * 1024;
const takeRateLimitSlot = createRateLimiter(WINDOW_MS, MAX_REQUESTS);

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

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: 'Cross-origin requests are not allowed.' }, { status: 403 });
  }
  if (!takeRateLimitSlot(getTrustedClientKey(request))) {
    return NextResponse.json({ error: 'Too many assistant requests; try again later.' }, { status: 429, headers: { 'Cache-Control': 'no-store' } });
  }

  const baseUrl = process.env.OPENAI_BASE_URL;
  const model = process.env.OPENAI_MODEL;
  if (!baseUrl || !model) {
    return NextResponse.json({ error: 'Open-source assistant is not configured.' }, { status: 503 });
  }

  try {
    const contentLength = Number(request.headers.get('content-length'));
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Conversation is too large.' }, { status: 413 });
    }
    let rawBody: string;
    try {
      rawBody = await readBody(request, MAX_BODY_BYTES);
    } catch {
      return NextResponse.json({ error: 'Conversation is too large.' }, { status: 413 });
    }
    let body: { messages?: Message[]; locale?: 'ka' | 'en' };
    try {
      body = JSON.parse(rawBody) as { messages?: Message[]; locale?: 'ka' | 'en' };
    } catch {
      return NextResponse.json({ error: 'Invalid conversation.' }, { status: 400 });
    }
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid conversation.' }, { status: 400 });
    }
    const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
    if (!messages.length || messages.some((message) => !message || !['user', 'assistant'].includes(message.role) || typeof message.content !== 'string' || !message.content.trim() || message.content.length > 4000) || messages.reduce((total, message) => total + message.content.length, 0) > 24000) {
      return NextResponse.json({ error: 'Invalid conversation.' }, { status: 400 });
    }

    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(process.env.OPENAI_API_KEY ? { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } : {}) },
      body: JSON.stringify({ model, temperature: 0.65, max_tokens: 700, messages: [{ role: 'system', content: systemPrompts[body.locale === 'en' ? 'en' : 'ka'] }, ...messages] }),
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) return NextResponse.json({ error: 'Assistant provider returned an error.' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
    const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) return NextResponse.json({ error: 'Assistant returned an empty response.' }, { status: 502 });
    return NextResponse.json({ message: content }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Open-source assistant error:', error);
    return NextResponse.json({ error: 'Assistant is temporarily unavailable.' }, { status: 502 });
  }
}
