'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Bot, Loader2, Send, Sparkles, User } from 'lucide-react';

type Message = { role: 'user' | 'model'; text: string };

const content = {
  ka: { starter: 'გამარჯობა. მე IMI.GE-ის AI ასისტენტი ვარ. მომიყევით, რომელი პროცესის გაუმჯობესება გსურთ და დაგეხმარებით სწორი მიმართულების შერჩევაში.', name: 'IMI.GE AI ასისტენტი', meta: 'ქართულად, ბუნებრივად და კონტექსტით', loading: 'პასუხს ვამზადებ...', placeholder: 'მოგვწერეთ თქვენი ამოცანა...', send: 'გაგზავნა', disclaimer: 'ასისტენტის პასუხი არის საწყისი მიმართულება და არა საბოლოო კონსულტაცია. მნიშვნელოვანი გადაწყვეტილება გადაამოწმეთ IMI.GE-ის გუნდთან.', error: 'კავშირის პრობლემა წარმოიშვა. შეგიძლიათ მოთხოვნა დატოვოთ კონსულტაციის გვერდზე.' },
  en: { starter: 'Hello. I am IMI.GE\'s AI assistant. Tell me which business process you want to improve and I will help identify a useful direction.', name: 'IMI.GE AI assistant', meta: 'Natural, contextual business guidance', loading: 'Preparing a response...', placeholder: 'Describe the workflow you want to improve...', send: 'Send message', disclaimer: 'The assistant provides an initial direction, not final consulting advice. Verify important decisions with the IMI.GE team.', error: 'We could not connect to the assistant. You can leave a request on the consultation page.' },
} as const;

export default function ConversationalAssistant({ locale = 'ka' }: { locale?: 'ka' | 'en' }) {
  const text = content[locale];
  const [messages, setMessages] = useState<Message[]>([{ role: 'model', text: text.starter }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setReady(true); endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const send = async (event: FormEvent) => {
    event.preventDefault();
    const value = input.trim();
    if (!value || loading) return;
    const nextMessage: Message = { role: 'user', text: value };
    const history = messages.map(({ role, text: messageText }) => ({ role: role === 'model' ? 'assistant' : 'user', content: messageText }));
    setMessages((current) => [...current, nextMessage]);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch('/api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ locale, messages: [...history, { role: 'user', content: value }] }) });
      const data = await response.json() as { message?: string };
      if (!response.ok || !data.message) throw new Error('assistant request failed');
      setMessages((current) => [...current, { role: 'model', text: data.message! }]);
    } catch {
      setMessages((current) => [...current, { role: 'model', text: text.error }]);
    } finally {
      setLoading(false);
    }
  };

  return <section data-assistant-ready={ready ? 'true' : 'false'} className="mx-auto flex min-h-[620px] max-w-4xl flex-col overflow-hidden rounded-[2rem] border border-black/15 bg-white dark:border-white/15 dark:bg-[#171717]"><div className="flex items-center gap-3 border-b border-black/10 px-5 py-4 dark:border-white/10"><span className="grid size-10 place-items-center rounded-full bg-black text-white dark:bg-white dark:text-black"><Bot size={20}/></span><div><p className="font-heading text-sm font-bold text-slate-950 dark:text-white">{text.name}</p><p className="text-xs text-neutral-500">{text.meta}</p></div><Sparkles className="ml-auto text-neutral-400" size={18}/></div><div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-8">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><span className={`mt-1 grid size-8 shrink-0 place-items-center rounded-full ${message.role === 'user' ? 'order-2 bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white' : 'bg-black text-white dark:bg-white dark:text-black'}`}>{message.role === 'user' ? <User size={15}/> : <Bot size={15}/>}</span><div className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-7 ${message.role === 'user' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-neutral-100 text-slate-800 dark:bg-[#242424] dark:text-neutral-200'}`}>{message.text}</div></div>)}{loading && <div className="flex items-center gap-2 text-sm text-neutral-500" role="status"><Loader2 className="animate-spin" size={16}/>{text.loading}</div>}<div ref={endRef}/></div><form onSubmit={send} className="border-t border-black/10 p-4 dark:border-white/10"><div className="flex items-end gap-3 rounded-2xl border border-black/15 bg-neutral-50 p-2 focus-within:border-black dark:border-white/15 dark:bg-[#101010] dark:focus-within:border-white"><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} rows={2} maxLength={4000} placeholder={text.placeholder} aria-label={text.placeholder} className="min-h-12 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-slate-950 outline-none dark:text-white"/><button type="submit" disabled={loading || !input.trim()} aria-label={text.send} className="grid size-11 shrink-0 place-items-center rounded-xl bg-black text-white transition hover:opacity-75 disabled:opacity-40 dark:bg-white dark:text-black"><Send size={17}/></button></div><p className="mt-3 text-center text-xs leading-5 text-neutral-500">{text.disclaimer}</p></form></section>;
}
