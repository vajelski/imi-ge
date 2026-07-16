import { ArrowRight, Check, Database, FileInput, GitBranch, UserRound, type LucideIcon } from 'lucide-react';

type Locale = 'ka' | 'en';

interface WorkflowDiagramProps {
  locale: Locale;
  compact?: boolean;
}

type WorkflowCopy = {
  title: string;
  description: string;
  stages: { label: string; detail: string; Icon: LucideIcon }[];
  status: string;
};

const copy: Record<Locale, WorkflowCopy> = {
  ka: {
    title: 'რეალური workflow, ერთი კონტროლირებადი ჯაჭვი',
    description: 'მოთხოვნა გადის ცოდნისა და გადაწყვეტილების ფენებს, სანამ CRM-ში ჩაიწერება ან ადამიანის დამტკიცებამდე მივა.',
    stages: [
      { label: 'მიღება', detail: 'ზარი, ფორმა ან CRM მოთხოვნა', Icon: FileInput },
      { label: 'ცოდნა', detail: 'დოკუმენტები, წესები და კონტექსტი', Icon: Database },
      { label: 'გადაწყვეტილება', detail: 'AI აჯამებს და სთავაზობს შემდეგ ნაბიჯს', Icon: GitBranch },
      { label: 'CRM / ადამიანი', detail: 'ჩანაწერი, შეტყობინება ან დამტკიცება', Icon: UserRound },
    ],
    status: 'კონტროლი შენარჩუნებულია',
  },
  en: {
    title: 'A real workflow, one controlled chain',
    description: 'A request moves through knowledge and decision layers before it is written to the CRM or sent for human approval.',
    stages: [
      { label: 'Intake', detail: 'Call, form, or CRM request', Icon: FileInput },
      { label: 'Knowledge', detail: 'Documents, rules, and context', Icon: Database },
      { label: 'Decision', detail: 'AI summarizes and proposes the next step', Icon: GitBranch },
      { label: 'CRM / human', detail: 'Record, notification, or approval', Icon: UserRound },
    ],
    status: 'Control remains visible',
  },
};

export default function WorkflowDiagram({ locale, compact = false }: WorkflowDiagramProps) {
  const t = copy[locale];

  return (
    <figure className={`workflow-diagram${compact ? ' workflow-diagram--compact' : ''}`} aria-labelledby={`workflow-title-${locale}`}>
      <figcaption className="workflow-diagram__heading">
        <div>
          <p className="workflow-diagram__kicker">{locale === 'en' ? 'SYSTEM MAP / 04 STAGES' : 'სისტემის რუკა / 04 ეტაპი'}</p>
          <h3 id={`workflow-title-${locale}`}>{t.title}</h3>
        </div>
        {!compact && <p>{t.description}</p>}
      </figcaption>
      <ol className="workflow-diagram__stages">
        {t.stages.map(({ label, detail, Icon }, index) => (
          <li className="workflow-diagram__stage" key={label}>
            <div className="workflow-diagram__stage-top">
              <span className="workflow-diagram__number">0{index + 1}</span>
              <Icon size={18} aria-hidden="true" />
            </div>
            <strong>{label}</strong>
            <span>{detail}</span>
            {index < t.stages.length - 1 && <ArrowRight className="workflow-diagram__arrow" size={16} aria-hidden="true" />}
          </li>
        ))}
      </ol>
      {!compact && <div className="workflow-diagram__status"><Check size={15} aria-hidden="true" />{t.status}</div>}
    </figure>
  );
}
