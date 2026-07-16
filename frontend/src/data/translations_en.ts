import { Content } from '../types';

export const contentEN: Content = {
    hero: {
        badge: "#1 Digital Agency in Georgia",
        titlePrefix: "We Build",
        titleHighlight: "The Future",
        description: "Combining creative design, latest technologies, and AI to grow your business.",
        ctaPrimary: "Free Consultation",
        ctaSecondary: "Need Help?",
        trust1Title: "Web & Apps",
        trust1Desc: "Unique design and fast interface",
        trust2Title: "Georgian AI",
        trust2Desc: "Smart assistants speaking Georgian",
        trust3Title: "Speed",
        trust3Desc: "Optimized code and high performance",
        trust4Title: "Mobile",
        trust4Desc: "iOS and Android app development"
    },
    services: [
        { id: "1", title: "AI readiness assessment", description: "Assess process, data, and ownership before starting the first AI pilot.", icon: "Search", price: "Details", path: "/ai-readiness" },
        { id: "2", title: "AI-native web products", description: "Fast web products where AI, data, and conversion workflows work as one system.", icon: "Hammer", price: "Details", path: "/services/ai-native-web" },
        { id: "3", title: "Georgian AI assistants", description: "Business-specific voice and text assistants for customer support and sales.", icon: "MessageSquareCode", price: "Details", path: "/assistant" }
    ],
    servicesSection: {
        badge: "Full Service",
        titlePrefix: "Digital",
        titleHighlight: "Ecosystem",
        description: "Everything your business needs for digital transformation."
    },
    values: [
        { id: "1", title: "Time Saving", description: "Our AI automation reduces routine work by 70%. What takes an employee 4 hours, our system does in 2 minutes.", icon: "Clock", listItems: ["Instant replies to clients", "Automated reporting"] },
        { id: "2", title: "Revenue Growth", description: "Correct digital strategy and SEO directly impact sales. Our clients see 40% growth in 6 months on average.", icon: "TrendingUp", listItems: ["High conversion", "Google first page"] },
        { id: "3", title: "Stability", description: "Your business won't stop. We use the latest Cloud technologies and security systems to keep your data safe.", icon: "ShieldCheck", listItems: ["99.9% Uptime guarantee", "Daily backups"] }
    ],
    pricing: {
        badge: "Why IMI.GE?",
        titlePrefix: "Invest in",
        titleHighlight: "Results",
        description: "We don't just sell code. We build systems that save your time, reduce costs, and increase revenue from day one.",
        roiFocus: "ROI Focus",
        ctaTitle: "Ready for Transformation?",
        ctaDescription: "Contact us for a free consultation. We'll discuss your needs and offer a personalized plan.",
        ctaButton: "Free Consultation"
    },
    contact: {
        titlePrefix: "Let's", titleHighlight: "Create", titleSuffix: "Something New.",
        description: "Have an idea? We have the technology. Write to us and start your digital transformation today.",
        email: "contact@imi.ge", phone: "+995 555 00 00 00", address: "Tbilisi, Georgia"
    },
    contactForm: {
        nameLabel: "Name", namePlaceholder: "Your name",
        emailLabel: "Email", emailPlaceholder: "example@company.com",
        phoneLabel: "Phone", phonePlaceholder: "+995 ...",
        messageLabel: "Message", messagePlaceholder: "Tell us about your project...",
        interestLabel: "Area of Interest",
        interests: ["Web Development", "AI Integration", "Mobile App", "Audit", "Other"],
        submitButton: "Send", sending: "Sending...",
        successTitle: "Sent!", successMessage: "Thank you! We'll get back to you soon.",
        errorMessage: "An error occurred. Please try again later."
    },
    audit: {
        hero: { badge: "AI Audit", titlePrefix: "Intelligent", titleHighlight: "Website", titleSuffix: "Analysis", description: "Enter your site URL and get real AI audit in seconds: SEO, Speed, Accessibility, and Security." },
        input: { placeholder: "Enter URL (e.g. imi.ge)", analyzeButton: "Analyze...", checkButton: "Check" },
        results: { recommendationsTitle: "Key Recommendations", noIssues: "No critical issues found!", securityTitle: "Security", leadSuccessTitle: "Request Received!", leadSuccessDesc: "Our team will send you the full report shortly.", leadTitle: "Get Full Report", leadDesc: "Enter your email to receive detailed PDF analysis for free.", emailPlaceholder: "your@email.com" },
        features: [
            { title: "SEO Optimization", desc: "Analysis tailored to Google's latest algorithms." },
            { title: "Speed Boost", desc: "Detailed check of Core Web Vitals metrics." },
            { title: "Security", desc: "Audit of SSL, Headers, and other security settings." }
        ]
    },
    about: {
        badge: "About Us", titlePrefix: "Who", titleHighlight: "We Are", titleSuffix: "and What We Do",
        description: "IMI.GE is a leading digital agency.", imageTitle: "Our Office", imageDesc: "Modern Environment",
        values: [], visionTitle: "Vision", visionDesc: "Future Technologies", visionPoints: []
    },
    demos: { badge: "Demos", titlePrefix: "See", titleHighlight: "Demos", description: "Our Works", demos: [] },
    footer: {
        copyrightText: "IMI.GE", creditText: "Made by", creditName: "IMI.GE", creditUrl: "/",
        columns: [
            { title: "Explore", links: [{ label: "Services", url: "/services" }, { label: "Use cases", url: "/use-cases" }, { label: "Projects", url: "/projects" }, { label: "Insights", url: "/blog" }] },
            { title: "Resources", links: [{ label: "Guides", url: "/docs" }, { label: "FAQ", url: "/faq" }, { label: "AI assistant", url: "/assistant" }, { label: "Consultation", url: "/consultation" }] },
            { title: "Contact", links: [{ label: "contact@imi.ge", url: "mailto:contact@imi.ge" }, { label: "+995 555 00 00 00", url: "tel:+995555000000" }] }
        ]
    },
    portfolio: {
        badge: "Success Stories",
        titlePrefix: "Completed",
        titleHighlight: "Projects",
        description: "Explore real examples of how our technologies transform business processes.",
        viewProject: "View Details",
        sourceCode: "View Code",
        projects: [
            { id: 1, title: "FinTech AI Assistant", category: "Chatbot & NLP", description: "Smart assistant built for a leading Georgian bank, processing user transactions and answering questions in natural language.", image: "https://picsum.photos/800/600?random=1", tags: ["Python", "React", "AWS"] },
            { id: 2, title: "E-commerce Platform", category: "Web Development", description: "Complete online store with payment systems, inventory management, and fast search functionality.", image: "https://picsum.photos/800/600?random=2", tags: ["Next.js", "Node.js", "Stripe"] },
            { id: 3, title: "Medical Application", category: "Mobile App", description: "iOS and Android app for clinics with patient scheduling and medical history management.", image: "https://picsum.photos/800/600?random=3", tags: ["React Native", "Firebase", "AI"] },
            { id: 4, title: "Smart City Monitoring", category: "IoT & AI", description: "Real-time city traffic and environmental pollution monitoring system.", image: "https://picsum.photos/800/600?random=4", tags: ["IoT", "Edge AI", "Grafana"] },
            { id: 5, title: "Real Estate Portal", category: "Web Platform", description: "Innovative platform for buying and selling real estate with 3D tours and AI price estimation.", image: "https://picsum.photos/800/600?random=5", tags: ["Vue.js", "Django", "Three.js"] },
            { id: 6, title: "Logistics Management System", category: "Enterprise Software", description: "Complex ERP system for a transport company with route optimization and fleet management.", image: "https://picsum.photos/800/600?random=6", tags: ["Angular", "Java Spring", "PostgreSQL"] }
        ]
    },
    blog: {
        badge: "Blog & News",
        titlePrefix: "Technology",
        titleHighlight: "Insights",
        description: "Learn more about digital world news, tips, and best practices.",
        readMore: "Read More",
        readTime: "min",
        posts: [
            { id: 1, title: "How AI Will Transform Georgian Business in 2025", excerpt: "The impact of artificial intelligence on the local market and new opportunities for companies.", date: "March 15, 2024", author: "Revaz Bregvadze", category: "AI Trends", readTime: "5 min", image: "https://picsum.photos/800/600?random=10", featured: true },
            { id: 2, title: "Why Do You Need a Website Audit?", excerpt: "Technical issues that hinder your sales and ways to fix them.", date: "March 10, 2024", author: "Revaz Bregvadze", category: "SEO & Web", readTime: "3 min", image: "https://picsum.photos/800/600?random=11", featured: false },
            { id: 3, title: "Chatbot vs Live Chat: Which Is Better?", excerpt: "Comparing automation and human resources in customer support.", date: "March 5, 2024", author: "Revaz Bregvadze", category: "Automation", readTime: "4 min", image: "https://picsum.photos/800/600?random=12", featured: false },
            { id: 4, title: "Cybersecurity for Small Business", excerpt: "Simple steps to protect your data from hacker attacks.", date: "March 1, 2024", author: "Revaz Bregvadze", category: "Security", readTime: "6 min", image: "https://picsum.photos/800/600?random=13", featured: false }
        ]
    },
    allServicesPage: {
        badge: "Our Services",
        titlePrefix: "Complete Digital",
        titleHighlight: "Catalog",
        description: "Everything your business needs for digital transformation — in one place.",
        learnMore: "Details",
        categories: [
            {
                category: "Web & Mobile Development", items: [
                    { title: "Website Development", description: "Modern, fast, SEO-optimized websites. E-commerce, corporate sites, and landing pages.", price: "Details", link: "/consultation" },
                    { title: "Mobile Applications", description: "iOS and Android app development (React Native / Flutter). Intuitive UI/UX design and high performance.", price: "Details", link: "/consultation" },
                    { title: "AI-native web products", description: "Fast web products where AI, data, and conversion workflows work as one system.", price: "Details", link: "/services/ai-native-web" }
                ]
            },
            {
                category: "AI & Automation", items: [
                    { title: "Georgian AI assistants", description: "Business-specific voice and text assistants for customer support and sales.", price: "Details", link: "/assistant" },
                    { title: "AI Automation", description: "Automation of routine processes using AI. CRM and ERP systems integration.", price: "Details", link: "/consultation" },
                    { title: "Data Analytics", description: "Big Data processing and predictive model creation for business.", price: "Details", link: "/consultation" }
                ]
            },
            {
                category: "Audit & Optimization", items: [
                    { title: "AI readiness assessment", description: "Assess process, data, and ownership before starting the first AI pilot.", price: "Details", link: "/ai-readiness" },
                    { title: "SEO & Digital Marketing", description: "Website promotion in Google search and technical optimization.", price: "Details", link: "/consultation" },
                    { title: "Cybersecurity", description: "System protection from attacks, vulnerability detection, and security standards implementation.", price: "Details", link: "/consultation" }
                ]
            }
        ]
    },
    auth: {
        loginTitle: "Sign In", registerTitle: "Sign Up", resetTitle: "Reset Password",
        emailLabel: "Email", emailPlaceholder: "example@mail.com",
        passwordLabel: "Password", passwordPlaceholder: "••••••••",
        nameLabel: "Name", namePlaceholder: "Your name",
        confirmPasswordLabel: "Confirm Password", confirmPasswordPlaceholder: "••••••••",
        loginButton: "Sign In", registerButton: "Sign Up", resetButton: "Send",
        forgotPassword: "Forgot Password?",
        noAccount: "Don't have an account?", hasAccount: "Already have an account?",
        backToLogin: "Back to Login",
        orContinueWith: "or continue with email",
        termsText: "By registering you agree to", termsLink: "Terms of Service", privacyLink: "Privacy Policy"
    },
    notFound: {
        title: "Page Not Found",
        description: "Unfortunately, the page you're looking for doesn't exist, has been moved, or is temporarily unavailable.",
        goBack: "Go Back",
        goHome: "Home Page"
    },
    cookieConsent: {
        title: "We Use Cookies",
        description: "We use cookies to improve your experience and for website analytics. For more details, see our",
        privacyLink: "Privacy Policy",
        acceptButton: "Accept",
        declineButton: "Decline"
    },
    termsOfService: {
        pageTitle: "Terms of Service",
        effectiveDate: "Effective from February 12, 2024",
        intro: "Welcome to AI Solutions Georgia. By using our website (imi.ge), you agree to abide by the terms and conditions below. Please read them carefully.",
        sections: [
            { title: "1. General Provisions", content: "", listItems: ["Use of our services is permitted only for persons aged 18 or older or with parental/guardian consent.", "You are obligated to provide accurate and truthful information during registration or when filling out contact forms."] },
            { title: "2. Intellectual Property", content: "All materials on the website, including design, text, graphics, logos, and software code are the property of AI Solutions Georgia and are protected by copyright law. Copying, distributing, or modifying materials without our written consent is prohibited." },
            { title: "3. Prohibited Activities", content: "The following is strictly prohibited when using the service:", listItems: ["Distributing viruses or malicious code", "Attempting cyberattacks on the system", "Collecting other users' data", "Reselling the service without permission", "Posting illegal or offensive content", "Using automated scripts (bots)"] },
            { title: "4. Limitation of Liability", content: "AI Solutions Georgia is not liable for any direct or indirect damages that may be caused by using the service, interruptions, or data loss. Information generated by our AI systems is advisory in nature and does not constitute professional, legal, or financial advice." }
        ],
        footer: "We reserve the right to change these terms at any time. For questions, contact us: hello@imi.ge"
    },
    privacyPolicy: {
        pageTitle: "Privacy Policy",
        effectiveDate: "Last updated: February 12, 2024",
        intro: "AI Solutions Georgia (hereinafter \"we\") respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and protect your information when using our website (imi.ge) and services.",
        sections: [
            { title: "1. Information Collection", content: "We collect the following types of information:", listItems: ["Personal identification information: name, email, phone number.", "Technical data: IP address, browser type, device type.", "Cookie data: information about your preferences."] },
            { title: "2. Use of Information", content: "We use collected information for service provision, service improvement, marketing, and security purposes." },
            { title: "3. Data Security", content: "We take appropriate technical and organizational measures to protect your personal data. We use SSL/TLS encryption for data transmission." },
            { title: "4. Third Parties", content: "We do not sell or rent your personal data.", listItems: ["To our partner service providers (e.g., hosting, analytics).", "In cases required by law."] }
        ],
        footer: "Have questions? Contact us about data protection: hello@imi.ge"
    },
    seoMarketing: {
        badge: "SEO & Marketing", titlePrefix: "Digital", titleHighlight: "Marketing", titleSuffix: "& SEO", description: "Data-driven SEO strategies and marketing solutions.",
        features: [], ctaTitle: "Ready for Success?", ctaDescription: "Contact us for a free consultation and initial audit.", ctaButton: "Contact Us"
    },
    serviceBuilder: {
        badge: "AI Builder", titlePrefix: "Automatic", titleHighlight: "Website", titleSuffix: "Generation", description: "Describe your idea in text and our AI will write clean, optimized code (React + Tailwind).",
        features: [
            { title: "Clean Code", desc: "Our AI doesn't use 'Drag & Drop' garbage. It writes professional React code that's easy to modify." },
            { title: "Responsive", desc: "Generated design automatically adapts to mobile phones, tablets, and desktops." },
            { title: "Fast Development", desc: "Save 70% of development time. From idea to prototype in just minutes." }
        ],
        ctaTitle: "Full Package", ctaDescription: "AI Builder + Developer Support", ctaButton: "Order"
    },
    errorBoundary: {
        title: "An Error Occurred",
        description: "Unfortunately, an unexpected error occurred in the application. Our team is already working on fixing the issue.",
        reloadButton: "Reload Page"
    },
    navLinks: [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About Us' },
        { path: '/services', label: 'Services' },
        { path: '/projects', label: 'Projects' },
        { path: '/blog', label: 'Blog' },
    ]
};
