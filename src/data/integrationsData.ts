export interface IntegrationDetail {
  id: string;
  name: string;
  category: 'Communication' | 'Telephony' | 'Sales' | 'Productivity' | 'Developer' | 'Automation';
  tagline: string;
  description: string;
  status: 'Available' | 'Connect' | 'Coming Soon' | 'Enterprise';
  iconColor: string;
  badge?: string;
  docsUrl?: string;
}

export const INTEGRATIONS_DATA: IntegrationDetail[] = [
  {
    id: 'gmail',
    name: 'Gmail & Google Workspace',
    category: 'Communication',
    tagline: '2-way email sync, calendar booking & contact ingestion',
    description: 'Sync customer email threads automatically to contact timelines. Send trackable 1-on-1 emails directly from WordbitX with open and click tracking.',
    status: 'Available',
    iconColor: 'bg-red-500/10 text-red-600 dark:text-red-400'
  },
  {
    id: 'outlook',
    name: 'Microsoft Outlook & 365',
    category: 'Communication',
    tagline: 'Enterprise Exchange synchronization and calendar scheduling',
    description: 'Connect enterprise Microsoft accounts. Keep meetings, customer correspondences, and follow-up tasks harmonized without leaving Outlook.',
    status: 'Available',
    iconColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business API',
    category: 'Communication',
    tagline: 'Conversational sales, automated alerts & customer support',
    description: 'Chat with prospects on the world’s most popular messaging app. Receive incoming inquiries, trigger automated template updates, and log chats to deals.',
    status: 'Connect',
    iconColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    badge: 'Popular'
  },
  {
    id: 'twilio',
    name: 'Twilio Voice & SMS',
    category: 'Telephony',
    tagline: 'Cloud telephony, SMS notifications & automated dialer',
    description: 'Provision virtual phone numbers across 100+ countries. Enable browser-based calling, automatic call recording, and SMS follow-ups on stage changes.',
    status: 'Available',
    iconColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
  },
  {
    id: 'vonage',
    name: 'Vonage Communications API',
    category: 'Telephony',
    tagline: 'Global SIP trunking and multi-channel call center routing',
    description: 'Route inbound customer calls to distributed call center agents with advanced interactive voice response (IVR) and real-time agent screen-pops.',
    status: 'Connect',
    iconColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
  },
  {
    id: 'sip-pbx',
    name: 'Custom SIP & On-Premises PBX',
    category: 'Telephony',
    tagline: 'Standard SIP credentials bridge to connect existing telecom hardware',
    description: 'Bring your existing corporate PBX (Asterisk, FreePBX, Cisco, Avaya) into WordbitX without replacing your carrier or on-premises phone systems.',
    status: 'Enterprise',
    iconColor: 'bg-slate-500/10 text-slate-600 dark:text-slate-400'
  },
  {
    id: 'smtp-imap',
    name: 'Custom SMTP & IMAP Relay',
    category: 'Communication',
    tagline: 'Private mail server configuration with custom domain signatures',
    description: 'Connect any standard mail server with DKIM/SPF support. Ensure high inbox deliverability using your existing company email server infrastructure.',
    status: 'Available',
    iconColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
  },
  {
    id: 'webhooks',
    name: 'Outbound & Inbound Webhooks',
    category: 'Developer',
    tagline: 'Real-time JSON event dispatch and HTTP ingest endpoints',
    description: 'Subscribe to deal stage changes, new lead submissions, and resolved tickets. Ingest leads instantly from custom web forms with HMAC secret signing.',
    status: 'Available',
    iconColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
  },
  {
    id: 'rest-api',
    name: 'WordbitX REST API v1',
    category: 'Developer',
    tagline: 'Comprehensive programmatic CRUD access with scoped API tokens',
    description: 'Build bespoke internal integrations, sync data with legacy ERP systems, or trigger pipeline automations programmatically via high-performance REST endpoints.',
    status: 'Available',
    iconColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar & Meet',
    category: 'Productivity',
    tagline: 'Automated meeting scheduling with buffer times and reminders',
    description: 'Embed personal booking links in emails. Meetings sync to CRM activity feeds with automated Google Meet video links generated on the fly.',
    status: 'Available',
    iconColor: 'bg-teal-500/10 text-teal-700 dark:text-teal-300'
  },
  {
    id: 'stripe',
    name: 'Stripe Billing & Invoicing',
    category: 'Sales',
    tagline: 'View customer MRR, payment statuses, and invoice links in CRM',
    description: 'Give sales and customer support reps real-time visibility into active subscriptions, overdue invoices, and customer lifetime value right next to deals.',
    status: 'Connect',
    iconColor: 'bg-emerald-600/10 text-emerald-800 dark:text-emerald-300'
  },
  {
    id: 'slack',
    name: 'Slack Deal Rooms & Alerts',
    category: 'Productivity',
    tagline: 'Instant notifications when high-value deals close or tickets escalate',
    description: 'Stream winning deal notifications into your team channels. Allow sales reps to update lead statuses directly using simple Slack slash commands.',
    status: 'Coming Soon',
    iconColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400'
  }
];
