import mongoose, { Schema, type Document, type Model } from 'mongoose';

export type WorkspaceRequestStatus =
  | 'NEW'
  | 'INVITE_PENDING'
  | 'INVITE_SENT'
  | 'REJECTED'
  | 'COMPLETED';

export interface IWorkspaceRequest extends Document {
  name: string;
  email: string;
  companyName: string;
  activeRequestEmail?: string;
  status: WorkspaceRequestStatus;
  inviteTokenHash?: string | null;
  inviteExpiresAt?: Date | null;
  approvedAt?: Date | null;
  completedAt?: Date | null;
  organizationId?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const WorkspaceRequestSchema = new Schema<IWorkspaceRequest>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    companyName: { type: String, required: true, trim: true },
    activeRequestEmail: { type: String, lowercase: true, trim: true },
    status: {
      type: String,
      enum: ['NEW', 'INVITE_PENDING', 'INVITE_SENT', 'REJECTED', 'COMPLETED'],
      default: 'NEW',
      required: true,
    },
    inviteTokenHash: { type: String, default: null, select: false },
    inviteExpiresAt: { type: Date, default: null },
    approvedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      default: null,
    },
  },
  { timestamps: true }
);

WorkspaceRequestSchema.index({ createdAt: -1 });
WorkspaceRequestSchema.index({ inviteTokenHash: 1 }, { sparse: true });
WorkspaceRequestSchema.index({ activeRequestEmail: 1 }, { unique: true, sparse: true });

const WorkspaceRequest: Model<IWorkspaceRequest> =
  mongoose.models.WorkspaceRequest ||
  mongoose.model<IWorkspaceRequest>('WorkspaceRequest', WorkspaceRequestSchema);

export default WorkspaceRequest;
