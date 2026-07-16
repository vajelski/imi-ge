export const docs = [
  { slug: 'ai-readiness', title: 'AI მზადყოფნის გზამკვლევი', description: 'როგორ შეაფასოთ პროცესი, მონაცემები, პასუხისმგებლობა და შედეგი AI პილოტის დაწყებამდე.', sections: [['მიზანი', 'AI პროექტი იწყება ერთი მკაფიო ბიზნეს-ამოცანით და არა შემთხვევითი ინსტრუმენტით.'], ['შეამოწმეთ საფუძველი', 'დაადგინეთ, არსებობს თუ არა განმეორებადი პროცესი, ხელმისაწვდომი მონაცემი, პასუხისმგებელი გუნდი და გაზომვადი შედეგი.'], ['შემდეგი ნაბიჯი', 'AI readiness შეფასების შემდეგ შეარჩიეთ ვიწრო პილოტი, რომელსაც აქვს მკაფიო ხარისხის კონტროლი.']] },
  { slug: 'rag-systems', title: 'RAG სისტემების გზამკვლევი', description: 'კომპანიის ცოდნის ფენა, წყაროზე მიბმული პასუხები და წვდომის კონტროლი.', sections: [['რა არის RAG', 'RAG აკავშირებს ენის მოდელს თქვენს დამტკიცებულ დოკუმენტებთან, რათა პასუხი სწორ წყაროს დაეყრდნოს.'], ['უსაფრთხოება', 'წინასწარ უნდა განისაზღვროს, რომელი დოკუმენტი ვის შეუძლია იხილოს და როდის უნდა ჩაერთოს ადამიანი.'], ['პილოტი', 'დაიწყეთ ერთი გუნდისა და ერთი დოკუმენტური წყაროს კონკრეტული კითხვებით.']] },
  { slug: 'voice-ai', title: 'ხმოვანი AI-ის გზამკვლევი', description: 'როგორ იგეგმება ქართულენოვანი ხმოვანი ასისტენტი მომხმარებლის მხარდაჭერისა და გაყიდვებისთვის.', sections: [['სცენარი', 'ხმის ასისტენტმა უნდა იცოდეს, რას პასუხობს, რა დეტალს აგროვებს და როდის გზავნის მოთხოვნას ადამიანთან.'], ['ინტეგრაცია', 'საუბრის შედეგი უნდა შევიდეს CRM-ში ან სამუშაო პროცესში ისე, რომ კონტექსტი არ დაიკარგოს.'], ['ხარისხი', 'სისტემის ხარისხი იზომება პასუხის სისწორით, გადამისამართების ხარისხითა და გადაწყობილი მოთხოვნებით.']] },
  { slug: 'ai-governance', title: 'AI უსაფრთხოებისა და მართვის გზამკვლევი', description: 'წვდომა, ხარისხი, მონაცემის საზღვრები და ადამიანის კონტროლი AI სისტემებში.', sections: [['პოლიტიკა', 'განსაზღვრეთ, რა მონაცემს იყენებს სისტემა და ვის აქვს ამ მონაცემზე წვდომა.'], ['კონტროლი', 'მაღალი რისკის ან ბუნდოვანი შემთხვევა უნდა ბრუნდებოდეს პასუხისმგებელ ადამიანთან.'], ['მონიტორინგი', 'განიხილეთ პასუხის ხარისხი, გამონაკლისები და პროცესის შედეგი რეგულარულად.']] },
] as const;

export const docBySlug = (slug: string) => docs.find((doc) => doc.slug === slug);

export const englishDocs = {
  'ai-readiness': { title: 'AI readiness guide', description: 'How to assess process, data, ownership, and outcomes before an AI pilot.', sections: [['Goal', 'An AI project starts with one clear business problem, not a random tool.'], ['Check the foundation', 'Confirm that there is a repeatable process, available data, an accountable team, and a measurable outcome.'], ['Next step', 'After the readiness assessment, choose a narrow pilot with clear quality controls.']] },
  'rag-systems': { title: 'RAG systems guide', description: 'Grounded company knowledge, source-linked answers, and access control.', sections: [['What is RAG?', 'RAG connects a language model to approved documents so answers can be grounded in the right source.'], ['Security', 'Define who can see each document and when a person must be involved before the pilot starts.'], ['Pilot', 'Start with concrete questions from one team and one document source.']] },
  'voice-ai': { title: 'Voice AI guide', description: 'How to plan a Georgian or multilingual voice assistant for support and sales.', sections: [['Scenario', 'A voice assistant should know what to answer, what detail to collect, and when to route a request to a person.'], ['Integration', 'The conversation outcome should enter the CRM or workflow without losing context.'], ['Quality', 'Measure answer accuracy, handoff quality, and successfully resolved requests.']] },
  'ai-governance': { title: 'AI governance guide', description: 'Access, quality, data boundaries, and human control for production AI.', sections: [['Policy', 'Define which data the system uses and who can access it.'], ['Control', 'High-risk or ambiguous cases should return to a responsible person.'], ['Monitoring', 'Review answer quality, exceptions, and process outcomes regularly.']] },
} as const;

export function getLocalizedDoc(slug: string, locale: 'ka' | 'en') {
  const doc = docBySlug(slug);
  if (!doc) return null;
  const translation = locale === 'en' ? englishDocs[slug as keyof typeof englishDocs] : null;
  return translation ? { ...doc, ...translation } : doc;
}
