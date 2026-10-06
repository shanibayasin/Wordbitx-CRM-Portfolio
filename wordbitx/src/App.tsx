'use client';

import React, { useEffect, useState, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '../components/layout/Sidebar.tsx';
import { Topbar } from '../components/layout/Topbar.tsx';
import { MobileNav } from '../components/layout/MobileNav.tsx';
import { Toaster, toast } from '../components/ui/Sonner.tsx';
import { StatsCard } from '../components/dashboard/StatsCard.tsx';
import { RevenueChart } from '../components/dashboard/RevenueChart.tsx';
import { PipelineChart } from '../components/dashboard/PipelineChart.tsx';
import { DemoRequestsPanel } from '../components/dashboard/DemoRequestsPanel.tsx';
import { LeadTable } from '../components/leads/LeadTable.tsx';
import { LeadForm } from '../components/leads/LeadForm.tsx';
import { SalesPipeline } from '../components/pipeline/SalesPipeline.tsx';
import { DealDetails } from '../components/pipeline/DealDetails.tsx';
import { OrderWorkspace } from '../components/orders/OrderWorkspace.tsx';
import { CustomerTable } from '../components/customers/CustomerTable.tsx';
import { CustomerForm } from '../components/customers/CustomerForm.tsx';
import { CustomerDetails } from '../components/customers/CustomerDetails.tsx';
import { TicketTable } from '../components/tickets/TicketTable.tsx';
import { TicketForm } from '../components/tickets/TicketForm.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Input } from '../components/ui/Input.tsx';
import { Select } from '../components/ui/Select.tsx';
import { Badge } from '../components/ui/Badge.tsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/Dialog.tsx';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table.tsx';
import {
  Users,
  DollarSign,
  CheckSquare,
  Building2,
  PhoneCall,
  Percent,
  Activity as ActivityIcon,
  Kanban,
  Building,
  UserCheck,
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Mail,
  Phone,
  ArrowLeft,
  ExternalLink,
  Shield,
  Clock,
  UserPlus,
  TrendingUp,
  Award,
  Target,
  Sparkles,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { createId, formatCurrency, formatDate } from '../lib/utils.ts';
import { getDashboardStats } from '../lib/services/dashboardService.ts';
import { createLead as createWorkspaceLead, deleteLead as deleteWorkspaceLead, getLeadAssignees, getLeads, updateLead } from '../lib/services/leadsService.ts';
import { createWorkspaceDeal, deleteWorkspaceDeal, getPipelineWorkspace, type PipelineWorkspace, updateWorkspaceDeal, updateWorkspaceDeals } from '../lib/services/pipelineService.ts';
import { useLocalStorageState } from '../lib/useLocalStorageState.ts';
import type { CustomerFormValues } from '../lib/validations/customerSchema.ts';
import type { DealFormValues } from '../lib/validations/dealSchema.ts';
import type { LeadFormValues } from '../lib/validations/leadSchema.ts';
import type { TicketFormValues } from '../lib/validations/ticketSchema.ts';
import {
  User,
  Organization,
  Lead,
  Deal,
  DealActivity,
  Customer,
  Ticket,
  Task,
  DealStage,
  Order,
  Role,
  DashboardStats,
} from '../types/index.ts';

// Initial Multi-Tenant Seed Data
const SEED_ORGS: Organization[] = [
  { id: 'org_acme', name: 'Acme Technologies Inc.', createdAt: new Date() },
  { id: 'org_apex', name: 'Apex Global Software', createdAt: new Date() },
];

const SEED_USERS: User[] = [
  { id: 'usr_1', name: 'Sarah Jenkins', email: 'sarah.jenkins@acme.io', role: 'ADMIN', organizationId: 'org_acme', createdAt: new Date() },
  { id: 'usr_2', name: 'Marcus Wright', email: 'marcus.wright@acme.io', role: 'SALES', organizationId: 'org_acme', createdAt: new Date() },
  { id: 'usr_3', name: 'Elena Rostova', email: 'elena.rostova@acme.io', role: 'SALES', organizationId: 'org_acme', createdAt: new Date() },
  { id: 'usr_4', name: 'Devon Vance', email: 'devon.vance@acme.io', role: 'SUPPORT', organizationId: 'org_acme', createdAt: new Date() },
  { id: 'usr_5', name: 'Claire Zhao', email: 'claire.zhao@acme.io', role: 'AGENT', organizationId: 'org_acme', createdAt: new Date() },
];

const SEED_LEADS: Lead[] = [
  { id: 'lead_1', name: 'Alex Morgan', email: 'alex.morgan@fintechcorp.com', phone: '+1 (555) 234-8901', source: 'LinkedIn InMail', score: 85, status: 'QUALIFIED', organizationId: 'org_acme', assignedToId: 'usr_2', createdAt: new Date(Date.now() - 86400000 * 2), updatedAt: new Date() },
  { id: 'lead_2', name: 'Samantha Vance', email: 'svance@aerodynamics.io', phone: '+1 (555) 891-2304', source: 'Website Form', score: 62, status: 'NEW', organizationId: 'org_acme', assignedToId: 'usr_3', createdAt: new Date(Date.now() - 86400000 * 4), updatedAt: new Date() },
  { id: 'lead_3', name: 'Liam Chen', email: 'lchen@biolabs.tech', phone: '+1 (555) 432-1920', source: 'Industry Conference', score: 92, status: 'FOLLOW_UP', organizationId: 'org_acme', assignedToId: 'usr_2', createdAt: new Date(Date.now() - 86400000 * 6), updatedAt: new Date() },
  { id: 'lead_4', name: 'Chloe Dubois', email: 'cdubois@parisconsult.eu', phone: '+33 1 42 68 55 00', source: 'Client Referral', score: 74, status: 'QUALIFIED', organizationId: 'org_acme', assignedToId: 'usr_1', createdAt: new Date(Date.now() - 86400000 * 9), updatedAt: new Date() },
  { id: 'lead_5', name: 'David Miller', email: 'david@constructo.com', phone: '+1 (555) 321-7788', source: 'Cold Outbound', score: 35, status: 'LOST', organizationId: 'org_acme', assignedToId: 'usr_3', createdAt: new Date(Date.now() - 86400000 * 15), updatedAt: new Date() },
];

const SEED_CUSTOMERS: Customer[] = [
  { id: 'cust_1', name: 'Jordan Lee', company: 'Apex Global Solutions', email: 'jordan@apex.io', phone: '+1 (555) 901-2244', organizationId: 'org_acme', createdAt: new Date(Date.now() - 86400000 * 60) },
  { id: 'cust_2', name: 'Maya Patel', company: 'CloudScale Networks', email: 'maya@cloudscale.net', phone: '+1 (555) 882-3901', organizationId: 'org_acme', createdAt: new Date(Date.now() - 86400000 * 90) },
  { id: 'cust_3', name: 'Derek Thorne', company: 'Fintech Hub Corp', email: 'derek@fintechhub.com', phone: '+1 (555) 334-1100', organizationId: 'org_acme', createdAt: new Date(Date.now() - 86400000 * 40) },
  { id: 'cust_4', name: 'Sophia Sterling', company: 'Global Logistics Corp', email: 'sophia@globallogistics.com', phone: '+1 (555) 777-9911', organizationId: 'org_acme', createdAt: new Date(Date.now() - 86400000 * 120) },
];

const SEED_DEALS: Deal[] = [
  { id: 'deal_1', title: 'Apex AI Platform Annual License', value: 85000, stage: 'NEGOTIATION', probability: 75, organizationId: 'org_acme', customerId: 'cust_1', assignedToId: 'usr_1', createdAt: new Date(Date.now() - 86400000 * 5), updatedAt: new Date() },
  { id: 'deal_2', title: 'Global Fintech Infrastructure Expansion', value: 120000, stage: 'PROPOSAL', probability: 60, organizationId: 'org_acme', customerId: 'cust_3', assignedToId: 'usr_2', createdAt: new Date(Date.now() - 86400000 * 8), updatedAt: new Date() },
  { id: 'deal_3', title: 'Cloud Data Migration & Security Suite', value: 45000, stage: 'WON', probability: 100, organizationId: 'org_acme', customerId: 'cust_2', assignedToId: 'usr_3', createdAt: new Date(Date.now() - 86400000 * 12), updatedAt: new Date() },
  { id: 'deal_4', title: 'Kubernetes Observability Enterprise Tier', value: 38000, stage: 'QUALIFIED', probability: 40, organizationId: 'org_acme', customerId: 'cust_2', assignedToId: 'usr_2', createdAt: new Date(Date.now() - 86400000 * 2), updatedAt: new Date() },
  { id: 'deal_5', title: 'Legacy Monolith Modernization Pilot', value: 25000, stage: 'LOST', probability: 0, organizationId: 'org_acme', customerId: 'cust_1', assignedToId: 'usr_3', createdAt: new Date(Date.now() - 86400000 * 20), updatedAt: new Date() },
];

const SEED_TICKETS: Ticket[] = [
  { id: 't_1', subject: 'SSO SAML authentication intermittent failure', description: 'After IdP certificate rotation, approximately 5% of enterprise SSO logins fail with signature invalid.', status: 'OPEN', priority: 'URGENT', organizationId: 'org_acme', customerId: 'cust_1', assignedToId: 'usr_4', createdAt: new Date(Date.now() - 86400000 * 1), updatedAt: new Date() },
  { id: 't_2', subject: 'Webhook payload rate limit increase request', description: 'Client requested raising API burst limits from 500 req/min to 2,000 req/min during peak seasonal traffic.', status: 'IN_PROGRESS', priority: 'HIGH', organizationId: 'org_acme', customerId: 'cust_2', assignedToId: 'usr_4', createdAt: new Date(Date.now() - 86400000 * 2), updatedAt: new Date() },
  { id: 't_3', subject: 'Billing cycle prorated invoice discrepancy', description: 'Inquiry regarding additional seat cost added mid-month on invoice #INV-9281.', status: 'RESOLVED', priority: 'MEDIUM', organizationId: 'org_acme', customerId: 'cust_3', assignedToId: 'usr_1', createdAt: new Date(Date.now() - 86400000 * 5), updatedAt: new Date() },
  { id: 't_4', subject: 'CSV Export encoding issue on UTF-8 special characters', description: 'Accented characters exported into Excel spreadsheet have encoding garble.', status: 'WAITING', priority: 'LOW', organizationId: 'org_acme', customerId: 'cust_1', assignedToId: 'usr_4', createdAt: new Date(Date.now() - 86400000 * 7), updatedAt: new Date() },
];

const SEED_TASKS: Task[] = [
  { id: 'task_1', title: 'Schedule Q4 contract renewal discussion with Jordan (Apex Global)', dueDate: new Date(Date.now() + 86400000 * 2), completed: false, organizationId: 'org_acme', assignedToId: 'usr_1', createdAt: new Date() },
  { id: 'task_2', title: 'Send updated MSA pricing proposal to Maya at CloudScale Networks', dueDate: new Date(Date.now() + 86400000 * 1), completed: false, organizationId: 'org_acme', assignedToId: 'usr_2', createdAt: new Date() },
  { id: 'task_3', title: 'Review IdP certificate configuration with DevOps security team', dueDate: new Date(), completed: true, organizationId: 'org_acme', assignedToId: 'usr_4', createdAt: new Date() },
  { id: 'task_4', title: 'Compile monthly revenue cohort analytics for executive board', dueDate: new Date(Date.now() + 86400000 * 4), completed: false, organizationId: 'org_acme', assignedToId: 'usr_1', createdAt: new Date() },
];

type CreateDealInput = Pick<DealFormValues, 'title' | 'value' | 'stage' | 'probability'>
  & Partial<Omit<DealFormValues, 'title' | 'value' | 'stage' | 'probability'>>;

export default function App({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  if (children !== undefined && /^\/(?:dashboard\/)?leads(?:\/[^/]+)?$/.test(pathname)) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  return <LegacyPreviewApp navigationBase={children === undefined ? '/dashboard' : ''} />;
}

function LegacyPreviewApp({ navigationBase }: { navigationBase: '' | '/dashboard' }) {
  const pathname = usePathname();
  const router = useRouter();
  const crmPath = pathname.replace(/^\/dashboard(?=\/|$)/, '') || '/dashboard';
  const activeView = crmPath.match(/^\/(leads|deals|customers|orders|tickets)\/[^/]+$/)
    ? crmPath.startsWith('/leads/') ? '/leads/detail'
      : crmPath.startsWith('/deals/') ? '/deals/detail'
        : crmPath.startsWith('/customers/') ? '/customers/detail'
          : crmPath.startsWith('/orders/') ? '/orders/detail'
            : '/tickets/detail'
    : crmPath;
  const routeParam = activeView.endsWith('/detail') ? crmPath.split('/').pop() || null : null;
  const isLeadsView = activeView === '/leads' || activeView === '/leads/detail';
  const isPipelineView = activeView === '/pipeline' || activeView === '/deals/detail';
  const isWorkspaceDataView = activeView === '/dashboard' || activeView === '/reports' || isLeadsView || isPipelineView;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [dashboardStatus, setDashboardStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [dashboardError, setDashboardError] = useState('');
  const [dashboardReloadKey, setDashboardReloadKey] = useState(0);
  const [workspaceLeads, setWorkspaceLeads] = useState<Lead[] | null>(null);
  const [leadAssignees, setLeadAssignees] = useState<User[]>([]);
  const [leadsStatus, setLeadsStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [leadsError, setLeadsError] = useState('');
  const [leadsReloadKey, setLeadsReloadKey] = useState(0);
  const [pipelineWorkspace, setPipelineWorkspace] = useState<PipelineWorkspace | null>(null);
  const [pipelineStatus, setPipelineStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [pipelineError, setPipelineError] = useState('');
  const [pipelineReloadKey, setPipelineReloadKey] = useState(0);

  useEffect(() => {
    if (!isWorkspaceDataView) return;

    const controller = new AbortController();
    void getDashboardStats(controller.signal)
      .then((stats) => {
        setDashboardStats(stats);
        setDashboardStatus('ready');
        setDashboardError('');
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        const message = error instanceof Error ? error.message : 'Unable to load dashboard metrics.';
        setDashboardError(message);
        setDashboardStatus('error');
      });

    return () => controller.abort();
  }, [activeView, dashboardReloadKey, isWorkspaceDataView]);

  useEffect(() => {
    if (!isLeadsView) return;

    const controller = new AbortController();
    void Promise.resolve()
      .then(() => {
        if (controller.signal.aborted) return null;
        setLeadsStatus('loading');
        return Promise.all([getLeads(controller.signal), getLeadAssignees(controller.signal)]);
      })
      .then((workspaceData) => {
        if (!workspaceData) return;
        const [loadedLeads, loadedAssignees] = workspaceData;
        setWorkspaceLeads(loadedLeads);
        setLeadAssignees(loadedAssignees);
        setLeadsStatus('ready');
        setLeadsError('');
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        const message = error instanceof Error ? error.message : 'Unable to load workspace leads.';
        setWorkspaceLeads([]);
        setLeadAssignees([]);
        setLeadsError(message);
        setLeadsStatus('error');
      });

    return () => controller.abort();
  }, [activeView, isLeadsView, leadsReloadKey]);

  useEffect(() => {
    if (!isPipelineView) return;

    const controller = new AbortController();
    setPipelineStatus('loading');
    void getPipelineWorkspace(controller.signal)
      .then((workspace) => {
        setPipelineWorkspace(workspace);
        setPipelineStatus('ready');
        setPipelineError('');
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setPipelineWorkspace(null);
        setPipelineError(error instanceof Error ? error.message : 'Unable to load pipeline workspace.');
        setPipelineStatus('error');
      });

    return () => controller.abort();
  }, [activeView, isPipelineView, pipelineReloadKey]);

  // Multi-Tenancy State
  const [organizations] = useState<Organization[]>(SEED_ORGS);
  const [currentOrgId, setCurrentOrgId] = useState('org_acme');

  // Core Data Collections (Scoping by Organization)
  const [users, setUsers] = useState<User[]>(SEED_USERS);
  const [leads, setLeads] = useState<Lead[]>(SEED_LEADS);
  const [deals, setDeals] = useLocalStorageState('wordbitx:deals', SEED_DEALS);
  const [customers, setCustomers] = useLocalStorageState('wordbitx:customers', SEED_CUSTOMERS);
  const [tickets, setTickets] = useState<Ticket[]>(SEED_TICKETS);
  const [tasks, setTasks] = useState<Task[]>(SEED_TASKS);
  const [orders, setOrders] = useLocalStorageState<Order[]>('wordbitx:orders', []);

  // Modals State
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketCustomerId, setTicketCustomerId] = useState('');

  const [isInviteTeamOpen, setIsInviteTeamOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('SALES');

  // New task input state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  // Authentication State
  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0];
  const currentUser: User = users.find((u) => u.organizationId === currentOrgId) || users[0];

  // Filter scoped data by current logged-in organization
  const scopedLeads = leads.filter((l) => l.organizationId === currentOrgId);
  const displayedLeads = isLeadsView ? workspaceLeads ?? [] : scopedLeads;
  const scopedDeals = deals.filter((d) => d.organizationId === currentOrgId);
  const scopedCustomers = customers.filter((c) => c.organizationId === currentOrgId);
  const scopedTickets = tickets.filter((t) => t.organizationId === currentOrgId);
  const scopedTasks = tasks.filter((t) => t.organizationId === currentOrgId);
  const scopedOrders = orders.filter((order) => order.organizationId === currentOrgId);
  const scopedUsers = users.filter((u) => u.organizationId === currentOrgId);
  const pipelineDeals = pipelineWorkspace?.deals ?? [];
  const pipelineCustomers = pipelineWorkspace?.customers ?? [];
  const pipelineUsers = pipelineWorkspace?.users ?? [];
  const displayedDeals = isPipelineView ? pipelineDeals : scopedDeals;
  const displayedCustomers = isPipelineView ? pipelineCustomers : scopedCustomers;
  const displayedUsers = isPipelineView ? pipelineUsers : scopedUsers;
  const pipelineCurrentUser = pipelineUsers.find((user) => user.id === pipelineWorkspace?.currentUserId) || currentUser;

  // Navigate helper
  const navigate = (path: string, param?: string) => {
    const crmRelativePath = path.endsWith('/detail') && param
      ? `${path.slice(0, -'/detail'.length)}/${encodeURIComponent(param)}`
      : path;
    const targetPath = crmRelativePath === '/dashboard'
      ? '/dashboard'
      : crmRelativePath.startsWith('/dashboard/')
        ? `${navigationBase}${crmRelativePath.slice('/dashboard'.length)}`
        : `${navigationBase}${crmRelativePath === '/' ? '' : crmRelativePath}` || '/dashboard';
    router.push(targetPath);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch organization helper
  const handleSwitchOrg = (orgId: string) => {
    setCurrentOrgId(orgId);
    const org = organizations.find((o) => o.id === orgId);
    toast.info(`Switched tenant workspace to: ${org?.name || orgId}`);
  };

  // --- CRUD Handlers ---

  // Leads
  const handleSaveLead = async (data: LeadFormValues) => {
    if (selectedLead) {
      const updatedLead = isLeadsView
        ? await updateLead(selectedLead.id, data)
        : { ...selectedLead, ...data, updatedAt: new Date() };
      setLeads((prev) =>
        prev.map((l) =>
          l.id === selectedLead.id ? { ...l, ...updatedLead } : l
        )
      );
      if (isLeadsView) {
        setWorkspaceLeads((prev) => prev?.map((lead) => lead.id === updatedLead.id ? updatedLead : lead) ?? null);
      }
      toast.success('Lead updated successfully');
    } else {
      const newLead = isLeadsView
        ? await createWorkspaceLead(data)
        : {
          id: createId('lead'),
          ...data,
          email: data.email || null,
          phone: data.phone || null,
          source: data.source || null,
          assignedToId: data.assignedToId || null,
          organizationId: currentOrgId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      setLeads((prev) => [newLead, ...prev]);
      if (isLeadsView) {
        setWorkspaceLeads((prev) => [newLead, ...(prev ?? [])]);
      }
      toast.success('New lead captured into pipeline');
    }
    setIsLeadModalOpen(false);
  };

  const handleDeleteLead = async (id: string) => {
    if (isLeadsView) {
      try {
        await deleteWorkspaceLead(id);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Unable to delete this lead.');
        return;
      }
      setWorkspaceLeads((prev) => prev?.filter((lead) => lead.id !== id) ?? null);
    }
    setLeads((prev) => prev.filter((l) => l.id !== id));
    toast.success('Lead removed from repository');
  };

  // Deals
  const handleUpdateDealStage = async (dealId: string, newStage: DealStage, change?: { lossReason?: string; lossNotes?: string; customerId?: string | null }) => {
    if (isPipelineView) {
      const deal = pipelineDeals.find((item) => item.id === dealId);
      if (!deal || deal.stage === newStage) return;
      try {
        const updated = await updateWorkspaceDeal(dealId, { ...change, stage: newStage });
        setPipelineWorkspace((previous) => previous
          ? { ...previous, deals: previous.deals.map((item) => item.id === updated.id ? updated : item) }
          : previous);
        toast.success(`Deal moved to stage: ${newStage}`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Unable to update deal stage.');
      }
      return;
    }
    const changedAt = new Date();
    const deal = scopedDeals.find((item) => item.id === dealId);
    if (!deal || deal.stage === newStage) return;
    const stageHistory = {
      id: createId('stage'),
      fromStage: deal.stage,
      toStage: newStage,
      changedBy: currentUser.name,
      changedAt,
      timeInPreviousStageMs: Math.max(0, changedAt.getTime() - new Date(deal.stageEnteredAt || deal.updatedAt || deal.createdAt).getTime()),
      lossReason: change?.lossReason || null,
      lossNotes: change?.lossNotes || null,
    };
    const activity = {
      id: createId('activity'),
      type: newStage === 'WON' ? 'WON' as const : newStage === 'LOST' ? 'LOST' as const : 'STAGE_CHANGED' as const,
      description: newStage === 'LOST'
        ? `Deal marked lost: ${change?.lossReason || 'Reason not provided'}`
        : newStage === 'WON' ? 'Deal marked won' : `Stage changed from ${deal.stage} to ${newStage}`,
      user: currentUser.name,
      relatedEntity: 'Stage',
      createdAt: changedAt,
    };
    setDeals((prev) => prev.map((item) => item.id === dealId ? {
      ...item,
      ...change,
      stage: newStage,
      status: newStage === 'WON' ? 'WON' : newStage === 'LOST' ? 'LOST' : 'OPEN',
      probability: newStage === 'WON' ? 100 : newStage === 'LOST' ? 0 : item.probability,
      stageEnteredAt: changedAt,
      stageHistory: [...(item.stageHistory || []), stageHistory],
      activities: [activity, ...(item.activities || [])],
      updatedAt: changedAt,
      lastActivityAt: changedAt,
    } : item));
    toast.success(`Deal moved to stage: ${newStage}`);
  };

  const handleCreateDeal = async (data: CreateDealInput) => {
    if (isPipelineView) {
      try {
        const newDeal = await createWorkspaceDeal(data);
        setPipelineWorkspace((previous) => previous
          ? { ...previous, deals: [newDeal, ...previous.deals] }
          : previous);
        toast.success('Opportunity created in pipeline');
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unable to create deal.');
      }
      return;
    }
    const createdAt = new Date();
    const newDeal: Deal = {
      id: createId('deal'),
      ...data,
      assignedToId: data.assignedToId ?? null,
      customerId: data.customerId ?? null,
      company: data.company || scopedCustomers.find((customer) => customer.id === data.customerId)?.company || null,
      organizationId: currentOrgId,
      createdAt,
      updatedAt: createdAt,
      stageEnteredAt: createdAt,
      lastActivityAt: createdAt,
      status: data.stage === 'WON' ? 'WON' : data.stage === 'LOST' ? 'LOST' : 'OPEN',
      stageHistory: [{ id: createId('stage'), fromStage: null, toStage: data.stage, changedBy: currentUser.name, changedAt: createdAt, timeInPreviousStageMs: 0 }],
      activities: [{ id: createId('activity'), type: 'CREATED', description: 'Deal created', user: currentUser.name, relatedEntity: 'Deal', createdAt }],
    };
    setDeals((prev) => [newDeal, ...prev]);
    toast.success('Opportunity created in pipeline');
  };

  const handleSaveDeal = async (dealId: string, data: DealFormValues) => {
    if (isPipelineView) {
      try {
        const updated = await updateWorkspaceDeal(dealId, data);
        setPipelineWorkspace((previous) => previous
          ? { ...previous, deals: previous.deals.map((deal) => deal.id === updated.id ? updated : deal) }
          : previous);
        toast.success('Deal updated');
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unable to save deal.');
      }
      return;
    }
    const existing = scopedDeals.find((deal) => deal.id === dealId);
    if (!existing) return;
    const updatedAt = new Date();
    const events: Pick<DealActivity, 'type' | 'description'>[] = [];
    if (existing.value !== data.value) events.push({ type: 'VALUE_CHANGED' as const, description: `Deal value changed from ${formatCurrency(existing.value)} to ${formatCurrency(data.value)}` });
    if (existing.probability !== data.probability) events.push({ type: 'PROBABILITY_CHANGED' as const, description: `Probability changed from ${existing.probability}% to ${data.probability}%` });
    if (existing.customerId !== data.customerId) events.push({ type: 'CUSTOMER_CHANGED' as const, description: 'Deal customer updated' });
    if (existing.stage !== data.stage) events.push({ type: 'STAGE_CHANGED' as const, description: `Stage changed from ${existing.stage} to ${data.stage}` });
    if (!events.length) events.push({ type: 'UPDATED' as const, description: 'Deal details updated' });
    const activities = events.map((event) => ({ id: createId('activity'), ...event, user: currentUser.name, relatedEntity: event.type === 'CUSTOMER_CHANGED' ? 'Customer' : 'Deal', createdAt: updatedAt }));
    const stageHistory = existing.stage !== data.stage ? {
      id: createId('stage'),
      fromStage: existing.stage,
      toStage: data.stage,
      changedBy: currentUser.name,
      changedAt: updatedAt,
      timeInPreviousStageMs: Math.max(0, updatedAt.getTime() - new Date(existing.stageEnteredAt || existing.updatedAt || existing.createdAt).getTime()),
    } : null;
    setDeals((prev) => prev.map((deal) => deal.id === dealId ? {
      ...deal, ...data, id: deal.id, organizationId: deal.organizationId, createdAt: deal.createdAt,
      company: data.company || scopedCustomers.find((customer) => customer.id === data.customerId)?.company || null,
      status: data.stage === 'WON' ? 'WON' : data.stage === 'LOST' ? 'LOST' : 'OPEN',
      stageEnteredAt: stageHistory ? updatedAt : deal.stageEnteredAt,
      stageHistory: stageHistory ? [...(deal.stageHistory || []), stageHistory] : deal.stageHistory || [],
      activities: [...activities, ...(deal.activities || [])],
      updatedAt, lastActivityAt: updatedAt,
    } : deal));
    toast.success('Deal updated');
  };

  const handleBulkUpdateDeals = async (ids: string[], updates: Partial<Deal>) => {
    if (isPipelineView) {
      try {
        const updatedDeals = await updateWorkspaceDeals(ids, updates);
        const updatedById = new Map(updatedDeals.map((deal) => [deal.id, deal]));
        setPipelineWorkspace((previous) => previous
          ? { ...previous, deals: previous.deals.map((deal) => updatedById.get(deal.id) || deal) }
          : previous);
        toast.success(`Updated ${ids.length} deals`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Unable to update selected deals.');
        setPipelineReloadKey((key) => key + 1);
      }
      return;
    }
    const changedAt = new Date();
    setDeals((prev) => prev.map((deal) => {
      if (!ids.includes(deal.id)) return deal;
      const targetStage = updates.stage || (updates.status === 'OPEN' && (deal.stage === 'WON' || deal.stage === 'LOST') ? 'NEW' : deal.stage);
      const stageChanged = targetStage !== deal.stage;
      if (!stageChanged) return { ...deal, ...updates, updatedAt: changedAt };
      const history = { id: createId('stage'), fromStage: deal.stage, toStage: targetStage, changedBy: currentUser.name, changedAt, timeInPreviousStageMs: Math.max(0, changedAt.getTime() - new Date(deal.stageEnteredAt || deal.updatedAt || deal.createdAt).getTime()) };
      const activity = { id: createId('activity'), type: targetStage === 'WON' ? 'WON' as const : targetStage === 'LOST' ? 'LOST' as const : 'STAGE_CHANGED' as const, description: targetStage === 'LOST' ? `Deal marked lost: ${updates.lossReason || 'Reason not provided'}` : targetStage === 'WON' ? 'Deal marked won' : `Stage changed from ${deal.stage} to ${targetStage}`, user: currentUser.name, relatedEntity: 'Stage', createdAt: changedAt };
      return { ...deal, ...updates, stage: targetStage, status: updates.status || (targetStage === 'WON' ? 'WON' : targetStage === 'LOST' ? 'LOST' : 'OPEN'), probability: updates.probability ?? (targetStage === 'WON' ? 100 : targetStage === 'LOST' ? 0 : deal.probability), stageHistory: [...(deal.stageHistory || []), history], activities: [activity, ...(deal.activities || [])], stageEnteredAt: changedAt, updatedAt: changedAt, lastActivityAt: changedAt };
    }));
    toast.success(`Updated ${ids.length} deals`);
  };

  const handleDeleteDeals = async (ids: string[]) => {
    if (isPipelineView) {
      try {
        await Promise.all(ids.map((id) => deleteWorkspaceDeal(id)));
        setPipelineWorkspace((previous) => previous
          ? { ...previous, deals: previous.deals.filter((deal) => !ids.includes(deal.id)) }
          : previous);
        toast.success(`Deleted ${ids.length} deals`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Unable to delete selected deals.');
        setPipelineReloadKey((key) => key + 1);
      }
      return;
    }
    setDeals((prev) => prev.filter((deal) => !ids.includes(deal.id)));
    toast.success(`Deleted ${ids.length} deals`);
  };

  const handleCreateDealTask = (data: { title: string; assignedToId: string | null; priority: Task['priority']; dueDate: Date | null; notes: string; dealId: string }) => {
    const createdAt = new Date();
    const task: Task = { id: createId('task'), ...data, completed: false, organizationId: currentOrgId, createdAt };
    if (isPipelineView) {
      const deal = pipelineDeals.find((item) => item.id === data.dealId);
      if (!deal) {
        toast.error('Deal not found in the current workspace.');
        return;
      }
      void updateWorkspaceDeal(data.dealId, { tasks: [task, ...(deal.tasks || [])] })
        .then((updated) => {
          setPipelineWorkspace((previous) => previous
            ? { ...previous, deals: previous.deals.map((item) => item.id === updated.id ? updated : item) }
            : previous);
          setTasks((previous) => [task, ...previous]);
          toast.success('Deal task created');
        })
        .catch((error: unknown) => toast.error(error instanceof Error ? error.message : 'Unable to create deal task.'));
      return;
    }
    setTasks((prev) => [task, ...prev]);
    setDeals((prev) => prev.map((deal) => deal.id === data.dealId ? {
      ...deal,
      tasks: [task, ...(deal.tasks || [])],
      activities: [{ id: createId('activity'), type: 'TASK_CREATED', description: `Task created: ${data.title}`, user: currentUser.name, relatedEntity: data.title, createdAt }, ...(deal.activities || [])],
      updatedAt: createdAt,
      lastActivityAt: createdAt,
    } : deal));
    toast.success('Deal task created');
  };

  const handleCreateOrderFromDeal = async (deal: Deal) => {
    const createdAt = new Date();
    if (isPipelineView) {
      const existing = pipelineDeals.find((item) => item.id === deal.id);
      if (!existing || existing.orderHandoff) return;
      const handoff = {
        id: createId('order_draft'),
        customerId: deal.customerId || existing.customerId || '',
        amount: deal.value,
        currency: deal.currency || 'USD',
        status: 'DRAFT' as const,
        createdAt,
      };
      try {
        const updated = await updateWorkspaceDeal(deal.id, { orderHandoff: handoff, customerId: handoff.customerId });
        setPipelineWorkspace((previous) => previous
          ? { ...previous, deals: previous.deals.map((item) => item.id === updated.id ? updated : item) }
          : previous);
        toast.success(`Draft order handoff created from ${deal.title}`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Unable to create order handoff.');
      }
      return;
    }
    setDeals((prev) => prev.map((item) => {
      if (item.id !== deal.id || item.orderHandoff) return item;
      const handoff = {
        id: createId('order_draft'),
        customerId: deal.customerId || item.customerId || '',
        amount: deal.value,
        currency: deal.currency || 'USD',
        status: 'DRAFT' as const,
        createdAt,
      };
      const activity = { id: createId('activity'), type: 'UPDATED' as const, description: 'Draft order handoff created from won deal', user: currentUser.name, relatedEntity: 'Order Handoff', createdAt };
      return { ...item, stage: 'WON', status: 'WON', probability: 100, customerId: handoff.customerId || item.customerId, orderHandoff: handoff, activities: [activity, ...(item.activities || [])], updatedAt: createdAt, lastActivityAt: createdAt };
    }));
    toast.success(`Draft order handoff created from ${deal.title}`);
  };

  const handleUpdateDealDetails = async (id: string, updates: Partial<Deal>) => {
    if (isPipelineView) {
      try {
        const updated = await updateWorkspaceDeal(id, updates);
        setPipelineWorkspace((previous) => previous
          ? { ...previous, deals: previous.deals.map((deal) => deal.id === updated.id ? updated : deal) }
          : previous);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Unable to save deal changes.');
      }
      return;
    }
    setDeals((previous) => previous.map((item) => item.id === id
      ? { ...item, ...updates, id: item.id, createdAt: item.createdAt, updatedAt: new Date() }
      : item));
  };

  // Customers
  const handleSaveCustomer = async (data: CustomerFormValues) => {
    if (selectedCustomer) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === selectedCustomer.id ? { ...c, ...data, id: c.id, createdAt: c.createdAt, updatedAt: new Date(), lastActivityAt: new Date() } : c))
      );
      toast.success('Customer account updated');
    } else {
      const newCust: Customer = {
        id: createId('cust'),
        ...data,
        email: data.email || null,
        phone: data.phone || null,
        company: data.company || null,
        source: data.source || null,
        organizationId: currentOrgId,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActivityAt: new Date(),
      };
      setCustomers((prev) => [newCust, ...prev]);
      toast.success('New customer account created');
    }
    setIsCustomerModalOpen(false);
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    toast.success('Customer account deleted');
  };

  const handleBulkUpdateCustomers = (ids: string[], updates: Partial<Customer>) => {
    setCustomers((prev) => prev.map((customer) => ids.includes(customer.id)
      ? { ...customer, ...updates, updatedAt: new Date() }
      : customer));
    toast.success(`Updated ${ids.length} customer${ids.length === 1 ? '' : 's'}`);
  };

  const createDealForCustomer = (customer: Customer) => {
    const title = window.prompt('Deal name');
    if (!title?.trim()) return;
    const amount = Number(window.prompt('Deal value', '0'));
    if (!Number.isFinite(amount) || amount < 0) {
      toast.error('Enter a valid deal value');
      return;
    }
    handleCreateDeal({ title: title.trim(), value: amount, stage: 'QUALIFIED', probability: 25, customerId: customer.id, assignedToId: customer.assignedToId || currentUser.id });
  };

  const createTaskForCustomer = (customer: Customer, title: string) => {
    const task: Task = {
      id: createId('task'), title, dueDate: null, completed: false, organizationId: currentOrgId,
      assignedToId: currentUser.id, customerId: customer.id, createdAt: new Date(),
    };
    setTasks((prev) => [task, ...prev]);
    setCustomers((prev) => prev.map((item) => item.id === customer.id ? { ...item, updatedAt: new Date(), lastActivityAt: new Date() } : item));
    toast.success('Customer follow-up task created');
  };

  const handleCustomerQuickAction = (customer: Customer, action: 'note' | 'deal' | 'order' | 'task') => {
    if (action === 'deal') return createDealForCustomer(customer);
    if (action === 'task') {
      const title = window.prompt(`Task for ${customer.name}`);
      if (title?.trim()) createTaskForCustomer(customer, title.trim());
      return;
    }
    if (action === 'order') {
      toast.info('Order records are not available in this workspace yet');
      return;
    }
    const note = window.prompt(`Add a note for ${customer.name}`);
    if (note?.trim()) {
      setCustomers((prev) => prev.map((item) => item.id === customer.id
        ? { ...item, notes: [item.notes, note.trim()].filter(Boolean).join('\n\n'), updatedAt: new Date(), lastActivityAt: new Date() }
        : item));
      toast.success('Customer note added');
    }
  };

  const createTicketForCustomer = (customer: Customer) => {
    setSelectedTicket(null);
    setTicketCustomerId(customer.id);
    setIsTicketModalOpen(true);
  };

  // Tickets
  const handleSaveTicket = async (data: TicketFormValues) => {
    if (selectedTicket) {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === selectedTicket.id ? { ...t, ...data, updatedAt: new Date() } : t
        )
      );
      toast.success('Support ticket updated');
    } else {
      const newTicket: Ticket = {
        id: createId('ticket'),
        ...data,
        customerId: data.customerId ?? null,
        assignedToId: data.assignedToId ?? null,
        organizationId: currentOrgId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTickets((prev) => [newTicket, ...prev]);
      toast.success('Support ticket logged');
    }
    setIsTicketModalOpen(false);
  };

  const handleDeleteTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
    toast.success('Ticket deleted');
  };

  // Tasks
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const completed = !t.completed;
          toast.success(completed ? 'Task completed' : 'Task reopened');
          return { ...t, completed };
        }
        return t;
      })
    );
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: createId('task'),
      title: newTaskTitle.trim(),
      dueDate: newTaskDueDate ? new Date(newTaskDueDate) : null,
      completed: false,
      organizationId: currentOrgId,
      assignedToId: currentUser.id,
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setNewTaskTitle('');
    setNewTaskDueDate('');
    toast.success('Task scheduled');
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.success('Task removed');
  };

  // Team Invite
  const handleInviteTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) {
      toast.error('Please enter name and email');
      return;
    }
    const newUser: User = {
      id: createId('user'),
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      role: inviteRole,
      organizationId: currentOrgId,
      createdAt: new Date(),
    };
    setUsers((prev) => [...prev, newUser]);
    setIsInviteTeamOpen(false);
    setInviteName('');
    setInviteEmail('');
    setInviteRole('SALES');
    toast.success(`Invitation sent to ${newUser.email}`);
  };

  // Dashboard Aggregations
  const monthlyRevenue = dashboardStats?.monthlyRevenue ?? [];
  const dealsByStage = dashboardStats?.dealsByStage ?? [];

  // Landing Page Route
  if (activeView === '/') {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col selection:bg-indigo-500 selection:text-white">
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Kanban className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight">
              Wordbit<span className="text-indigo-400">X</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard/login')}
              className="text-slate-300 hover:text-white hover:bg-slate-800 text-xs sm:text-sm px-2.5 sm:px-3"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              onClick={() => router.push('/dashboard/register')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm px-3 sm:px-4"
            >
              <span className="hidden sm:inline">Create Workspace</span>
              <span className="sm:hidden">Get Started</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-[11px] sm:text-xs font-semibold mb-6 max-w-full text-center">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Next.js 14 • PostgreSQL • Prisma • NextAuth Multi-Tenant CRM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight">
            Enterprise sales velocity with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200">
              multi-tenant precision
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Drag-and-drop opportunity pipelines, predictive lead scoring, multi-tenant RBAC, and unified support desks built for scale.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
            <Button
              size="lg"
              onClick={() => {
                router.push('/dashboard');
              }}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-6 sm:px-8 py-3 rounded-xl font-bold shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2"
            >
              <span>Launch Live App</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/dashboard/register')}
              className="w-full sm:w-auto border-slate-700 bg-slate-800/80 text-white hover:bg-slate-800 px-6 sm:px-8 py-3 rounded-xl font-semibold"
            >
              Register Organization
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Login Page Route
  if (activeView === '/login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-3 sm:p-4">
        <Card className="w-full max-w-md border-slate-800 bg-slate-950/90 text-white shadow-2xl backdrop-blur">
          <CardHeader className="text-center space-y-2 p-4 sm:p-6 pb-2">
            <div className="mx-auto h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Kanban className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-white">Welcome back to WordbitX</CardTitle>
            <CardDescription className="text-slate-400 text-xs sm:text-sm">
              Sign in to access your organization dashboard and sales pipeline
            </CardDescription>
          </CardHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setAuthError('');
              setAuthLoading(true);
              const formData = new FormData(e.currentTarget);
              try {
                const { signIn } = await import('next-auth/react');
                const result = await signIn('credentials', {
                  email: formData.get('email'),
                  password: formData.get('password'),
                  redirect: false,
                });
                if (!result?.ok) {
                  setAuthError(result?.error || 'Sign-in failed. Check your credentials and try again.');
                  return;
                }
                router.push('/dashboard');
                router.refresh();
              } catch (error) {
                console.error('CRM sign-in request failed', error);
                setAuthError('Unable to sign in right now. Please try again later.');
              } finally {
                setAuthLoading(false);
              }
            }}
          >
            <CardContent className="space-y-4 p-4 sm:p-6 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    type="email"
                    name="email"
                    className="pl-9 bg-slate-900 border-slate-800 text-white"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    type="password"
                    name="password"
                    className="pl-9 bg-slate-900 border-slate-800 text-white"
                    required
                  />
                </div>
              </div>
              {authError && <p role="alert" className="text-sm text-rose-300">{authError}</p>}
              <p className="text-xs text-slate-400">
                Demo dashboard data is illustrative. Sign-in requires a configured database and an existing account.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3 p-4 sm:p-6 pt-0">
              <Button type="submit" disabled={authLoading} className="w-full bg-indigo-600 hover:bg-indigo-500 font-semibold py-2">
                <span>{authLoading ? 'Signing in…' : 'Sign In'}</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
              <button
                type="button"
                onClick={() => router.push('/dashboard/register')}
                className="text-xs text-indigo-400 hover:underline text-center"
              >
                Need a new tenant workspace? Register Organization
              </button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  // Workspace creation requires a server-backed provisioning flow.
  if (activeView === '/register') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-3 sm:p-4">
        <Card className="w-full max-w-md border-slate-800 bg-slate-950/90 text-white shadow-2xl backdrop-blur">
          <CardHeader className="text-center space-y-2 p-4 sm:p-6 pb-2">
            <div className="mx-auto h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Kanban className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-white">Create WordbitX Workspace</CardTitle>
            <CardDescription className="text-slate-400 text-xs sm:text-sm">
              Workspace creation is not enabled in this preview.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6 pt-2 text-sm text-slate-300">
            <p>Contact the WordbitX team to discuss workspace access. No account or workspace is created by this preview.</p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 p-4 sm:p-6 pt-0">
              <Button onClick={() => router.push('/contact')} className="w-full bg-indigo-600 hover:bg-indigo-500 font-semibold py-2">
                <span>Contact WordbitX</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
              <button
                type="button"
                onClick={() => router.push('/dashboard/login')}
                className="text-xs text-indigo-400 hover:underline text-center"
              >
                Already registered? Sign In
              </button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // --- Main Dashboard App Shell ---
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans antialiased text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* Navigation Sidebar (Desktop persistent + Mobile off-canvas drawer) */}
      <Sidebar
        currentPath={activeView}
        onNavigate={(path) => navigate(path)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        user={isWorkspaceDataView
          ? {
            name: dashboardStats?.workspace.user.name || (dashboardStatus === 'error' ? 'Unavailable' : 'Loading…'),
            email: dashboardStats?.workspace.user.email || '',
            role: dashboardStats?.workspace.user.role || '',
            organizationName: dashboardStats?.workspace.organizationName
              || dashboardStats?.workspace.organizationId
              || (dashboardStatus === 'error' ? 'Unavailable' : 'Loading workspace…'),
          }
          : {
            name: currentUser?.name || 'Sarah Jenkins',
            email: currentUser?.email || 'sarah@acme.io',
            role: currentUser?.role || 'ADMIN',
            organizationName: currentOrg?.name || 'Acme Technologies Inc.',
          }}
        onLogout={() => {
          void import('next-auth/react').then(({ signOut }) =>
            signOut({ callbackUrl: '/login' }),
          );
        }}
      />

      {/* Main Body with bottom padding for mobile navigation bar */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <Topbar
          title={
            activeView === '/dashboard'
              ? 'Executive Dashboard'
              : activeView.replace('/', '').replace('-', ' ')
          }
          organizations={isWorkspaceDataView ? [] : organizations}
          currentOrgId={currentOrgId}
          onSelectOrg={handleSwitchOrg}
          onToggleMobileSidebar={() => setMobileMenuOpen((prev) => !prev)}
          onOpenQuickCreate={(type) => {
            if (type === 'lead') {
              setSelectedLead(null);
              setIsLeadModalOpen(true);
            }
            if (type === 'deal') {
              navigate('/pipeline');
            }
            if (type === 'ticket') {
              setSelectedTicket(null);
              setIsTicketModalOpen(true);
            }
          }}
        />

        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto min-w-0">
          <div className={`mb-4 flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-xs ${
            (isLeadsView && leadsStatus === 'error') || (isPipelineView && pipelineStatus === 'error')
              ? 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200'
              : 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200'
          }`}>
            <span>
              {isLeadsView
                ? leadsStatus === 'ready'
                  ? 'Leads are loaded from your saved workspace records.'
                  : leadsStatus === 'error'
                    ? `Workspace leads could not be loaded: ${leadsError}`
                    : 'Loading saved workspace leads…'
                : isPipelineView
                  ? pipelineStatus === 'ready'
                    ? 'Pipeline data is loaded from your saved workspace records.'
                    : pipelineStatus === 'error'
                      ? `Pipeline data could not be loaded: ${pipelineError}`
                      : 'Loading saved pipeline data…'
                  : activeView === '/dashboard' || activeView === '/reports'
                    ? dashboardStatus === 'ready'
                      ? 'Analytics are loaded from your saved workspace records.'
                      : dashboardStatus === 'error'
                        ? 'Workspace analytics could not be loaded.'
                        : 'Loading saved workspace analytics…'
                    : 'Demo workspace · Illustrative sample data · Changes are saved only in this browser'}
            </span>
            {isPipelineView && pipelineStatus === 'error' && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPipelineReloadKey((key) => key + 1)}
                className="h-7 shrink-0 border-current px-2 text-[11px]"
              >
                Retry
              </Button>
            )}
            {isLeadsView && leadsStatus === 'error' && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setLeadsReloadKey((key) => key + 1)}
              >
                Retry
              </Button>
            )}
          </div>
          {/* VIEW: Dashboard */}
          {activeView === '/dashboard' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Executive Revenue Overview
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Real-time pipeline analytics, lead acquisition velocity, and SLA telemetry.
                  </p>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <span className={`text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full ${
                    dashboardStatus === 'ready'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : dashboardStatus === 'error'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}>
                    {dashboardStatus === 'ready' ? 'Live data' : dashboardStatus === 'error' ? 'Unavailable' : 'Loading data…'}
                  </span>
                </div>
              </div>

              {dashboardStatus === 'error' && (
                <Card role="alert" className="border-rose-200 dark:border-rose-900">
                  <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-rose-700 dark:text-rose-300">{dashboardError}</p>
                    <Button
                      size="sm"
                      onClick={() => {
                        setDashboardStatus('loading');
                        setDashboardReloadKey((key) => key + 1);
                      }}
                    >
                      Retry
                    </Button>
                  </CardContent>
                </Card>
              )}

              {['ADMIN', 'ORGANIZATION_OWNER', 'ORGANIZATION_ADMIN'].includes(dashboardStats?.workspace.user.role ?? '') && (
                <DemoRequestsPanel />
              )}

              {dashboardStatus === 'loading' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {Array.from({ length: 7 }, (_, index) => (
                      <Card key={index} aria-label="Loading dashboard metric">
                        <CardContent className="space-y-4 p-5">
                          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                          <div className="h-8 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 min-w-0">
                    {Array.from({ length: 2 }, (_, index) => (
                      <Card key={index} className="min-h-80 animate-pulse" aria-label="Loading dashboard chart" />
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {Array.from({ length: 3 }, (_, index) => (
                      <Card
                        key={index}
                        className={`min-h-56 animate-pulse ${index === 2 ? 'md:col-span-2' : ''}`}
                        aria-label="Loading dashboard records"
                      />
                    ))}
                  </div>
                </>
              )}

              {dashboardStatus === 'ready' && dashboardStats && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <StatsCard title="Total Leads" value={dashboardStats.totalLeads} icon={Users} colorVariant="indigo" />
                    <StatsCard title="Total Contacts" value={dashboardStats.totalContacts} icon={Building2} colorVariant="sky" />
                    <StatsCard title="Active Deals" value={dashboardStats.activeDealsCount} icon={Kanban} colorVariant="emerald" />
                    <StatsCard title="Closed-Won Revenue" value={formatCurrency(dashboardStats.revenueTotal)} icon={DollarSign} colorVariant="purple" />
                    <StatsCard title="Recorded Calls" value={dashboardStats.callsCount} icon={PhoneCall} colorVariant="amber" />
                    <StatsCard title="Tasks Due Today" value={dashboardStats.tasksDueToday} icon={CheckSquare} colorVariant="violet" />
                    <StatsCard title="Lead Conversion Rate" value={`${dashboardStats.conversionRate}%`} icon={Percent} colorVariant="rose" />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 min-w-0">
                    <RevenueChart data={monthlyRevenue} />
                    <PipelineChart data={dealsByStage} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-bold">Recent Opportunities</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {dashboardStats.recentDeals.length === 0 ? (
                          <p className="py-6 text-center text-sm text-slate-500">No opportunities have been recorded yet.</p>
                        ) : dashboardStats.recentDeals.map((deal) => (
                          <div
                            key={deal.id}
                            onClick={() => navigate('/deals/detail', deal.id)}
                            className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-indigo-300 transition"
                          >
                            <div className="min-w-0 pr-2">
                              <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{deal.title}</h4>
                              <span className="text-xs text-slate-400">Updated {formatDate(deal.updatedAt)}</span>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-sm font-bold text-slate-900 dark:text-white block">{formatCurrency(deal.value)}</span>
                              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{deal.stage}</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-bold">Urgent Customer Inquiries</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {dashboardStats.urgentTickets.length === 0 ? (
                          <p className="py-6 text-center text-sm text-slate-500">No high-priority open inquiries.</p>
                        ) : dashboardStats.urgentTickets.map((ticket) => (
                          <div
                            key={ticket.id}
                            onClick={() => navigate('/tickets/detail', ticket.id)}
                            className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-indigo-300 transition"
                          >
                            <div className="min-w-0 pr-2">
                              <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{ticket.subject}</h4>
                              <span className="text-xs text-slate-400">{ticket.customer || 'Customer account'}</span>
                            </div>
                            <Badge variant={ticket.priority === 'URGENT' ? 'destructive' : 'warning'}>
                              {ticket.priority}
                            </Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base font-bold">
                          <ActivityIcon className="h-4 w-4 text-indigo-500" />
                          Recent Activities
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {dashboardStats.recentActivities.length === 0 ? (
                          <p className="py-6 text-center text-sm text-slate-500">No recent activities have been recorded.</p>
                        ) : dashboardStats.recentActivities.map((activity) => (
                          <button
                            key={activity.id}
                            type="button"
                            onClick={() => navigate(activity.href)}
                            className="w-full flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3 text-left transition hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-800/60"
                          >
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">{activity.title}</span>
                              <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{activity.description}</span>
                              {activity.user && <span className="block text-[10px] text-slate-400">By {activity.user}</span>}
                            </span>
                            <span className="shrink-0 text-[10px] text-slate-400">{formatDate(activity.occurredAt)}</span>
                          </button>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </div>
          )}

          {/* VIEW: Leads */}
          {activeView === '/leads' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Leads Inbox</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Prospect acquisition channels, scoring metrics, and sales assignments.
                  </p>
                </div>
              </div>

              <LeadTable
                leads={displayedLeads}
                users={leadAssignees}
                isLoading={leadsStatus === 'loading'}
                onAddLead={() => {
                  setSelectedLead(null);
                  setIsLeadModalOpen(true);
                }}
                onEditLead={(lead) => {
                  setSelectedLead(lead);
                  setIsLeadModalOpen(true);
                }}
                onDeleteLead={handleDeleteLead}
                onViewLead={(id) => navigate('/leads/detail', id)}
              />
            </div>
          )}

          {/* VIEW: Lead Detail */}
          {activeView === '/leads/detail' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => navigate('/leads')} className="space-x-1.5">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Leads</span>
                </Button>
                <Button onClick={() => navigate('/pipeline')} className="space-x-1">
                  <span>Convert to Opportunity</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>

              {(() => {
                const lead = isLeadsView
                  ? workspaceLeads?.find((item) => item.id === routeParam)
                  : scopedLeads.find((item) => item.id === routeParam) || scopedLeads[0];
                if (!lead) {
                  if (isLeadsView && leadsStatus === 'loading') {
                    return <p className="text-sm text-slate-500">Loading lead…</p>;
                  }
                  if (isLeadsView && leadsStatus === 'error') {
                    return <p role="alert" className="text-sm text-rose-600">{leadsError}</p>;
                  }
                  return <p className="text-sm text-slate-500">Lead not found</p>;
                }
                const rep = scopedUsers.find((u) => u.id === lead.assignedToId);
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    <Card className="lg:col-span-2">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                          <CardTitle className="text-lg sm:text-xl">{lead.name}</CardTitle>
                          <p className="text-xs text-slate-400 mt-1">Lead ID: {lead.id}</p>
                        </div>
                        <Badge variant="success">{lead.status}</Badge>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-6 pt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                            <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                            <span className="truncate">{lead.email || 'N/A'}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                            <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                            <span className="truncate">{lead.phone || 'N/A'}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                            <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                            <span className="truncate">Created {formatDate(lead.createdAt)}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                            <UserCheck className="h-4 w-4 text-slate-400 shrink-0" />
                            <span className="truncate">Assigned Rep: {rep?.name || 'Unassigned'}</span>
                          </div>
                        </div>

                        <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Lead Notes & Context</h4>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 sm:p-3.5 rounded-lg border border-slate-100 dark:border-slate-800">
                            {lead.notes || 'No notes have been added to this lead.'}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Lead Propensity</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900">
                          <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">{lead.score}</span>
                          <span className="text-xs text-slate-500 block mt-1 font-semibold uppercase tracking-wider">Propensity Score</span>
                        </div>
                        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                          <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                            <span>Acquisition Channel</span>
                            <span className="font-semibold">{lead.source || 'Direct Outreach'}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                            <span>Multi-Tenant Partition</span>
                            <span className="font-semibold text-emerald-600">Active</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })()}
            </div>
          )}

          {/* VIEW: Pipeline */}
          {activeView === '/pipeline' && (
            pipelineStatus === 'loading' ? (
              <div className="flex min-h-48 items-center justify-center gap-3 text-sm text-slate-500">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                Loading saved pipeline…
              </div>
            ) : pipelineStatus === 'error' ? (
              <div className="rounded-lg border border-rose-200 bg-white p-8 text-center dark:border-rose-900 dark:bg-slate-900">
                <p role="alert" className="text-sm text-rose-600">{pipelineError}</p>
                <Button className="mt-3" size="sm" onClick={() => setPipelineReloadKey((key) => key + 1)}>Retry</Button>
              </div>
            ) : (
              <SalesPipeline
                deals={displayedDeals}
                users={displayedUsers}
                customers={displayedCustomers}
                leadCount={pipelineWorkspace?.leadCount ?? 0}
                onUpdateDealStage={handleUpdateDealStage}
                onCreateDeal={handleCreateDeal}
                onSaveDeal={handleSaveDeal}
                onBulkUpdateDeals={handleBulkUpdateDeals}
                onDeleteDeals={handleDeleteDeals}
                onCreateOrderFromDeal={handleCreateOrderFromDeal}
                onViewDeal={(id) => navigate('/deals/detail', id)}
              />
            )
          )}

          {/* VIEW: Deal Detail */}
          {activeView === '/deals/detail' && (() => {
            if (pipelineStatus === 'loading') {
              return <div className="flex min-h-48 items-center justify-center gap-3 text-sm text-slate-500"><span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />Loading saved deal…</div>;
            }
            if (pipelineStatus === 'error') {
              return <div className="rounded-lg border border-rose-200 bg-white p-8 text-center dark:border-rose-900 dark:bg-slate-900"><p role="alert" className="text-sm text-rose-600">{pipelineError}</p><Button className="mt-3" size="sm" onClick={() => setPipelineReloadKey((key) => key + 1)}>Retry</Button></div>;
            }
            const deal = displayedDeals.find((item) => item.id === routeParam);
            if (!deal) return <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">Deal not found</div>;
            return <DealDetails
              key={deal.id}
              deal={deal}
              customer={displayedCustomers.find((customer) => customer.id === deal.customerId)}
              customers={displayedCustomers}
              tasks={scopedTasks}
              users={displayedUsers}
              currentUser={isPipelineView ? pipelineCurrentUser : currentUser}
              onBack={() => navigate('/pipeline')}
              onOpenCustomer={(id) => navigate('/customers/detail', id)}
              onSaveDeal={handleSaveDeal}
              onUpdateStage={handleUpdateDealStage}
              onUpdateDeal={handleUpdateDealDetails}
              onCreateTask={handleCreateDealTask}
              onCreateOrderFromDeal={handleCreateOrderFromDeal}
            />;
          })()}

          {/* VIEW: Customers */}
          {activeView === '/customers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Customers</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Customer management, account health, and connected business relationships.
                  </p>
                </div>
              </div>

              <CustomerTable
                customers={scopedCustomers}
                deals={scopedDeals}
                tickets={scopedTickets}
                users={scopedUsers}
                onAddCustomer={() => {
                  setSelectedCustomer(null);
                  setIsCustomerModalOpen(true);
                }}
                onEditCustomer={(customer) => {
                  setSelectedCustomer(customer);
                  setIsCustomerModalOpen(true);
                }}
                onDeleteCustomer={handleDeleteCustomer}
                onViewCustomer={(id) => navigate('/customers/detail', id)}
                onQuickAction={handleCustomerQuickAction}
                onBulkUpdate={handleBulkUpdateCustomers}
              />
            </div>
          )}

          {/* VIEW: Customer Detail */}
          {activeView === '/customers/detail' && (() => {
            const customer = scopedCustomers.find((item) => item.id === routeParam);
            if (!customer) return <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">Customer not found</div>;
            return <CustomerDetails
              key={customer.id}
              customer={customer}
              deals={scopedDeals}
              tickets={scopedTickets}
              tasks={scopedTasks}
              users={scopedUsers}
              onBack={() => navigate('/customers')}
              onEdit={(record) => { setSelectedCustomer(record); setIsCustomerModalOpen(true); }}
              onOpenDeal={(id) => navigate('/deals/detail', id)}
              onOpenTicket={(id) => navigate('/tickets/detail', id)}
              onCreateDeal={createDealForCustomer}
              onCreateTask={createTaskForCustomer}
              onCreateTicket={createTicketForCustomer}
              onSaveNotes={(customerNotes) => setCustomers((prev) => prev.map((item) => item.id === customer.id ? { ...item, customerNotes, notes: customerNotes.map((note) => note.content).join('\n\n'), updatedAt: new Date(), lastActivityAt: new Date() } : item))}
              onSaveCalls={(calls) => setCustomers((prev) => prev.map((item) => item.id === customer.id ? { ...item, calls, updatedAt: new Date(), lastActivityAt: new Date() } : item))}
            />;
          })()}

          {(activeView === '/orders' || activeView === '/orders/detail') && (
            <OrderWorkspace
              orders={scopedOrders}
              customers={scopedCustomers}
              deals={scopedDeals}
              users={scopedUsers}
              currentUser={currentUser}
              selectedOrderId={activeView === '/orders/detail' ? routeParam : null}
              onOrdersChange={(nextOrders) => setOrders((previous) => [
                ...previous.filter((order) => order.organizationId !== currentOrgId),
                ...nextOrders,
              ])}
              onNavigate={navigate}
              onAddCustomer={() => { setSelectedCustomer(null); setIsCustomerModalOpen(true); }}
            />
          )}

          {/* VIEW: Tickets */}
          {activeView === '/tickets' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Helpdesk Desk</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Customer inquiries, issue triage, SLA tracking, and resolution workflows.
                  </p>
                </div>
              </div>

              <TicketTable
                tickets={scopedTickets}
                customers={scopedCustomers}
                users={scopedUsers}
                onAddTicket={() => {
                  setSelectedTicket(null);
                  setIsTicketModalOpen(true);
                }}
                onEditTicket={(ticket) => {
                  setSelectedTicket(ticket);
                  setIsTicketModalOpen(true);
                }}
                onDeleteTicket={handleDeleteTicket}
                onViewTicket={(id) => navigate('/tickets/detail', id)}
              />
            </div>
          )}

          {/* VIEW: Ticket Detail */}
          {activeView === '/tickets/detail' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => navigate('/tickets')} className="space-x-1.5">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Tickets</span>
                </Button>
              </div>

              {(() => {
                const ticket = scopedTickets.find((t) => t.id === routeParam) || scopedTickets[0];
                if (!ticket) return <div>Ticket not found</div>;
                const customer = scopedCustomers.find((c) => c.id === ticket.customerId);
                const assigned = scopedUsers.find((u) => u.id === ticket.assignedToId);
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    <Card className="lg:col-span-2">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                          <CardTitle className="text-lg sm:text-xl">{ticket.subject}</CardTitle>
                          <p className="text-xs text-slate-400 mt-1">Ticket ID: {ticket.id}</p>
                        </div>
                        <Badge variant="cyan">{ticket.status}</Badge>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-6 pt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                            <Building className="h-4 w-4 text-slate-400 shrink-0" />
                            <span className="truncate">Account: {customer?.company || customer?.name || 'Customer Account'}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                            <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                            <span className="truncate">Logged: {formatDate(ticket.createdAt)}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                            <UserCheck className="h-4 w-4 text-slate-400 shrink-0" />
                            <span className="truncate">Assignee: {assigned?.name || 'Unassigned'}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                            <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                            <span className="truncate">SLA Response: 45 min</span>
                          </div>
                        </div>

                        <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Problem Description & Context
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 sm:p-4 rounded-lg border border-slate-100 dark:border-slate-800 leading-relaxed font-mono">
                            {ticket.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Severity & SLA</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-center">
                          <span className="text-base sm:text-lg font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                            {ticket.priority} PRIORITY
                          </span>
                          <span className="text-xs text-slate-500">Critical Support Response</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })()}
            </div>
          )}

          {/* VIEW: Tasks */}
          {activeView === '/tasks' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Actionable Tasks</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Keep track of sales outreach follow-ups, client meetings, and support resolutions.
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  <CheckSquare className="h-4 w-4 mr-1 text-indigo-600" />
                  <span>
                    {scopedTasks.filter((t) => t.completed).length} of {scopedTasks.length} Completed
                  </span>
                </div>
              </div>

              {/* Add Task */}
              <Card>
                <CardContent className="p-4">
                  <form onSubmit={handleCreateTask} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex-1">
                      <Input
                        placeholder="What needs to get done next?"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="w-full sm:w-44">
                      <Input
                        type="date"
                        value={newTaskDueDate}
                        onChange={(e) => setNewTaskDueDate(e.target.value)}
                      />
                    </div>
                    <Button type="submit" size="sm" className="space-x-1 shrink-0">
                      <Plus className="h-4 w-4" />
                      <span>Add Task</span>
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Tasks List */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-bold">Checklist</CardTitle>
                </CardHeader>
                <CardContent className="divide-y divide-slate-100 dark:divide-slate-800 p-0">
                  {scopedTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center justify-between p-4 transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40 ${
                        task.completed ? 'opacity-60 bg-slate-50/50 dark:bg-slate-900/30' : ''
                      }`}
                    >
                      <div
                        className="flex items-center space-x-3 cursor-pointer select-none flex-1 min-w-0"
                        onClick={() => handleToggleTask(task.id)}
                      >
                        <button type="button" className="text-slate-400 hover:text-indigo-600 shrink-0">
                          {task.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                          ) : (
                            <Circle className="h-5 w-5" />
                          )}
                        </button>
                        <span
                          className={`text-sm font-medium ${
                            task.completed
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : 'text-slate-800 dark:text-slate-100'
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0 ml-4">
                        {task.dueDate && (
                          <div className="flex items-center space-x-1 text-xs text-slate-400">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formatDate(task.dueDate)}</span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-slate-400 hover:text-rose-600 transition p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* VIEW: Reports */}
          {activeView === '/reports' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Revenue & Sales Analytics</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Historical conversion rates, executive revenue pacing, and sales rep performance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 uppercase font-semibold">Overall Win Rate</span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {dashboardStatus === 'ready' && dashboardStats
                          ? `${dashboardStats.closedDealsCount === 0 ? 0 : ((dashboardStats.wonDealsCount / dashboardStats.closedDealsCount) * 100).toFixed(1)}%`
                          : dashboardStatus === 'loading' ? 'Loading…' : 'Unavailable'}
                      </h3>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 uppercase font-semibold">Average Deal Size</span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {dashboardStatus === 'ready' && dashboardStats
                          ? formatCurrency(dashboardStats.averageDealSize)
                          : dashboardStatus === 'loading' ? 'Loading…' : 'Unavailable'}
                      </h3>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 uppercase font-semibold">Sales Velocity Cycle</span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Not tracked</h3>
                    </div>
                  </div>
                </Card>
              </div>

              {dashboardStatus === 'error' && (
                <Card role="alert" className="border-rose-200 dark:border-rose-900">
                  <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-rose-700 dark:text-rose-300">{dashboardError}</p>
                    <Button
                      size="sm"
                      onClick={() => {
                        setDashboardStatus('loading');
                        setDashboardReloadKey((key) => key + 1);
                      }}
                    >
                      Retry
                    </Button>
                  </CardContent>
                </Card>
              )}
              {dashboardStatus === 'loading' && (
                <Card className="min-h-80 animate-pulse" aria-label="Loading sales reports" />
              )}
              {dashboardStatus === 'ready' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <RevenueChart data={monthlyRevenue} />
                  <PipelineChart data={dealsByStage} />
                </div>
              )}
            </div>
          )}

          {/* VIEW: Settings */}
          {activeView === '/settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Workspace Settings</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Tenant organization branding, locale, and security settings.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-indigo-600" />
                    <CardTitle className="text-base">Organization Profile</CardTitle>
                  </div>
                  <CardDescription>Update your company identifier and reporting defaults.</CardDescription>
                </CardHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success('Workspace profile settings saved');
                  }}
                >
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Organization Name
                      </label>
                      <Input defaultValue={currentOrg.name} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                          Default Currency
                        </label>
                        <Input defaultValue="USD ($)" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                          Fiscal Cycle
                        </label>
                        <Input defaultValue="January - December" />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-xs text-indigo-800 dark:text-indigo-300 flex items-center space-x-2">
                      <Shield className="h-4 w-4 shrink-0 text-indigo-600" />
                      <span>
                        Multi-tenant logical isolation is enforced for organization ID: <strong>{currentOrgId}</strong>
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end pt-2">
                    <Button type="submit">Save Settings</Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          )}

          {/* VIEW: Settings / Team */}
          {activeView === '/settings/team' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Team & Role-Based Access Control
                    </h1>
                    <Badge variant="purple" className="text-xs">
                      ADMIN ONLY
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Invite colleagues, designate departmental roles, and configure organization permissions.
                  </p>
                </div>

                <Button onClick={() => setIsInviteTeamOpen(true)} size="sm" className="space-x-1.5">
                  <UserPlus className="h-4 w-4" />
                  <span>Invite Member</span>
                </Button>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-bold">Active Members ({scopedUsers.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table className="min-w-[620px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Email Address</TableHead>
                        <TableHead>Assigned Role</TableHead>
                        <TableHead>Joined Workspace</TableHead>
                        <TableHead className="text-right">Manage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scopedUsers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2.5">
                              <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold flex items-center justify-center text-xs">
                                {member.name.charAt(0)}
                              </div>
                              <span className="font-semibold text-slate-900 dark:text-white">
                                {member.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                              <Mail className="h-3.5 w-3.5 text-slate-400" />
                              <span>{member.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <select
                              value={member.role}
                              onChange={(e) => {
                                const newRole = e.target.value as Role;
                                setUsers((prev) =>
                                  prev.map((u) => (u.id === member.id ? { ...u, role: newRole } : u))
                                );
                                toast.success(`Updated role for ${member.name}`);
                              }}
                              className="text-xs font-semibold py-1 px-2 rounded-md border border-slate-200 bg-white text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
                            >
                              <option value="ADMIN">ADMIN</option>
                              <option value="SALES">SALES</option>
                              <option value="SUPPORT">SUPPORT</option>
                              <option value="AGENT">AGENT</option>
                            </select>
                          </TableCell>
                          <TableCell className="text-xs text-slate-500">
                            {formatDate(member.createdAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            <button
                              type="button"
                              onClick={() => {
                                if (scopedUsers.length <= 1) {
                                  toast.error('Cannot remove last admin');
                                  return;
                                }
                                setUsers((prev) => prev.filter((u) => u.id !== member.id));
                                toast.success('Member removed');
                              }}
                              className="text-slate-400 hover:text-rose-600 p-1 rounded transition"
                              title="Remove member"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        currentPath={activeView}
        onNavigate={navigate}
        onOpenMenu={() => setMobileMenuOpen(true)}
      />

      {/* Global Modals */}
      <LeadForm
        open={isLeadModalOpen}
        onOpenChange={setIsLeadModalOpen}
        onSubmit={handleSaveLead}
        lead={selectedLead}
        users={isLeadsView ? leadAssignees : scopedUsers}
      />

      <CustomerForm
        open={isCustomerModalOpen}
        onOpenChange={setIsCustomerModalOpen}
        onSubmit={handleSaveCustomer}
        customer={selectedCustomer}
        users={scopedUsers}
      />

      <TicketForm
        open={isTicketModalOpen}
        onOpenChange={setIsTicketModalOpen}
        onSubmit={handleSaveTicket}
        ticket={selectedTicket}
        customers={ticketCustomerId && isTicketModalOpen
          ? [scopedCustomers.find((customer) => customer.id === ticketCustomerId), ...scopedCustomers.filter((customer) => customer.id !== ticketCustomerId)].filter((customer): customer is Customer => Boolean(customer))
          : scopedCustomers}
        users={scopedUsers}
      />

      {/* Invite Member Dialog */}
      <Dialog open={isInviteTeamOpen} onOpenChange={setIsInviteTeamOpen}>
        <DialogContent>
          <DialogHeader onClose={() => setIsInviteTeamOpen(false)}>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Grant access to your organization&apos;s CRM workspace and assign their role.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInviteTeam} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Full Name *
              </label>
              <Input
                placeholder="e.g. Rachel Adams"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Work Email *
              </label>
              <Input
                type="email"
                placeholder="rachel@acme.io"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Permission Role *
              </label>
              <Select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as Role)}
              >
                <option value="ADMIN">ADMIN - Full administrative access</option>
                <option value="SALES">SALES - Manage opportunities, leads, accounts</option>
                <option value="SUPPORT">SUPPORT - Manage customer tickets & SLAs</option>
                <option value="AGENT">AGENT - General read & outreach permissions</option>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsInviteTeamOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Invitation</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Toast Notification Container */}
      <Toaster />
    </div>
  );
}
