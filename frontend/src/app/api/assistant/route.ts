import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Message = { role: 'user' | 'assistant'; content: string };

const systemPrompts = { ka: `შენ ხარ IMI.GE-ის ქართული AI ასისტენტი. ისაუბრე ბუნებრივად, ადამიანურად, თბილად და პროფესიონალურად. დაეხმარე მომხმარებელს IMI.GE-ის სერვისების გაგებაში: AI CRM ინტეგრაცია, AI-first CRM ტრანსფორმაცია, ხმოვანი AI ასისტენტები, RAG სისტემები, ბიზნეს ავტომატიზაცია, AI Operator და Social Commerce AI. უპასუხე ქართულად. არ მოიგონო ფასი, კლიენტის შედეგი, API, ინტეგრაცია ან ფუნქცია, რომელიც არ არის დადასტურებული. თუ კითხვა სცდება IMI.GE-ის ცოდნის სფეროს, თქვი ეს პირდაპირ და შესთავაზე კონსულტაციის მოთხოვნა. მოკლე კითხვაზე უპასუხე მოკლედ, რთულზე კი ახსენი ნაბიჯებად. არ წარმოაჩინო თავი ადამიანად და არ გამოიყენო ხელოვნური მარკეტინგული დაპირებები.`, en: `You are IMI.GE's English AI assistant. Speak naturally, warmly, and professionally. Explain IMI.GE's verified AI CRM, voice AI, RAG, automation, AI Operator, and Social Commerce capabilities. Answer in English. Never invent pricing, results, APIs, integrations, or capabilities. Say clearly when a question is outside the verified scope and suggest a consultation. Do not pretend to be human.` };

export async function POST(request: NextRequest) {
  const baseUrl = process.env.OPENAI_BASE_URL;
  const model = process.env.OPENAI_MODEL;
  if (!baseUrl || !model) {
    return NextResponse.json({ error: 'Open-source assistant is not configured.' }, { status: 503 });
  }

  try {
    const body = await request.json() as { messages?: Message[]; locale?: 'ka' | 'en' };
    const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
    if (!messages.length || messages.some((message) => !['user', 'assistant'].includes(message.role) || typeof message.content !== 'string' || message.content.length > 4000)) {
      return NextResponse.json({ error: 'Invalid conversation.' }, { status: 400 });
    }

    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(process.env.OPENAI_API_KEY ? { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } : {}) },
      body: JSON.stringify({ model, temperature: 0.65, max_tokens: 700, messages: [{ role: 'system', content: systemPrompts[body.locale === 'en' ? 'en' : 'ka'] }, ...messages] }),
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) return NextResponse.json({ error: 'Assistant provider returned an error.' }, { status: 502 });
    const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) return NextResponse.json({ error: 'Assistant returned an empty response.' }, { status: 502 });
    return NextResponse.json({ message: content });
  } catch (error) {
    console.error('Open-source assistant error:', error);
    return NextResponse.json({ error: 'Assistant is temporarily unavailable.' }, { status: 502 });
  }
}
