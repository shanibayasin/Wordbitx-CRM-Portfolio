export interface NavItem {
  name: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface MegaMenuCategory {
  title: string;
  items: NavItem[];
}

export const PRODUCT_MENU: MegaMenuCategory[] = [
  {
    title: 'Core CRM & Sales',
    items: [
      { name: 'CRM Overview', href: '/#crm-overview', description: 'Centralized visibility for deals, teams & activities' },
      { name: 'Lead Management', href: '/#lead-management', description: 'Capture, score, assign and nurture inbound leads' },
      { name: 'Sales Pipeline', href: '/#sales-pipeline', description: 'Visual Kanban pipeline with stage conversion metrics' },
      { name: 'Customer Management', href: '/#customer-management', description: '360° timeline of calls, emails and touchpoints' }
    ]
  },
  {
    title: 'Operations & Intelligence',
    items: [
      { name: 'Call Center', href: '/#call-center', description: 'Real-time queues, agent performance & telephony stack' },
      { name: 'Customer Support', href: '/#customer-support', description: 'Context-rich ticket tracking with SLA management' },
      { name: 'Workflow Automation', href: '/#automation', description: 'Trigger actions, assignment rules & auto follow-ups' },
      { name: 'AI CRM Assistant', href: '/#ai-crm', description: 'Lead summaries, smart follow-up & predictive scoring' }
    ]
  }
];

export const SOLUTIONS_MENU: MegaMenuCategory[] = [
  {
    title: 'By Team',
    items: [
      { name: 'Sales Teams', href: '/solutions#sales-teams', description: 'Close deals faster with unified pipeline management' },
      { name: 'Call Centers', href: '/solutions#call-centers', description: 'Empower agents with customer history on incoming calls' },
      { name: 'Customer Support', href: '/solutions#customer-support', description: 'Resolve complex tickets without bouncing between apps' },
      { name: 'Agencies', href: '/solutions#agencies', description: 'Manage multiple client pipelines and retainers smoothly' }
    ]
  },
  {
    title: 'By Industry & Scale',
    items: [
      { name: 'Real Estate', href: '/solutions#real-estate', description: 'Track property buyers, viewings and commission milestones' },
      { name: 'E-commerce & Retail', href: '/solutions#ecommerce', description: 'Connect orders, high-value shoppers and repeat campaigns' },
      { name: 'Growing Businesses', href: '/solutions#growing-businesses', description: 'Replace disconnected spreadsheets with one operating system' },
      { name: 'Enterprise Operations', href: '/solutions#enterprise', description: 'Multi-workspace segregation, custom RBAC & audit logs' }
    ]
  }
];

export const RESOURCES_MENU: MegaMenuCategory[] = [
  {
    title: 'Knowledge & Guidance',
    items: [
      { name: 'CRM Implementation Guide', href: '/resources#crm-guide', description: 'How to transition your team to WordbitX smoothly' },
      { name: 'Sales Velocity Playbook', href: '/resources#sales-guide', description: 'Proven pipeline stages and qualification models' },
      { name: 'Automation Library', href: '/resources#automation-guide', description: 'Pre-built blueprints for lead distribution & SLA reminders' },
      { name: 'AI Sales Playbook', href: '/resources#ai-guide', description: 'Using generative assistance for realistic high-intent follow-ups' }
    ]
  },
  {
    title: 'Support & Updates',
    items: [
      { name: 'Product Documentation', href: '/resources#docs', description: 'API reference, webhooks and developer guides' },
      { name: 'Help Center', href: '/resources#help', description: 'Step-by-step walkthroughs for common admin tasks' },
      { name: 'Case Studies', href: '/resources#case-studies', description: 'Realistic transformation examples across diverse industries' },
      { name: 'FAQ & Architecture', href: '/#faq', description: 'Frequently asked questions on data security & pricing' }
    ]
  }
];
