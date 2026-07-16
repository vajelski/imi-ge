import React, { createContext, useContext, useState, useEffect } from 'react';
import { Content } from '../types';
import { contentKA, contentEN } from '../data/translations';

type Language = 'ka' | 'en';

const translationMap: Record<Language, Content> = {
    ka: contentKA,
    en: contentEN,
};

interface ContentContextType {
    content: Content | null;
    loading: boolean;
    error: string | null;
    language: Language;
    setLanguage: (lang: Language) => void;
    updateContent: (newContent: Content) => Promise<void>;
    refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('ka');
    const [content, setContent] = useState<Content | null>(contentKA);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language | null;
        if (savedLang && translationMap[savedLang]) {
            setLanguageState(savedLang);
            setContent(translationMap[savedLang]);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        setContent(translationMap[lang]);
    };

    const updateContent = async (newContent: Content) => {
        try {
            setContent(newContent);
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (err: any) {
            console.error(err);
            throw err;
        }
    };

    const refreshContent = async () => {
        setLoading(true);
        setTimeout(() => {
            setContent(translationMap[language]);
            setLoading(false);
        }, 500);
    };

    return (
        <ContentContext.Provider value={{
            content,
            loading,
            error,
            language,
            setLanguage,
            updateContent,
            refreshContent,
        }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};

export type { Language };
