import { redirect } from 'next/navigation';

export default async function LegacySeoPage({ params }: { params: Promise<{ locale: string }> }) {
  redirect(`/${(await params).locale}/services/ai-native-web`);
}
