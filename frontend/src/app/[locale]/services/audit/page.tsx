import { redirect } from 'next/navigation';

export default async function LegacyAuditPage({ params }: { params: Promise<{ locale: string }> }) {
  redirect(`/${(await params).locale}/ai-readiness`);
}
