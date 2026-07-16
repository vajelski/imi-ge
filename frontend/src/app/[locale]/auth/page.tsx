import React from 'react';
import { Metadata } from 'next';
import AuthView from '@/components/AuthView';
import { localizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return localizedMetadata({ locale, path: '/auth', title: { ka: 'ანგარიშზე შესვლა', en: 'Sign in' }, description: { ka: 'IMI.GE ანგარიშზე შესვლა.', en: 'Sign in to your IMI.GE account.' }, noindex: true });
}

const AuthPage = async () => {
    return (
        <section className="pt-40 pb-24 min-h-screen bg-darker relative overflow-hidden flex items-center">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[150px] -top-24 -left-24 w-[500px] h-[500px]"></div>
            <div className="absolute inset-0 bg-secondary/5 rounded-full blur-[150px] -bottom-24 -right-24 w-[500px] h-[500px]"></div>

            <AuthView />
        </section>
    );
};

export default AuthPage;
