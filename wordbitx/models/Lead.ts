import mongoose, { Schema, Document, Model } from 'mongoose';

export type LeadStatusType =
  | 'NEW'
  | 'CONTACTED'
  | 'FOLLOW_UP'
  | 'QUALIFIED'
  | 'PROPOSAL'
  | 'NEGOTIATION'
  | 'CONVERTED'
  | 'LOST';

export type LeadPriorityType = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface ILead extends Document {
  name: string;
  firstName?: string | null;
  lastName?: string | null;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  alternatePhone?: string | null;
  source?: string | null;
  industry?: string | null;
  jobTitle?: string | null;
  companySize?: string | null;
  score: number;
  status: LeadStatusType;
  priority?: LeadPriorityType;
  assignedToId?: mongoose.Types.ObjectId | null;
  assignedTeam?: string | null;
  assignedDealer?: string | null;
  nextFollowUp?: Date | null;
  followUpType?: string | null;
  notes?: string | null;
  organizationId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, 'Lead name is required'],
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
      default: null,
    },
    lastName: {
      type: String,
      trim: true,
      default: null,
    },
    company: {
      type: String,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      trim: true,
      default: null,
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    alternatePhone: {
      type: String,
      trim: true,
      default: null,
    },
    source: {
      type: String,
      default: null,
    },
    industry: {
      type: String,
      default: null,
    },
    jobTitle: {
      type: String,
      default: null,
    },
    companySize: {
      type: String,
      default: null,
    },
    score: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'FOLLOW_UP', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CONVERTED', 'LOST'],
      default: 'NEW',
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
    },
    assignedToId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    assignedTeam: {
      type: String,
      default: null,
    },
    assignedDealer: {
      type: String,
      default: null,
    },
    nextFollowUp: {
      type: Date,
      default: null,
    },
    followUpType: {
      type: String,
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

LeadSchema.index({ organizationId: 1, createdAt: -1 });
LeadSchema.index({ organizationId: 1, status: 1 });

const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;
