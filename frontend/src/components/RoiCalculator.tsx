'use client';

import { ArrowUpRight, Calculator, Clock3 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useState } from 'react';

const numberFormat = new Intl.NumberFormat('en-US');
const copy = {
  ka: { title: 'AI ავტომატიზაციის შეფასება', description: 'შეაფასეთ, რამდენი სამუშაო საათი შეიძლება გათავისუფლდეს განმეორებადი მოთხოვნების ავტომატიზაციით.', labels: ['მოთხოვნა თვეში', 'წუთი ერთ მოთხოვნაზე', 'სამუშაო დღე თვეში'], resultLabel: 'შეფასებითი გათავისუფლებული დრო', result: 'დაახლოებით', note: 'ეს არის სამუშაო ჰიპოთეზა 55%-იანი ავტომატიზაციის სცენარით და არა გარანტირებული ფინანსური შედეგი.', cta: 'განვიხილოთ სცენარი' },
  en: { title: 'Estimate an AI automation opportunity', description: 'Estimate how many work hours could be released by automating repeatable requests.', labels: ['Requests per month', 'Minutes per request', 'Workdays per month'], resultLabel: 'Estimated time released', result: 'About', note: 'This is a working hypothesis using a 55% automation scenario, not a guaranteed financial result.', cta: 'Discuss the scenario' },
} as const;

export default function RoiCalculator({ locale = 'ka' }: { locale?: 'ka' | 'en' }) {
  const text = copy[locale];
  const [requests, setRequests] = useState(1200);
  const [minutes, setMinutes] = useState(6);
  const [workDays, setWorkDays] = useState(22);
  const monthlyHours = Math.round((requests * minutes * workDays) / 60);
  const automatableHours = Math.round(monthlyHours * 0.55);
  const fields = [[requests, setRequests, text.labels[0], 100, 10000, 100], [minutes, setMinutes, text.labels[1], 1, 30, 1], [workDays, setWorkDays, text.labels[2], 1, 31, 1]] as const;

  return <div className="rounded-[2rem] border border-black/15 bg-[#f4f4f4] p-6 dark:border-white/15 dark:bg-[#171717] sm:p-8"><div className="flex items-start justify-between gap-6"><div><Calculator size={25}/><h2 className="mt-5 text-2xl font-semibold text-[#171717] dark:text-white">{text.title}</h2><p className="mt-2 max-w-xl text-sm leading-7 text-neutral-600 dark:text-neutral-400">{text.description}</p></div><Clock3 className="hidden text-neutral-400 sm:block" size={24}/></div><div className="mt-8 grid gap-7 md:grid-cols-3">{fields.map(([value, setter, label, min, max, step]) => <label key={label} className="block"><span className="font-heading text-xs font-bold text-neutral-500">{label}</span><span className="mt-3 flex items-center justify-between text-lg font-semibold"><output>{numberFormat.format(value)}</output></span><input className="mt-3 w-full accent-black dark:accent-white" type="range" min={min} max={max} step={step} value={value} onChange={(event) => setter(Number(event.target.value))}/></label>)}</div><div className="mt-8 flex flex-col justify-between gap-6 rounded-2xl bg-black p-5 text-white dark:bg-white dark:text-black sm:flex-row sm:items-end"><div><p className="font-heading text-xs font-bold text-neutral-400 dark:text-neutral-600">{text.resultLabel}</p><p className="mt-2 text-4xl font-semibold">{text.result} {numberFormat.format(automatableHours)} {locale === 'en' ? 'hours' : 'საათი'}</p><p className="mt-2 max-w-lg text-xs leading-6 text-neutral-400 dark:text-neutral-600">{text.note}</p></div><Link href="/consultation" className="font-heading inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black dark:bg-black dark:text-white">{text.cta} <ArrowUpRight size={16}/></Link></div></div>;
}
