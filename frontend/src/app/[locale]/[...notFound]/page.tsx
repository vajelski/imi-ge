import { notFound } from 'next/navigation';

/** Keeps unmatched child URLs inside the locale layout and translations. */
export default function LocalizedCatchAllNotFound() {
  notFound();
}
