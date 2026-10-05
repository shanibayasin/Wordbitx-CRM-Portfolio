import {
  DELETE as deleteDeal,
  GET as getDeal,
  PATCH as updateDeal,
} from '../../../../../wordbitx/app/api/deals/[id]/route';

export const GET = getDeal;
export const PATCH = updateDeal;
export const DELETE = deleteDeal;
