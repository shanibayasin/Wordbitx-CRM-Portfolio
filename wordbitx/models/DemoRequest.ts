import mongoose, { Schema, type Document, type Model } from 'mongoose';

export type DemoRequestStatus = 'NEW' | 'CONTACTED' | 'SCHEDULED' | 'COMPLETED';

export interface IDemoRequest extends Document {
  name: string;
  email: string;
  company: string;
  phone: string;
  teamSize: string;
  role: string;
  features: string[];
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: DemoRequestStatus;
  organizationId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const DemoRequestSchema = new Schema<IDemoRequest>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, required: true, trim: true },
    phone: { type: String, default: '', trim: true },
    teamSize: { type: String, required: true },
    role: { type: String, default: '', trim: true },
    features: { type: [String], default: [] },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'SCHEDULED', 'COMPLETED'],
      default: 'NEW',
      required: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
  },
  { timestamps: true }
);

DemoRequestSchema.index({ organizationId: 1, createdAt: -1 });

const DemoRequest: Model<IDemoRequest> =
  mongoose.models.DemoRequest || mongoose.model<IDemoRequest>('DemoRequest', DemoRequestSchema);

export default DemoRequest;
