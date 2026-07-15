'use client';

import { ArrowUpRight, Calculator, Clock3 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useState } from 'react';

export default function RoiCalculator() {
  const [requests, setRequests] = useState(1200);
  const [minutes, setMinutes] = useState(6);
  const [workDays, setWorkDays] = useState(22);
  const monthlyHours = Math.round((requests * minutes * workDays) / 60);
  const automatableHours = Math.round(monthlyHours * 0.55);
  const hoursLabel = new Intl.NumberFormat('ka-GE').format(automatableHours);

  return <div className="rounded-[2rem] border border-black/15 bg-[#f4f4f4] p-6 dark:border-white/15 dark:bg-[#171717] sm:p-8"><div className="flex items-start justify-between gap-6"><div><Calculator size={25}/><h2 className="mt-5 text-2xl font-semibold text-[#171717] dark:text-white">AI ავტომატიზაციის შეფასება</h2><p className="mt-2 max-w-xl text-sm leading-7 text-neutral-600 dark:text-neutral-400">შეაფასეთ, რამდენი სამუშაო საათი შეიძლება გათავისუფლდეს განმეორებადი მოთხოვნების ავტომატიზაციით.</p></div><Clock3 className="hidden text-neutral-400 sm:block" size={24}/></div><div className="mt-8 grid gap-7 md:grid-cols-3">{[[requests, setRequests, 'მოთხოვნა თვეში', 100, 10000, 100], [minutes, setMinutes, 'წუთი ერთ მოთხოვნაზე', 1, 30, 1], [workDays, setWorkDays, 'სამუშაო დღე თვეში', 1, 31, 1]].map(([value, setter, label, min, max, step]) => <label key={label as string} className="block"><span className="font-heading text-xs font-bold text-neutral-500">{label as string}</span><span className="mt-3 flex items-center justify-between text-lg font-semibold"><output>{new Intl.NumberFormat('ka-GE').format(value as number)}</output></span><input className="mt-3 w-full accent-black dark:accent-white" type="range" min={min as number} max={max as number} step={step as number} value={value as number} onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))}/></label>)}</div><div className="mt-8 flex flex-col justify-between gap-6 rounded-2xl bg-black p-5 text-white dark:bg-white dark:text-black sm:flex-row sm:items-end"><div><p className="font-heading text-xs font-bold text-neutral-400 dark:text-neutral-600">შეფასებითი გათავისუფლებული დრო</p><p className="mt-2 text-4xl font-semibold">დაახლოებით {hoursLabel} საათი</p><p className="mt-2 max-w-lg text-xs leading-6 text-neutral-400 dark:text-neutral-600">ეს არის სამუშაო ჰიპოთეზა 55%-იანი ავტომატიზაციის სცენარით და არა გარანტირებული ფინანსური შედეგი.</p></div><Link href="/consultation" className="font-heading inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black dark:bg-black dark:text-white">შეაფასეთ რეალური სცენარი <ArrowUpRight size={16}/></Link></div></div>;
}
