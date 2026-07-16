import { redirect } from 'next/navigation';

export default async function LegacyBuilderPage({ params }: { params: Promise<{ locale: string }> }) {
  redirect(`/${(await params).locale}/services/ai-native-web`);
}
