import { redirect } from 'next/navigation';

export default async function LegacyPortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  redirect(`/${(await params).locale}/projects`);
}
