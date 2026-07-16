import { redirect } from 'next/navigation';

export default async function LegacyDemosPage({ params }: { params: Promise<{ locale: string }> }) {
  redirect(`/${(await params).locale}/assistant`);
}
