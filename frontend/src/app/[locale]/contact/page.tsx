import { redirect } from 'next/navigation';

export default async function LegacyContactPage({ params }: { params: Promise<{ locale: string }> }) {
  redirect(`/${(await params).locale}/consultation`);
}
