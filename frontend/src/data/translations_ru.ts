import { Content } from '../types';

export const contentRU: Content = {
    hero: {
        badge: "#1 Цифровое агентство в Грузии",
        titlePrefix: "Создаём",
        titleHighlight: "Будущее",
        description: "Мы объединяем креативный дизайн, новейшие технологии и искусственный интеллект для роста вашего бизнеса.",
        ctaPrimary: "Бесплатная консультация",
        ctaSecondary: "Нужна помощь?",
        trust1Title: "Веб и приложения",
        trust1Desc: "Уникальный дизайн и быстрый интерфейс",
        trust2Title: "Грузинский AI",
        trust2Desc: "Умные ассистенты, говорящие на грузинском",
        trust3Title: "Скорость",
        trust3Desc: "Оптимизированный код и высокая производительность",
        trust4Title: "Мобильные",
        trust4Desc: "Разработка приложений для iOS и Android"
    },
    services: [
        { id: "1", title: "AI Аудит сайта", description: "Полный технический и SEO анализ с использованием ИИ. Обнаружьте проблемы за секунды.", icon: "Search", price: "Подробнее", path: "/services/audit" },
        { id: "2", title: "AI Веб-конструктор", description: "От идеи до готового кода. Наш AI пишет чистый React/Tailwind код по вашему описанию.", icon: "Hammer", price: "Подробнее", path: "/services/builder" },
        { id: "3", title: "Грузинские AI ассистенты", description: "Чат-боты для вашего бизнеса, которые говорят на грамотном грузинском и обслуживают клиентов 24/7.", icon: "MessageSquareCode", price: "Подробнее", path: "/demos" }
    ],
    servicesSection: {
        badge: "Полный сервис",
        titlePrefix: "Цифровая",
        titleHighlight: "Экосистема",
        description: "Всё, что нужно вашему бизнесу для цифровой трансформации."
    },
    values: [
        { id: "1", title: "Экономия времени", description: "Наша AI автоматизация сокращает рутинную работу на 70%. То, на что сотрудник тратит 4 часа, наша система делает за 2 минуты.", icon: "Clock", listItems: ["Мгновенные ответы клиентам", "Автоматическая отчётность"] },
        { id: "2", title: "Рост дохода", description: "Правильная цифровая стратегия и SEO оптимизация напрямую влияют на продажи. Наши клиенты видят рост на 40% за 6 месяцев.", icon: "TrendingUp", listItems: ["Высокая конверсия", "Первая страница Google"] },
        { id: "3", title: "Стабильность", description: "Ваш бизнес не остановится. Мы используем новейшие облачные технологии и системы безопасности для защиты ваших данных.", icon: "ShieldCheck", listItems: ["99.9% Uptime гарантия", "Ежедневное резервное копирование"] }
    ],
    pricing: {
        badge: "Почему IMI.GE?",
        titlePrefix: "Инвестиция в",
        titleHighlight: "Результат",
        description: "Мы не просто продаём код. Мы создаём системы, которые экономят ваше время, сокращают расходы и увеличивают доход с первого дня.",
        roiFocus: "Фокус на ROI",
        ctaTitle: "Готовы к трансформации?",
        ctaDescription: "Свяжитесь с нами для бесплатной консультации. Мы обсудим ваши потребности и предложим индивидуальный план.",
        ctaButton: "Бесплатная консультация"
    },
    contact: {
        titlePrefix: "Давайте", titleHighlight: "Создадим", titleSuffix: "Что-то новое.",
        description: "Есть идея? У нас есть технологии. Напишите нам и начните цифровую трансформацию уже сегодня.",
        email: "contact@imi.ge", phone: "+995 555 00 00 00", address: "Тбилиси, Грузия"
    },
    contactForm: {
        nameLabel: "Имя", namePlaceholder: "Ваше имя",
        emailLabel: "Эл. почта", emailPlaceholder: "example@company.com",
        phoneLabel: "Телефон", phonePlaceholder: "+995 ...",
        messageLabel: "Сообщение", messagePlaceholder: "Расскажите о вашем проекте...",
        interestLabel: "Область интересов",
        interests: ["Веб-разработка", "AI интеграция", "Мобильное приложение", "Аудит", "Другое"],
        submitButton: "Отправить", sending: "Отправка...",
        successTitle: "Отправлено!", successMessage: "Спасибо! Мы скоро свяжемся с вами.",
        errorMessage: "Произошла ошибка. Пожалуйста, попробуйте позже."
    },
    audit: {
        hero: { badge: "AI Аудит", titlePrefix: "Интеллектуальный", titleHighlight: "Анализ", titleSuffix: "Сайта", description: "Введите URL вашего сайта и получите реальный AI аудит за секунды: SEO, скорость, доступность и безопасность." },
        input: { placeholder: "Введите URL (напр: imi.ge)", analyzeButton: "Анализ...", checkButton: "Проверить" },
        results: { recommendationsTitle: "Ключевые рекомендации", noIssues: "Критических проблем не обнаружено!", securityTitle: "Безопасность", leadSuccessTitle: "Запрос получен!", leadSuccessDesc: "Наша команда скоро отправит вам полный отчёт.", leadTitle: "Получить полный отчёт", leadDesc: "Введите email и получите детальный PDF анализ бесплатно.", emailPlaceholder: "ваш@email.com" },
        features: [
            { title: "SEO Оптимизация", desc: "Анализ, настроенный под новейшие алгоритмы Google." },
            { title: "Ускорение", desc: "Детальная проверка метрик Core Web Vitals." },
            { title: "Безопасность", desc: "Аудит SSL, заголовков и других параметров безопасности." }
        ]
    },
    about: {
        badge: "О нас", titlePrefix: "Кто", titleHighlight: "Мы", titleSuffix: "и Что мы делаем",
        description: "IMI.GE — ведущее цифровое агентство.", imageTitle: "Наш офис", imageDesc: "Современная среда",
        values: [], visionTitle: "Видение", visionDesc: "Технологии будущего", visionPoints: []
    },
    demos: { badge: "Демо", titlePrefix: "Смотрите", titleHighlight: "Демо", description: "Наши работы", demos: [] },
    footer: {
        copyrightText: "IMI.GE", creditText: "Сделано", creditName: "IMI.GE", creditUrl: "/",
        columns: [
            { title: "Компания", links: [{ label: "О нас", url: "/about" }, { label: "Услуги", url: "/all-services" }, { label: "Портфолио", url: "/portfolio" }, { label: "Блог", url: "/blog" }] },
            { title: "Услуги", links: [{ label: "Веб-разработка", url: "/services" }, { label: "AI Интеграция", url: "/demos" }, { label: "SEO Аудит", url: "/services/audit" }] },
            { title: "Контакт", links: [{ label: "contact@imi.ge", url: "mailto:contact@imi.ge" }, { label: "+995 555 00 00 00", url: "tel:+995555000000" }] }
        ]
    },
    portfolio: {
        badge: "Истории успеха",
        titlePrefix: "Реализованные",
        titleHighlight: "Проекты",
        description: "Ознакомьтесь с реальными примерами того, как наши технологии трансформируют бизнес-процессы.",
        viewProject: "Подробнее",
        sourceCode: "Код",
        projects: [
            { id: 1, title: "FinTech AI Ассистент", category: "Чатбот & NLP", description: "Умный ассистент для ведущего грузинского банка, обрабатывающий транзакции и отвечающий на вопросы на естественном языке.", image: "https://picsum.photos/800/600?random=1", tags: ["Python", "React", "AWS"] },
            { id: 2, title: "E-commerce Платформа", category: "Веб-разработка", description: "Полноценный интернет-магазин с платёжными системами, управлением запасами и быстрым поиском.", image: "https://picsum.photos/800/600?random=2", tags: ["Next.js", "Node.js", "Stripe"] },
            { id: 3, title: "Медицинское приложение", category: "Мобильное приложение", description: "Приложение для iOS и Android для клиник с записью пациентов и управлением медицинской историей.", image: "https://picsum.photos/800/600?random=3", tags: ["React Native", "Firebase", "AI"] },
            { id: 4, title: "Smart City Мониторинг", category: "IoT & AI", description: "Система мониторинга городских пробок и загрязнения окружающей среды в реальном времени.", image: "https://picsum.photos/800/600?random=4", tags: ["IoT", "Edge AI", "Grafana"] },
            { id: 5, title: "Портал недвижимости", category: "Веб-платформа", description: "Инновационная платформа для купли-продажи недвижимости с 3D-турами и AI-оценкой цен.", image: "https://picsum.photos/800/600?random=5", tags: ["Vue.js", "Django", "Three.js"] },
            { id: 6, title: "Система управления логистикой", category: "Корпоративное ПО", description: "Комплексная ERP-система для транспортной компании с оптимизацией маршрутов и управлением автопарком.", image: "https://picsum.photos/800/600?random=6", tags: ["Angular", "Java Spring", "PostgreSQL"] }
        ]
    },
    blog: {
        badge: "Блог и Новости",
        titlePrefix: "Технологические",
        titleHighlight: "Инсайты",
        description: "Узнайте больше о новостях цифрового мира, советах и лучших практиках.",
        readMore: "Читать далее",
        readTime: "мин",
        posts: [
            { id: 1, title: "Как AI изменит грузинский бизнес в 2025 году", excerpt: "Влияние искусственного интеллекта на местный рынок и новые возможности для компаний.", date: "15 марта 2024", author: "Реваз Брегвадзе", category: "AI Тренды", readTime: "5 мин", image: "https://picsum.photos/800/600?random=10", featured: true },
            { id: 2, title: "Зачем нужен аудит сайта?", excerpt: "Технические проблемы, которые мешают вашим продажам, и способы их устранения.", date: "10 марта 2024", author: "Реваз Брегвадзе", category: "SEO & Web", readTime: "3 мин", image: "https://picsum.photos/800/600?random=11", featured: false },
            { id: 3, title: "Chatbot vs Live Chat: Что лучше?", excerpt: "Сравнение автоматизации и человеческих ресурсов в поддержке клиентов.", date: "5 марта 2024", author: "Реваз Брегвадзе", category: "Автоматизация", readTime: "4 мин", image: "https://picsum.photos/800/600?random=12", featured: false },
            { id: 4, title: "Кибербезопасность для малого бизнеса", excerpt: "Простые шаги для защиты ваших данных от хакерских атак.", date: "1 марта 2024", author: "Реваз Брегвадзе", category: "Безопасность", readTime: "6 мин", image: "https://picsum.photos/800/600?random=13", featured: false }
        ]
    },
    allServicesPage: {
        badge: "Наши услуги",
        titlePrefix: "Полный цифровой",
        titleHighlight: "Каталог",
        description: "Всё, что нужно вашему бизнесу для цифровой трансформации — в одном месте.",
        learnMore: "Подробнее",
        categories: [
            {
                category: "Веб & Мобильная разработка", items: [
                    { title: "Создание сайтов", description: "Современные, быстрые, SEO-оптимизированные сайты. E-commerce, корпоративные сайты и лендинги.", price: "Подробнее", link: "/contact" },
                    { title: "Мобильные приложения", description: "Разработка приложений для iOS и Android (React Native / Flutter). Интуитивный UI/UX и высокая производительность.", price: "Подробнее", link: "/contact" },
                    { title: "AI Веб-конструктор", description: "От идеи до готового кода. Наш AI пишет чистый React/Tailwind код по вашему описанию.", price: "Подробнее", link: "/services/builder" }
                ]
            },
            {
                category: "AI & Автоматизация", items: [
                    { title: "Грузинские AI ассистенты", description: "Чат-боты для вашего бизнеса, говорящие на грузинском и обслуживающие клиентов 24/7.", price: "Подробнее", link: "/demos" },
                    { title: "AI автоматизация", description: "Автоматизация рутинных процессов с помощью ИИ. Интеграция CRM и ERP систем.", price: "Подробнее", link: "/contact" },
                    { title: "Аналитика данных", description: "Обработка больших данных (Big Data) и создание прогнозных моделей для бизнеса.", price: "Подробнее", link: "/contact" }
                ]
            },
            {
                category: "Аудит & Оптимизация", items: [
                    { title: "AI Аудит сайта", description: "Полный технический и SEO анализ с помощью ИИ. Обнаружьте проблемы за секунды.", price: "Подробнее", link: "/services/audit" },
                    { title: "SEO & Цифровой маркетинг", description: "Продвижение сайта в Google и техническая оптимизация (PageSpeed 100%).", price: "Подробнее", link: "/contact" },
                    { title: "Кибербезопасность", description: "Защита систем от атак, обнаружение уязвимостей и внедрение стандартов безопасности.", price: "Подробнее", link: "/contact" }
                ]
            }
        ]
    },
    auth: {
        loginTitle: "Авторизация", registerTitle: "Регистрация", resetTitle: "Восстановление пароля",
        emailLabel: "Эл. почта", emailPlaceholder: "example@mail.com",
        passwordLabel: "Пароль", passwordPlaceholder: "••••••••",
        nameLabel: "Имя", namePlaceholder: "Ваше имя",
        confirmPasswordLabel: "Подтвердите пароль", confirmPasswordPlaceholder: "••••••••",
        loginButton: "Войти", registerButton: "Зарегистрироваться", resetButton: "Отправить",
        forgotPassword: "Забыли пароль?",
        noAccount: "Нет аккаунта?", hasAccount: "Уже есть аккаунт?",
        backToLogin: "Назад к входу",
        orContinueWith: "или продолжить по email",
        termsText: "Регистрируясь, вы соглашаетесь с", termsLink: "Условиями использования", privacyLink: "Политикой конфиденциальности"
    },
    notFound: {
        title: "Страница не найдена",
        description: "К сожалению, страница, которую вы ищете, не существует, была перемещена или временно недоступна.",
        goBack: "Назад",
        goHome: "Главная страница"
    },
    cookieConsent: {
        title: "Мы используем файлы cookie",
        description: "Мы используем файлы cookie для улучшения вашего опыта и аналитики сайта. Подробнее см.",
        privacyLink: "Политику конфиденциальности",
        acceptButton: "Принять",
        declineButton: "Отклонить"
    },
    termsOfService: {
        pageTitle: "Условия использования",
        effectiveDate: "Действует с 12 февраля 2024 года",
        intro: "Добро пожаловать в AI Solutions Georgia. Используя наш сайт (imi.ge), вы соглашаетесь соблюдать нижеприведённые условия. Пожалуйста, внимательно ознакомьтесь с ними.",
        sections: [
            { title: "1. Общие положения", content: "", listItems: ["Использование наших услуг разрешено только лицам, достигшим 18 лет, или с согласия родителей/опекунов.", "Вы обязаны предоставлять точную и достоверную информацию при регистрации или заполнении контактных форм."] },
            { title: "2. Интеллектуальная собственность", content: "Все материалы на сайте, включая дизайн, текст, графику, логотипы и программный код, являются собственностью AI Solutions Georgia и защищены законом об авторском праве. Копирование, распространение или модификация материалов без нашего письменного согласия запрещены." },
            { title: "3. Запрещённые действия", content: "При использовании сервиса строго запрещается:", listItems: ["Распространение вирусов или вредоносного кода", "Попытки кибератак на систему", "Сбор данных других пользователей", "Перепродажа сервиса без разрешения", "Размещение незаконного или оскорбительного контента", "Использование автоматизированных скриптов (ботов)"] },
            { title: "4. Ограничение ответственности", content: "AI Solutions Georgia не несёт ответственности за любой прямой или косвенный ущерб, который может быть вызван использованием сервиса, перебоями или потерей данных. Информация, сгенерированная нашими AI-системами, носит справочный характер и не является профессиональной, юридической или финансовой консультацией." }
        ],
        footer: "Мы оставляем за собой право изменять эти условия в любое время. По вопросам пишите: hello@imi.ge"
    },
    privacyPolicy: {
        pageTitle: "Политика конфиденциальности",
        effectiveDate: "Последнее обновление: 12 февраля 2024 г.",
        intro: "AI Solutions Georgia (далее «мы») уважает вашу конфиденциальность и обязуется защищать ваши персональные данные. Настоящая политика объясняет, как мы собираем, используем и защищаем вашу информацию при использовании нашего сайта (imi.ge) и услуг.",
        sections: [
            { title: "1. Сбор информации", content: "Мы собираем следующие типы информации:", listItems: ["Персональные данные: имя, email, номер телефона.", "Технические данные: IP-адрес, тип браузера, тип устройства.", "Данные файлов cookie: информация о ваших предпочтениях."] },
            { title: "2. Использование информации", content: "Собранную информацию мы используем для оказания услуг, улучшения сервиса, маркетинга и обеспечения безопасности." },
            { title: "3. Безопасность данных", content: "Мы принимаем соответствующие технические и организационные меры для защиты ваших персональных данных. Мы используем SSL/TLS шифрование при передаче данных." },
            { title: "4. Третьи стороны", content: "Мы не продаём и не сдаём в аренду ваши персональные данные.", listItems: ["Нашим партнёрам-поставщикам услуг (напр., хостинг, аналитика).", "В случаях, предусмотренных законодательством."] }
        ],
        footer: "Есть вопросы? Свяжитесь с нами по вопросам защиты данных: hello@imi.ge"
    },
    seoMarketing: {
        badge: "SEO & Маркетинг", titlePrefix: "Цифровой", titleHighlight: "Маркетинг", titleSuffix: "и SEO", description: "SEO-стратегии и маркетинговые решения на основе данных.",
        features: [], ctaTitle: "Готовы к успеху?", ctaDescription: "Свяжитесь с нами для бесплатной консультации и первичного аудита.", ctaButton: "Связаться"
    },
    serviceBuilder: {
        badge: "AI Builder", titlePrefix: "Автоматическая", titleHighlight: "Генерация", titleSuffix: "Сайтов", description: "Опишите свою идею текстом, и наш AI напишет чистый, оптимизированный код (React + Tailwind).",
        features: [
            { title: "Чистый код", desc: "Наш AI не использует 'Drag & Drop'. Он пишет профессиональный React-код, который легко модифицировать." },
            { title: "Адаптивность", desc: "Сгенерированный дизайн автоматически адаптируется под мобильные, планшеты и десктопы." },
            { title: "Быстрая разработка", desc: "Сэкономьте 70% времени разработки. От идеи до прототипа за считанные минуты." }
        ],
        ctaTitle: "Полный пакет", ctaDescription: "AI Builder + поддержка разработчика", ctaButton: "Заказать"
    },
    errorBoundary: {
        title: "Произошла ошибка",
        description: "К сожалению, в приложении произошла непредвиденная ошибка. Наша команда уже работает над устранением проблемы.",
        reloadButton: "Перезагрузить страницу"
    },
    navLinks: [
        { path: '/', label: 'Главная' },
        { path: '/about', label: 'О нас' },
        { path: '/services', label: 'Услуги' },
        { path: '/portfolio', label: 'Портфолио' },
        { path: '/blog', label: 'Блог' },
    ]
};
