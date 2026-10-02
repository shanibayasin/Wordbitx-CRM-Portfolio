export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number; // monthly rate when billed yearly
  popular?: boolean;
  ctaText: string;
  features: string[];
  limitations?: string[];
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Essential pipeline and contact tracking for small sales teams.',
    priceMonthly: 39,
    priceYearly: 29,
    ctaText: 'Start Free Trial',
    features: [
      'Up to 3 team members',
      '1 dedicated workspace',
      'Up to 2,500 leads & contacts',
      '2 active visual sales pipelines',
      'Email & calendar 2-way sync',
      'Standard lead scoring & assignment',
      'Basic workflow automations (5 rules)',
      'Community & email support'
    ],
    limitations: [
      'No custom telephony/PBX integration',
      'No AI assistant generation credits',
      'No advanced audit logging'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    badge: 'Most Popular',
    tagline: 'Complete CRM, telephony operations, and automation for growing firms.',
    priceMonthly: 99,
    priceYearly: 79,
    popular: true,
    ctaText: 'Start 14-Day Free Trial',
    features: [
      'Up to 15 team members',
      'Up to 3 workspaces (e.g. Sales, Support, Operations)',
      'Unlimited leads, contacts & companies',
      'Unlimited custom sales pipelines',
      'Call center queue & agent performance dashboard',
      'Telephony integration (Twilio, Vonage & SIP bridge)',
      'Full ticket management with SLA countdowns',
      'Advanced visual workflow engine (unlimited rules)',
      'AI CRM Assistant (1,000 insights/mo)',
      'Role-based access controls (RBAC)',
      'Priority email & chat support'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Tailored Scale',
    tagline: 'Custom security governance, dedicated infrastructure & full API control.',
    priceMonthly: 189,
    priceYearly: 149,
    ctaText: 'Talk to Sales',
    features: [
      'Unlimited team members & seats',
      'Unlimited isolated workspaces & subsidiaries',
      'Custom on-premises SIP/PBX trunking support',
      'Custom role permissions & field-level security',
      'Full security audit logs & export compliance',
      'Dedicated REST API throughput & webhooks',
      'Enterprise AI assistant (unlimited volume)',
      'Custom data migration assistance',
      '99.9% uptime SLA with dedicated CSM',
      'Custom billing & invoice terms'
    ]
  }
];

export interface ComparisonCategory {
  category: string;
  features: {
    name: string;
    starter: string | boolean;
    business: string | boolean;
    enterprise: string | boolean;
  }[];
}

export const PRICING_COMPARISON: ComparisonCategory[] = [
  {
    category: 'Capacity & Workspaces',
    features: [
      { name: 'Team Members / Seats', starter: '3 users', business: '15 included (add-ons avail)', enterprise: 'Unlimited' },
      { name: 'Independent Workspaces', starter: '1 workspace', business: '3 workspaces', enterprise: 'Unlimited' },
      { name: 'Total Contacts & Companies', starter: '2,500 records', business: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'Custom Sales Pipelines', starter: '2 pipelines', business: 'Unlimited', enterprise: 'Unlimited' }
    ]
  },
  {
    category: 'Sales & Pipeline Management',
    features: [
      { name: 'Visual Kanban Deal Stages', starter: true, business: true, enterprise: true },
      { name: 'Multi-factor Lead Scoring', starter: 'Basic rules', business: 'Advanced multi-factor', enterprise: 'Custom algorithm' },
      { name: 'Weighted Revenue Forecasting', starter: false, business: true, enterprise: true },
      { name: 'Automated Round-Robin Routing', starter: true, business: true, enterprise: true },
      { name: 'Stagnant Deal Alerts', starter: false, business: true, enterprise: true }
    ]
  },
  {
    category: 'Call Center & Telephony',
    features: [
      { name: 'Agent Presence & Queue Console', starter: false, business: true, enterprise: true },
      { name: 'Twilio / Vonage Voice Integration', starter: false, business: true, enterprise: true },
      { name: 'Custom On-Premises SIP / PBX Bridge', starter: false, business: false, enterprise: true },
      { name: 'Inbound Screen-pops on Ring', starter: false, business: true, enterprise: true },
      { name: 'Call Recording & Disposition Logs', starter: false, business: true, enterprise: true }
    ]
  },
  {
    category: 'Customer Support Desk',
    features: [
      { name: 'Ticket Management & SLA Counters', starter: false, business: true, enterprise: true },
      { name: 'Customer 360° Commercial Context', starter: false, business: true, enterprise: true },
      { name: 'Canned Responses & Internal Notes', starter: false, business: true, enterprise: true },
      { name: 'CSAT Automated Surveys', starter: false, business: true, enterprise: true }
    ]
  },
  {
    category: 'Automation & AI Intelligence',
    features: [
      { name: 'Visual Workflow Builder', starter: '5 rules max', business: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'AI Lead Summary & Intent Rating', starter: false, business: '1,000 credits/mo', enterprise: 'Unlimited' },
      { name: 'AI Follow-up Email Generator', starter: false, business: true, enterprise: true },
      { name: 'AI Deal Health & Anomaly Signals', starter: false, business: true, enterprise: true }
    ]
  },
  {
    category: 'Governance & Security',
    features: [
      { name: 'Role-Based Access Control (RBAC)', starter: 'Standard roles', business: 'Granular roles', enterprise: 'Custom matrix' },
      { name: 'Comprehensive Audit Logs', starter: false, business: '30-day retention', enterprise: '7-year compliance retention' },
      { name: 'REST API & Webhooks', starter: 'Read-only', business: 'Full CRUD', enterprise: 'Dedicated high-rate limits' },
      { name: 'Data Export (CSV/JSON)', starter: true, business: true, enterprise: true },
      { name: 'Dedicated Account Manager', starter: false, business: false, enterprise: true }
    ]
  }
];
