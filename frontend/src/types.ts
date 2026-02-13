export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    icon: string;
    price: string;
    path: string;
}

export interface PricingTier {
    name: string;
    price: string;
    features: string[];
    recommended?: boolean;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
}

export interface Content {
    hero: {
        badge: string;
        titlePrefix: string;
        titleHighlight: string;
        description: string;
        ctaPrimary: string;
        ctaSecondary: string;
        trust1Title: string;
        trust1Desc: string;
        trust2Title: string;
        trust2Desc: string;
        trust3Title: string;
        trust3Desc: string;
        trust4Title: string;
        trust4Desc: string;
    };
    services: Array<{
        id: string;
        title: string;
        description: string;
        icon: string;
        price: string;
        path: string;
    }>;
    servicesSection: {
        badge: string;
        titlePrefix: string;
        titleHighlight: string;
        description: string;
    };
    values: Array<{
        id: string;
        title: string;
        description: string;
        icon: string;
        listItems: string[];
    }>;
    pricing: {
        badge: string;
        titlePrefix: string;
        titleHighlight: string;
        description: string;
        roiFocus: string;
        ctaTitle: string;
        ctaDescription: string;
        ctaButton: string;
    };
    about: {
        badge: string;
        titlePrefix: string;
        titleHighlight: string;
        titleSuffix: string;
        description: string;
        imageTitle: string;
        imageDesc: string;
        values: Array<{
            id: string;
            title: string;
            desc: string;
            icon: string;
        }>;
        visionTitle: string;
        visionDesc: string;
        visionPoints: Array<{
            title: string;
            desc: string;
            icon: string;
        }>;
    };
    demos: {
        badge: string;
        titlePrefix: string;
        titleHighlight: string;
        description: string;
        demos: Array<{
            id: string;
            title: string;
            model?: string;
            placeholder?: string;
            promptLabel?: string;
            cta?: string;
            listening?: string;
        }>;
    };
    footer: {
        copyrightText: string;
        creditText: string;
        creditName: string;
        creditUrl: string;
        columns: Array<{
            title: string;
            links: Array<{
                label: string;
                url: string;
            }>;
        }>;
    };
    contact: {
        titlePrefix: string;
        titleHighlight: string;
        titleSuffix: string;
        description: string;
        email: string;
        phone: string;
        address: string;
    };
    contactForm: {
        nameLabel: string;
        namePlaceholder: string;
        emailLabel: string;
        emailPlaceholder: string;
        phoneLabel: string;
        phonePlaceholder: string;
        messageLabel: string;
        messagePlaceholder: string;
        interestLabel: string;
        interests: string[];
        submitButton: string;
        sending: string;
        successTitle: string;
        successMessage: string;
        errorMessage: string;
    };
    audit: {
        hero: {
            badge: string;
            titlePrefix: string;
            titleHighlight: string;
            titleSuffix: string;
            description: string;
        };
        input: {
            placeholder: string;
            analyzeButton: string;
            checkButton: string;
        };
        results: {
            recommendationsTitle: string;
            noIssues: string;
            securityTitle: string;
            leadSuccessTitle: string;
            leadSuccessDesc: string;
            leadTitle: string;
            leadDesc: string;
            emailPlaceholder: string;
        };
        features: Array<{
            title: string;
            desc: string;
        }>;
    };
    portfolio: {
        badge: string;
        titlePrefix: string;
        titleHighlight: string;
        description: string;
        viewProject: string;
        sourceCode: string;
        projects: Array<{
            id: number;
            title: string;
            category: string;
            description: string;
            image: string;
            tags: string[];
        }>;
    };
    blog: {
        badge: string;
        titlePrefix: string;
        titleHighlight: string;
        description: string;
        readMore: string;
        readTime: string;
        posts: Array<{
            id: number;
            title: string;
            excerpt: string;
            date: string;
            author: string;
            category: string;
            readTime: string;
            image: string;
            featured: boolean;
        }>;
    };
    allServicesPage: {
        badge: string;
        titlePrefix: string;
        titleHighlight: string;
        description: string;
        learnMore: string;
        categories: Array<{
            category: string;
            items: Array<{
                title: string;
                description: string;
                price: string;
                link: string;
            }>;
        }>;
    };
    auth: {
        loginTitle: string;
        registerTitle: string;
        resetTitle: string;
        emailLabel: string;
        emailPlaceholder: string;
        passwordLabel: string;
        passwordPlaceholder: string;
        nameLabel: string;
        namePlaceholder: string;
        confirmPasswordLabel: string;
        confirmPasswordPlaceholder: string;
        loginButton: string;
        registerButton: string;
        resetButton: string;
        forgotPassword: string;
        noAccount: string;
        hasAccount: string;
        backToLogin: string;
        orContinueWith: string;
        termsText: string;
        termsLink: string;
        privacyLink: string;
    };
    notFound: {
        title: string;
        description: string;
        goBack: string;
        goHome: string;
    };
    cookieConsent: {
        title: string;
        description: string;
        privacyLink: string;
        acceptButton: string;
        declineButton: string;
    };
    termsOfService: {
        pageTitle: string;
        effectiveDate: string;
        intro: string;
        sections: Array<{
            title: string;
            content: string;
            listItems?: string[];
        }>;
        footer: string;
    };
    privacyPolicy: {
        pageTitle: string;
        effectiveDate: string;
        intro: string;
        sections: Array<{
            title: string;
            content: string;
            listItems?: string[];
        }>;
        footer: string;
    };
    seoMarketing: {
        badge: string;
        titlePrefix: string;
        titleHighlight: string;
        titleSuffix: string;
        description: string;
        features: Array<{
            title: string;
            desc: string;
        }>;
        ctaTitle: string;
        ctaDescription: string;
        ctaButton: string;
    };
    serviceBuilder: {
        badge: string;
        titlePrefix: string;
        titleHighlight: string;
        titleSuffix: string;
        description: string;
        features: Array<{
            title: string;
            desc: string;
        }>;
        ctaTitle: string;
        ctaDescription: string;
        ctaButton: string;
    };
    errorBoundary: {
        title: string;
        description: string;
        reloadButton: string;
    };
    navLinks: Array<{
        path: string;
        label: string;
    }>;
}
