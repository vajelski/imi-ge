'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Bot, Loader2, Send, Sparkles, User } from 'lucide-react';

type Message = { role: 'user' | 'model'; text: string };

const starter: Message = { role: 'model', text: 'გამარჯობა. მე IMI.GE-ის AI ასისტენტი ვარ. მომიყევით, რომელი პროცესის გაუმჯობესება გსურთ და დაგეხმარებით სწორი მიმართულების შერჩევაში.' };

export default function ConversationalAssistant() {
  const [messages, setMessages] = useState<Message[]>([starter]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, loading]);

  const send = async (event: FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const nextMessage: Message = { role: 'user', text };
    const history = messages.map(({ role, text: messageText }) => ({ role, text: messageText }));
    setMessages((current) => [...current, nextMessage]);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch('/api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [...history.map((message) => ({ role: message.role === 'model' ? 'assistant' : 'user', content: message.text })), { role: 'user', content: text }] }) });
      const data = await response.json() as { message?: string; error?: string };
      if (!response.ok || !data.message) throw new Error(data.error ?? 'Assistant error');
      setMessages((current) => [...current, { role: 'model', text: data.message! }]);
    } catch {
      setMessages((current) => [...current, { role: 'model', text: 'კავშირის პრობლემა წარმოიშვა. შეგიძლიათ დაგვიტოვოთ მოთხოვნა კონსულტაციის გვერდზე.' }]);
    } finally {
      setLoading(false);
    }
  };

  return <section className="mx-auto flex min-h-[620px] max-w-4xl flex-col overflow-hidden rounded-[2rem] border border-black/15 bg-white dark:border-white/15 dark:bg-[#171717]"><div className="flex items-center gap-3 border-b border-black/10 px-5 py-4 dark:border-white/10"><span className="grid size-10 place-items-center rounded-full bg-black text-white dark:bg-white dark:text-black"><Bot size={20}/></span><div><p className="font-heading text-sm font-bold text-slate-950 dark:text-white">IMI.GE AI ასისტენტი</p><p className="text-xs text-neutral-500">ქართულად, ბუნებრივად და კონტექსტით</p></div><Sparkles className="ml-auto text-neutral-400" size={18}/></div><div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-8">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><span className={`mt-1 grid size-8 shrink-0 place-items-center rounded-full ${message.role === 'user' ? 'order-2 bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white' : 'bg-black text-white dark:bg-white dark:text-black'}`}>{message.role === 'user' ? <User size={15}/> : <Bot size={15}/>}</span><div className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-7 ${message.role === 'user' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-neutral-100 text-slate-800 dark:bg-[#242424] dark:text-neutral-200'}`}>{message.text}</div></div>)}{loading && <div className="flex items-center gap-2 text-sm text-neutral-500"><Loader2 className="animate-spin" size={16}/> პასუხს ვამზადებ...</div>}<div ref={endRef}/></div><form onSubmit={send} className="border-t border-black/10 p-4 dark:border-white/10"><div className="flex items-end gap-3 rounded-2xl border border-black/15 bg-neutral-50 p-2 focus-within:border-black dark:border-white/15 dark:bg-[#101010] dark:focus-within:border-white"><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void send(event); } }} rows={1} placeholder="დაწერეთ თქვენი კითხვა..." aria-label="შეტყობინება" className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-3 text-sm text-slate-950 outline-none placeholder:text-neutral-500 dark:text-white"/><button type="submit" disabled={!input.trim() || loading} aria-label="გაგზავნა" className="grid size-11 shrink-0 place-items-center rounded-xl bg-black text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black"><Send size={17}/></button></div><p className="mt-3 px-2 text-[11px] text-neutral-500">AI პასუხი შეიძლება საჭიროებდეს გადამოწმებას. კონფიდენციალური მონაცემები არ გააზიაროთ.</p></form></section>;
}
