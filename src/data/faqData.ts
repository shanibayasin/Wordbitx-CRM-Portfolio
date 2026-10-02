export interface FaqItem {
  id: string;
  category: 'General' | 'Sales & CRM' | 'Telephony' | 'Security & Tech';
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is WordbitX?',
    answer: 'WordbitX is an advanced CRM and business operations platform designed to unite sales pipelines, customer records, team collaboration, call center operations, support tickets, workflow automations, and AI assistance into one coherent workspace.'
  },
  {
    id: 'faq-2',
    category: 'General',
    question: 'Who is WordbitX built for?',
    answer: 'WordbitX is built for modern sales teams, multi-agent call centers, customer support departments, agencies handling multiple clients, and growing businesses that have outgrown disjointed point solutions.'
  },
  {
    id: 'faq-3',
    category: 'Sales & CRM',
    question: 'Can I manage custom sales pipelines and stages?',
    answer: 'Yes. You can build multiple visual Kanban pipelines with custom stages, deal probability weightings, mandatory qualification checklists, and automated notifications when deals progress or stall.'
  },
  {
    id: 'faq-4',
    category: 'Sales & CRM',
    question: 'How does lead scoring and assignment work?',
    answer: 'WordbitX calculates an intent score (0–100) based on demographic attributes and real-time interaction signals (e.g. form fields, proposal views, email clicks). Leads can then be automatically distributed using round-robin or territory rules.'
  },
  {
    id: 'faq-5',
    category: 'Telephony',
    question: 'Does WordbitX support call center telephony?',
    answer: 'Yes. WordbitX provides an integrated call center console that connects to your existing telephony stack (Twilio, Vonage, or custom SIP/PBX bridges). Agents get live screen-pops with customer history on incoming rings.'
  },
  {
    id: 'faq-6',
    category: 'Security & Tech',
    question: 'Does WordbitX support multiple isolated workspaces?',
    answer: 'Yes. Organizations can provision isolated workspaces for separate divisions, subsidiaries, or agency clients. Data, custom fields, pipelines, and roles remain strictly segregated within each workspace.'
  },
  {
    id: 'faq-7',
    category: 'Security & Tech',
    question: 'What roles and permissions are supported?',
    answer: 'WordbitX includes pre-configured roles (Super Admin, Admin, Manager, Sales Agent, Support Agent, Viewer) alongside an editable Role-Based Access Control (RBAC) matrix for fine-grained permissions over leads, deals, reports, and settings.'
  },
  {
    id: 'faq-8',
    category: 'General',
    question: 'How do the AI capabilities work?',
    answer: 'WordbitX provides practical, contextual AI assistance directly within your records. It generates one-click lead summaries, crafts objection-aware follow-up emails, detects deal velocity risks, and answers operational questions about daily tasks.'
  },
  {
    id: 'faq-9',
    category: 'Security & Tech',
    question: 'Can I export my data or connect via API?',
    answer: 'Absolutely. You retain full ownership of your data. You can export complete CSV or JSON backups at any time, or use our developer-friendly REST API v1 and inbound/outbound webhooks to build bespoke integrations.'
  },
  {
    id: 'faq-10',
    category: 'General',
    question: 'Can I book a personalized live demo?',
    answer: 'Yes! Head to our Book a Demo page or click "Book a Demo" anywhere on the site. You can select your primary interest areas and preferred schedule to connect directly with a product specialist.'
  }
];
