import mongoose, { Schema, Document, Model } from 'mongoose';

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ORGANIZATION_OWNER'
  | 'ORGANIZATION_ADMIN'
  | 'SALES_MANAGER'
  | 'SALES_AGENT'
  | 'VIEWER'
  | 'ADMIN'
  | 'SALES'
  | 'SUPPORT'
  | 'AGENT';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  organizationId?: mongoose.Types.ObjectId | null;
  avatarUrl?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: [
        'SUPER_ADMIN',
        'ORGANIZATION_OWNER',
        'ORGANIZATION_ADMIN',
        'SALES_MANAGER',
        'SALES_AGENT',
        'VIEWER',
        'ADMIN',
        'SALES',
        'SUPPORT',
        'AGENT',
      ],
      default: 'SALES',
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: function (this: IUser) {
        return this.role !== 'SUPER_ADMIN';
      },
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
