export interface SolutionItem {
  id: string;
  category: 'role' | 'industry';
  title: string;
  badge: string;
  tagline: string;
  description: string;
  keyBenefits: string[];
  workflowSteps: { title: string; desc: string }[];
  metrics: { label: string; value: string }[];
}

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'sales-teams',
    category: 'role',
    title: 'For Modern Sales Teams',
    badge: 'Sales Velocity',
    tagline: 'Close larger deals faster with disciplined pipeline management',
    description: 'Equip Account Executives and SDRs with a single workspace where leads are enriched, follow-ups are automatically scheduled, and pipeline stages clearly indicate next steps.',
    keyBenefits: [
      'Zero manual data logging with automatic email and call tracking',
      'Dynamic deal weighting to forecast monthly targets accurately',
      'One-click proposal generation and follow-up templates'
    ],
    workflowSteps: [
      { title: 'Inbound Ingestion', desc: 'Leads qualify instantly via scoring rules' },
      { title: 'Discovery & Stage Move', desc: 'Discovery call notes sync to CRM automatically' },
      { title: 'Proposal & Win', desc: 'Automated notification to legal and finance upon contract won' }
    ],
    metrics: [
      { label: 'Follow-up Latency', value: '< 12 mins' },
      { label: 'Pipeline Visibility', value: '100%' }
    ]
  },
  {
    id: 'call-centers',
    category: 'role',
    title: 'For High-Volume Call Centers',
    badge: 'Telephony Operations',
    tagline: 'Deliver personal service at enterprise scale with live caller intelligence',
    description: 'Empower agents with instant caller history, active tickets, and recent deals before they even say hello. Monitor queue health and agent capacity in real time.',
    keyBenefits: [
      'Screen-pop caller profile instantly upon ring detection',
      'Live queue metrics: wait time, abandon rate, and agent availability',
      'Compatible with existing SIP trunks, Twilio, and Vonage infrastructure'
    ],
    workflowSteps: [
      { title: 'Queue Routing', desc: 'Call matched to account owner or best tier agent' },
      { title: 'Live Context', desc: 'Agent reads purchase history while call connects' },
      { title: 'Disposition & Wrap', desc: 'One-click call outcome tags task for follow-up' }
    ],
    metrics: [
      { label: 'Avg Hold Time', value: '-38%' },
      { label: 'First Call Resolution', value: '84%' }
    ]
  },
  {
    id: 'customer-support',
    category: 'role',
    title: 'For Customer Success & Support',
    badge: 'Support Desk',
    tagline: 'Turn support interactions into expansion and retention drivers',
    description: 'Break down data silos between account managers and customer support. Resolve complex tickets with full commercial awareness and transparent SLA countdowns.',
    keyBenefits: [
      'Unified view of customer plan tier, active renewals, and open tickets',
      'Escalation rules that notify the assigned Account Executive on urgent issues',
      'Canned macros, internal notes, and integrated satisfaction tracking'
    ],
    workflowSteps: [
      { title: 'Ticket Triage', desc: 'Auto-categorization and priority routing based on SLA' },
      { title: 'Contextual Resolution', desc: 'Solve bugs with engineering notes attached' },
      { title: 'Expansion Signal', desc: 'Alert sales rep if ticket indicates need for extra seats' }
    ],
    metrics: [
      { label: 'SLA Compliance', value: '99.2%' },
      { label: 'Resolution Speed', value: '2.4x' }
    ]
  },
  {
    id: 'agencies',
    category: 'industry',
    title: 'For Marketing & Digital Agencies',
    badge: 'Agency Workspaces',
    tagline: 'Manage multiple client pipelines and retainers with workspace isolation',
    description: 'Eliminate confusing spreadsheets and cross-client leakage. Create clean segregated environments for each client account with custom access controls.',
    keyBenefits: [
      'Multi-workspace architecture with instantaneous switching',
      'Client guest view permissions for transparent reporting',
      'Retainer and project milestones tracked alongside revenue'
    ],
    workflowSteps: [
      { title: 'Pitch & Scope', desc: 'Track proposals and signed statements of work' },
      { title: 'Client Onboarding', desc: 'Kick off workspace automations upon deal signature' },
      { title: 'Retainer Renewal', desc: 'Automated 60-day renewal alerts and check-ins' }
    ],
    metrics: [
      { label: 'Client Onboarding', value: 'Under 1 day' },
      { label: 'Cross-Account Safety', value: 'Zero leakage' }
    ]
  },
  {
    id: 'real-estate',
    category: 'industry',
    title: 'For Real Estate & Property Brokerages',
    badge: 'Property CRM',
    tagline: 'Match high-intent property seekers to inventory seamlessly',
    description: 'Keep track of buyers, property viewings, commission milestones, and mortgage pre-approvals without losing track of crucial follow-up dates.',
    keyBenefits: [
      'Custom property preference tags and budget range filters',
      'Automated WhatsApp/SMS reminders for scheduled site viewings',
      'Multi-agent split commission tracking and closing documentation'
    ],
    workflowSteps: [
      { title: 'Inquiry Capture', desc: 'Portal leads populate with location and budget desires' },
      { title: 'Viewing Schedule', desc: 'Calendar synced booking with auto-directions' },
      { title: 'Closing Escrow', desc: 'Milestone tracking through deed registration' }
    ],
    metrics: [
      { label: 'Viewing Show-up Rate', value: '91%' },
      { label: 'Closing Time', value: '-14 Days' }
    ]
  },
  {
    id: 'enterprise',
    category: 'industry',
    title: 'For Scaled Enterprise Operations',
    badge: 'Enterprise Architecture',
    tagline: 'Governance, custom role permissions, and scalable API architecture',
    description: 'Meet enterprise security and compliance standards with centralized administrator controls, granular role matrices, dedicated audit logs, and REST/Webhook integrations.',
    keyBenefits: [
      'Hierarchical permissions down to field-level edit restrictions',
      'Comprehensive security audit trails with exportable activity logs',
      'Dedicated integration engineering and custom SLA commitments'
    ],
    workflowSteps: [
      { title: 'Single Sign-On', desc: 'Centralized directory syncing and automated provisioning' },
      { title: 'Department Policy', desc: 'Enforce workflow gates before deal stage progression' },
      { title: 'Global Reporting', desc: 'Cross-subsidiary rollup dashboards for board review' }
    ],
    metrics: [
      { label: 'Audit Readiness', value: 'Immediate' },
      { label: 'API Throughput', value: 'High' }
    ]
  }
];
