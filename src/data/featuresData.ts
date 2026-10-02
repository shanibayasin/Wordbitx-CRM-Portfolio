export interface FeatureDetail {
  id: string;
  category: 'Sales' | 'Operations' | 'Intelligence' | 'Platform';
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  useCase: string;
  ctaText: string;
}

export const FEATURES_DATA: FeatureDetail[] = [
  {
    id: 'lead-management',
    category: 'Sales',
    title: 'Intelligent Lead Management',
    tagline: 'Capture, score, assign, and convert without leakage',
    description: 'Transform inbound website inquiries, email prospects, and webhook signals into prioritized leads. Automatically calculate intent scores, route to the best available rep, and maintain complete contact provenance.',
    highlights: [
      'Multi-factor lead scoring based on demographic fit and engagement signals',
      'Instant round-robin or territory-based lead routing',
      'Full provenance tracking: source, UTM parameters, and initial landing page',
      'Automated task generation for SLA-enforced 15-minute follow-ups'
    ],
    useCase: 'A fast-growing B2B SaaS receives 150 daily inquiries; WordbitX scores high-intent enterprise accounts and routes them to senior reps in under 3 minutes.',
    ctaText: 'Explore Lead Routing'
  },
  {
    id: 'sales-pipeline',
    category: 'Sales',
    title: 'Visual Kanban Sales Pipeline',
    tagline: 'Real-time visibility into deal velocity and stage conversions',
    description: 'Track deals visually across custom revenue stages. Spot stalled negotiations, forecast quarterly pipeline weighting accurately, and understand exactly which activities trigger stage progression.',
    highlights: [
      'Interactive drag-and-drop Kanban board with custom qualification gates',
      'Weighted revenue forecasts based on historical stage win rates',
      'Stagnation alerts when a deal sits idle beyond expected velocity thresholds',
      'One-click quote generation and stage-synced activity logs'
    ],
    useCase: 'Sales directors monitor 4 separate regional pipelines in real time with automated probability updates whenever proposals are opened.',
    ctaText: 'View Pipeline Demo'
  },
  {
    id: 'contact-management',
    category: 'Sales',
    title: '360° Customer & Company Profiles',
    tagline: 'Every customer touchpoint consolidated into one living timeline',
    description: 'Never ask a customer to repeat themselves. WordbitX unifies emails, telephony call recordings, support tickets, invoices, and notes into an immutable chronological history.',
    highlights: [
      'Chronological activity feed uniting sales calls, emails, and support tickets',
      'Multi-contact company hierarchies with role identification',
      'Rich custom fields, tags, and automated relationship health scores',
      'Direct click-to-email and click-to-call actions from the contact header'
    ],
    useCase: 'Account managers prepare for quarterly business reviews in seconds by glancing at the complete touchpoint history and active tickets.',
    ctaText: 'See Contact Profiles'
  },
  {
    id: 'call-center',
    category: 'Operations',
    title: 'Integrated Call Center & Telephony',
    tagline: 'Connect customer phone calls directly into your CRM records',
    description: 'Bridge standard telephony protocols (SIP, Twilio, Vonage, PBX systems) with your CRM records. Provide agents with instant caller identification, screen-pops, queue monitoring, and live call logging.',
    highlights: [
      'Live queue dashboard with waiting caller counts and SLA timers',
      'Real-time agent presence (Available, In Call, Wrap-up, Break)',
      'Instant screen-pop showing caller deal history and open tickets',
      'Automatic call recording attachment and disposition tagging'
    ],
    useCase: 'A customer support team handles 800 inbound calls daily with zero manual data entry; call durations and recordings link directly to the contact.',
    ctaText: 'Explore Telephony'
  },
  {
    id: 'customer-support',
    category: 'Operations',
    title: 'Context-Rich Ticket Management',
    tagline: 'Resolve support inquiries without losing the commercial context',
    description: 'Eliminate the wall between sales and support. Agents see open deals and VIP status alongside tickets, while sales reps know if a high-value prospect has unresolved onboarding issues.',
    highlights: [
      'Omnichannel ticket intake via email, web forms, and API hooks',
      'SLA countdown clocks with priority escalation workflows',
      'Side-by-side customer profile displaying active deals and purchase tier',
      'Canned responses, internal collaborator notes, and CSAT surveys'
    ],
    useCase: 'Tier-2 technical support escalates payment questions directly to the dedicated account executive without transferring the ticket off-platform.',
    ctaText: 'Review Support Desk'
  },
  {
    id: 'automation',
    category: 'Operations',
    title: 'Visual Workflow Engine',
    tagline: 'Automate the busywork between your business processes',
    description: 'Design multi-branch automations with our intuitive visual canvas. Trigger assignments, notifications, webhook dispatches, and deal updates automatically based on custom business rules.',
    highlights: [
      'Trigger-Condition-Action visual flowchart editor',
      'Multi-condition branching (e.g., Score > 80 AND Region = North America)',
      'Pre-built templates for lead nurturing, SLA alerts, and deal milestones',
      'Execution audit logs showing every trigger timestamp and state mutation'
    ],
    useCase: 'When a deal moves to "Won", the system automatically creates an onboarding ticket, invites the client to the portal, and notifies the account team.',
    ctaText: 'Build Automations'
  },
  {
    id: 'ai-crm',
    category: 'Intelligence',
    title: 'AI Sales & Operations Assistant',
    tagline: 'Actionable business assistance grounded in your actual CRM data',
    description: 'Cut meeting prep and message drafting time in half. WordbitX AI summarizes lengthy email threads, crafts personalized follow-up proposals, detects churn risk, and suggests high-intent next actions.',
    highlights: [
      'One-click comprehensive lead summaries with budget and intent analysis',
      'Dynamic follow-up generator tailored to recent call notes and objections',
      'Deal velocity anomaly detection and purchase probability scoring',
      'Natural-language query console: "Which leads need attention today?"'
    ],
    useCase: 'A sales rep generates a personalized, objection-resolving follow-up email in 5 seconds right after hanging up an initial discovery call.',
    ctaText: 'Test AI Assistant'
  },
  {
    id: 'analytics',
    category: 'Intelligence',
    title: 'Executive Analytics & Pipeline Reporting',
    tagline: 'Turn raw CRM activities into clear strategic decisions',
    description: 'Track revenue, average deal size, sales cycle velocity, rep quota attainment, and lead source ROI through interactive tabular and graphic dashboards.',
    highlights: [
      'Interactive date range toggling (Today, 7D, 30D, 90D, Custom)',
      'Lead source attribution identifying top revenue generating channels',
      'Team leaderboards tracking outbound dials, meetings booked, and closed ARR',
      'Exportable CSV and scheduled PDF digests for board meetings'
    ],
    useCase: 'VP of Sales tracks monthly revenue targets, identifying early that a specific marketing channel produces 40% higher close rates.',
    ctaText: 'Explore Reporting'
  },
  {
    id: 'multi-workspace',
    category: 'Platform',
    title: 'Multi-Tenant Workspaces & RBAC',
    tagline: 'Secure data isolation for distributed organizations and agencies',
    description: 'Maintain strict operational segregation between subsidiaries, departments, or client accounts while granting executive oversight through hierarchical roles and permissions.',
    highlights: [
      'Isolated workspaces with dedicated pipelines, custom fields, and data stores',
      'Granular Role-Based Access Control (Admin, Manager, Rep, Support, Viewer)',
      'Cross-workspace switching for holding companies and agency partners',
      'Comprehensive security audit trails tracking every export and edit'
    ],
    useCase: 'An agency operates 12 distinct client CRM workspaces from a single master login without risking cross-client data leakage.',
    ctaText: 'See Architecture'
  }
];
