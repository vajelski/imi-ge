import { Activity, ArrowRight, ArrowUpRight, Bot, Check, CircleCheck, Database, Gauge, Headphones, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { Link } from '@/i18n/routing';
import WorkflowDiagram from './WorkflowDiagram';

type Locale = 'ka' | 'en';

const copy = {
  ka: {
    eyebrow: 'IMI.GE / AI OPERATING SYSTEMS',
    title: <>ერთი რთული პროცესი.<br /><span>უფრო ჭკვიანი</span> მუშაობა.</>,
    intro: 'ვქმნით AI სისტემებს, რომლებიც თქვენს მომხმარებლებს, ცოდნასა და გუნდს ერთ მოქმედ workflow-ში აერთიანებს.',
    primary: 'დაიწყეთ კონსულტაციით',
    secondary: 'ნახეთ შესაძლებლობები',
    live: 'სისტემა აქტიურია',
    workspace: 'AI სამუშაო სივრცე',
    request: 'ახალი გაყიდვების მოთხოვნა',
    requestText: 'სასტუმროს ქსელს სჭირდება სეზონური შეთავაზების მომზადება.',
    routed: 'სწორ გუნდთან გადამისამართდა',
    context: 'CRM + ზარები + ცოდნა',
    control: 'ადამიანის კონტროლი',
    queue: 'შემომავალი რიგი / 03 აქტიური',
    agents: ['მოთხოვნის ტრიაჟი', 'ცოდნის დამმუშავებელი', 'CRM კოორდინატორი'],
    agentState: 'მუშაობს',
    confidence: 'სანდოობის დონე',
    response: 'პასუხის დრო',
    responseValue: '01:24',
    integrationsLabel: 'ინტეგრაციები',
    integrations: ['CRM', 'Drive', 'Calls', 'Slack'],
    capabilityEyebrow: 'ერთი ოპერაციული ფენა',
    capabilityTitle: 'AI არ არის კიდევ ერთი აპლიკაცია.',
    capabilityText: 'ის არის ინტერფეისი, რომელიც თქვენს პროცესებს აკავშირებს და გუნდს შემდეგ სწორ ნაბიჯს აჩვენებს.',
    capabilities: [
      ['Voice AI', 'ბუნებრივი საუბარი, კვალიფიკაცია და ადამიანთან გადამისამართება.', Headphones],
      ['Knowledge layer', 'დოკუმენტები და შიდა ცოდნა წყაროზე მიბმულ პასუხებად.', Database],
      ['AI CRM', 'ყველა ლიდს აქვს კონტექსტი, პრიორიტეტი და შემდეგი მოქმედება.', Bot],
      ['Automation', 'განმეორებადი სამუშაო სრულდება წესებითა და კონტროლით.', Workflow],
    ] as const,
    processEyebrow: 'როგორ ვმუშაობთ',
    processTitle: 'პატარა პილოტი. გაზომვადი შედეგი. შემდეგ მასშტაბირება.',
    processText: 'ვიწყებთ ერთი ძვირადღირებული friction-ით და ვაშენებთ სისტემას, რომელსაც თქვენი გუნდი მართავს.',
    steps: [['01', 'აღმოჩენა', 'ვპოულობთ პროცესს, სადაც დრო და კონტექსტი იკარგება.'], ['02', 'დანერგვა', 'ვაერთიანებთ მონაცემებს, წესებსა და ადამიანურ კონტროლს.'], ['03', 'მფლობელობა', 'გუნდი იღებს მართვად სისტემას და გაზომვად შედეგს.']] as const,
    productsEyebrow: 'პროდუქტები მოქმედებაში',
    productsTitle: 'ტექნოლოგია, რომელიც რეალურ ამოცანას პასუხობს.',
    productsText: 'AI, voice, data და marketplace გამოცდილება უკვე მოქმედ პროდუქტებად გვაქვს ქცეული.',
    products: [['Ertaoza', 'ქართული voice AI'], ['CORD.GE', 'ხმის პლატფორმა'], ['Urbania', 'ურბანული AI აუდიტი'], ['Breeding.ge', 'მონაცემებზე დაფუძნებული ბაზარი']] as const,
    ctaEyebrow: 'შემდეგი გადაწყვეტილება',
    ctaTitle: 'მოიტანეთ ერთი რთული პროცესი.',
    ctaText: 'ერთად ვაქცევთ მას უსაფრთხო, გაზომვად AI workflow-ად.',
    cta: 'დავგეგმოთ შემდეგი ნაბიჯი',
  },
  en: {
    eyebrow: 'IMI.GE / AI OPERATING SYSTEMS',
    title: <>One difficult process.<br /><span>Smarter</span> work.</>,
    intro: 'We build AI systems that connect your customers, knowledge, and team in one practical workflow.',
    primary: 'Start a consultation',
    secondary: 'Explore capabilities',
    live: 'System is active',
    workspace: 'AI workspace',
    request: 'New sales request',
    requestText: 'A hotel group needs a seasonal offer prepared for its team.',
    routed: 'Routed to the right team',
    context: 'CRM + calls + knowledge',
    control: 'Human control',
    queue: 'INBOX / 03 ACTIVE',
    agents: ['Request triage', 'Knowledge handler', 'CRM coordinator'],
    agentState: 'Running',
    confidence: 'Confidence',
    response: 'Response time',
    responseValue: '01:24',
    integrationsLabel: 'Integrations',
    integrations: ['CRM', 'Drive', 'Calls', 'Slack'],
    capabilityEyebrow: 'One operating layer',
    capabilityTitle: 'AI is not another application.',
    capabilityText: 'It is an interface that connects your processes and shows the team the next right action.',
    capabilities: [
      ['Voice AI', 'Natural conversations, qualification, and intelligent handoff.', Headphones],
      ['Knowledge layer', 'Documents and internal knowledge become source-grounded answers.', Database],
      ['AI CRM', 'Every lead gets context, priority, and a clear next action.', Bot],
      ['Automation', 'Repeatable work follows rules, approvals, and control.', Workflow],
    ] as const,
    processEyebrow: 'How we work',
    processTitle: 'A focused pilot. A measurable result. Then scale.',
    processText: 'We start with one expensive point of friction and build a system your team can own.',
    steps: [['01', 'Discover', 'Find where time and context are being lost.'], ['02', 'Implement', 'Connect data, rules, and human control.'], ['03', 'Own', 'Give the team a manageable system and measurable result.']] as const,
    productsEyebrow: 'Products in action',
    productsTitle: 'Technology built around real problems.',
    productsText: 'AI, voice, data, and marketplace experience turned into products already in use.',
    products: [['Ertaoza', 'Georgian voice AI'], ['CORD.GE', 'Voice platform'], ['Urbania', 'Urban intelligence'], ['Breeding.ge', 'Data-driven marketplace']] as const,
    ctaEyebrow: 'The next decision',
    ctaTitle: 'Bring one difficult process.',
    ctaText: 'Together, we turn it into a secure, measurable AI workflow.',
    cta: 'Plan the next step',
  },
} satisfies Record<Locale, object>;

export default function HomeExperience({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return <div className="home-experience">
    <section className="home-hero">
      <div className="home-container home-hero__grid">
        <div className="home-hero__copy">
          <p className="home-eyebrow"><span className="home-eyebrow__dot" />{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="home-hero__intro">{t.intro}</p>
          <div className="home-actions"><Link href="/consultation" className="home-button home-button--dark">{t.primary}<ArrowUpRight size={17} /></Link><Link href="/services" className="home-button home-button--outline">{t.secondary}<ArrowRight size={17} /></Link></div>
          <div className="home-proof"><span><Check size={14} /> {locale === 'ka' ? 'ქართული მხარდაჭერა' : 'Georgian-first'}</span><span><ShieldCheck size={14} /> {locale === 'ka' ? 'ადამიანის კონტროლი' : 'Human-controlled'}</span></div>
        </div>
         <div className="home-console" aria-label={t.workspace}>
           <div className="home-console__top"><span className="home-console__label"><Sparkles size={13} aria-hidden="true" />{t.workspace}</span><span className="home-console__status"><i />{t.live}</span></div>
           <div className="home-console__screen">
             <div className="home-console__screen-bar"><span>{t.queue}</span><span className="home-console__screen-dots"><i /><i /><i /></span></div>
             <div className="home-console__flow" aria-hidden="true"><span className="home-console__flow-line home-console__flow-line--one" /><span className="home-console__flow-line home-console__flow-line--two" /><span className="home-console__flow-node home-console__flow-node--input"><Activity size={15} /></span><span className="home-console__flow-node home-console__flow-node--core"><Bot size={18} /></span><span className="home-console__flow-node home-console__flow-node--output"><CircleCheck size={15} /></span></div>
             <div className="home-console__request"><div className="home-console__request-head"><span>{t.request}</span><span>09:42</span></div><p>{t.requestText}</p><div className="home-console__route"><span className="home-console__avatar">AI</span><span>{t.routed}</span><ArrowRight size={14} /></div></div>
             <div className="home-console__agents"><p className="home-console__agents-label">{t.context}</p>{t.agents.map((agent, index) => <div className={`home-agent-card${index === 0 ? ' home-agent-card--active' : ''}`} key={agent}><span className="home-agent-card__icon">{index === 0 ? <Activity size={14} /> : index === 1 ? <Database size={14} /> : <Gauge size={14} />}</span><span className="home-agent-card__name"><strong>{agent}</strong><small>{index === 0 ? t.agentState : index === 1 ? t.confidence : t.control}</small></span><span className="home-agent-card__signal"><i />{index === 0 ? '98%' : index === 1 ? 'A+' : 'OK'}</span></div>)}</div>
             <div className="home-console__metric-row"><span><small>{t.response}</small><strong>{t.responseValue}</strong></span><span><small>{t.confidence}</small><strong>98.4%</strong></span><span><small>{t.control}</small><strong><ShieldCheck size={13} /> ON</strong></span></div>
             <div className="home-console__integrations"><small>{t.integrationsLabel}</small><div>{t.integrations.map((integration) => <span key={integration}>{integration}</span>)}</div></div>
           </div>
           <div className="home-console__footer"><span>{t.context}</span><span className="home-console__divider" /><span>{t.control}</span></div>
         </div>
      </div>
    </section>

    <section className="home-capabilities"><div className="home-container"><div className="home-section-heading"><div><p className="home-eyebrow">{t.capabilityEyebrow}</p><h2>{t.capabilityTitle}</h2></div><p>{t.capabilityText}</p></div><div className="home-capability-grid">{t.capabilities.map(([title, text, Icon], index) => <article key={title} className="home-capability"><span className="home-capability__number">0{index + 1}</span><div className="home-capability__icon"><Icon size={21} /></div><h3>{title}</h3><p>{text}</p><ArrowUpRight className="home-capability__arrow" size={18} /></article>)}</div></div></section>

     <section className="home-process"><div className="home-container home-process__grid"><div className="home-process__intro"><p className="home-eyebrow">{t.processEyebrow}</p><h2>{t.processTitle}</h2><p>{t.processText}</p><WorkflowDiagram locale={locale} /></div><div className="home-steps">{t.steps.map(([number, title, text]) => <div className="home-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

     <section className="home-products"><div className="home-container"><div className="home-section-heading home-section-heading--products"><div><p className="home-eyebrow">{t.productsEyebrow}</p><h2>{t.productsTitle}</h2></div><div className="home-products__aside"><div className="home-products__index" aria-hidden="true"><strong>04</strong><span /><i /></div><p>{t.productsText}</p></div></div><div className="home-product-grid">{t.products.map(([name, detail], index) => <Link key={name} href={name === 'Urbania' ? '/projects/urbania' : '/projects'} className="home-product"><span>0{index + 1}</span><h3>{name}</h3><p>{detail}</p><ArrowUpRight size={18} /></Link>)}</div></div></section>

    <section className="home-cta"><div className="home-container home-cta__inner"><div><p className="home-eyebrow">{t.ctaEyebrow}</p><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p></div><Link href="/consultation" className="home-button home-button--light">{t.cta}<ArrowUpRight size={17} /></Link></div></section>
  </div>;
}
