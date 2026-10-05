import {
  DELETE as deleteLead,
  PATCH as updateLead,
} from '../../../../../wordbitx/app/api/leads/[id]/route';

export const PATCH = updateLead;
export const DELETE = deleteLead;
