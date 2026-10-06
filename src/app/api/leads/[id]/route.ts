import {
  DELETE as deleteLead,
  PATCH as updateLead,
} from '@/app/dashboardwordbitx/_server/api/leads/[id]/route';

export const PATCH = updateLead;
export const DELETE = deleteLead;
