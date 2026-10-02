export type PageRoute =
  | '/'
  | '/features'
  | '/solutions'
  | '/integrations'
  | '/pricing'
  | '/resources'
  | '/about'
  | '/contact'
  | '/demo'
  | '/login'
  | '/signup';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  score: number;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Nurturing';
  owner: string;
  ownerAvatar?: string;
  lastActivity: string;
  nextFollowUp: string;
  value: number;
  tags: string[];
  notes?: string[];
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  contact: string;
  value: number;
  stage: 'new_lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  owner: string;
  priority: 'low' | 'medium' | 'high';
  expectedClose: string;
  probability: number;
  tags: string[];
}

export interface Ticket {
  id: string;
  title: string;
  customer: string;
  company: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Pending Customer' | 'Resolved';
  assignedAgent: string;
  slaRemaining: string;
  category: string;
  lastUpdated: string;
}

export interface CallCenterAgent {
  id: string;
  name: string;
  role: string;
  status: 'Online' | 'In Call' | 'Break' | 'Offline';
  callsToday: number;
  resolvedToday: number;
  avgDuration: string;
  csat: string;
  activeCustomer?: string;
}

export interface Integration {
  id: string;
  name: string;
  category: 'Communication' | 'Telephony' | 'Sales' | 'Productivity' | 'Developer' | 'Automation';
  description: string;
  status: 'Available' | 'Connect' | 'Coming Soon' | 'Enterprise';
  icon: string;
  badge?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  popular?: boolean;
  features: string[];
  limitations?: string[];
  cta: string;
}
