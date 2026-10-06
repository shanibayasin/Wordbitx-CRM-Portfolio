import './configureAuthUrl.ts';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import connectToDatabase from './mongodb.ts';
import User from '../models/User.ts';
import Organization from '../models/Organization.ts';
import type { Role } from '../types/index.ts';

export type AuthenticatedSessionUser = {
  id: string;
  email?: string | null;
  name?: string | null;
  role?: Role;
  organizationId?: string | null;
  organizationName?: string;
};

export function isConfiguredPlatformAdminEmail(email?: string | null) {
  const configuredEmail = process.env.PLATFORM_SUPER_ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(configuredEmail && email?.trim().toLowerCase() === configuredEmail);
}

export async function getSafeServerSession() {
  const requestHeaders = await headers();
  const requestUrl = new URL('/api/auth/session', process.env.NEXTAUTH_URL ?? 'http://localhost');
  const request = new NextRequest(requestUrl, { headers: requestHeaders });
  const token = await getToken({ req: request, secret: authOptions.secret });

  if (!token) {
    return null;
  }

  return getServerSession(authOptions);
}

export async function getCurrentUser(): Promise<AuthenticatedSessionUser | null> {
  const session = await getSafeServerSession();
  const sessionUser = session?.user;

  if (!sessionUser?.id || !mongoose.isValidObjectId(sessionUser.id)) {
    return null;
  }

  await connectToDatabase();
  const user = await User.findById(sessionUser.id)
    .select('name email role organizationId avatarUrl')
    .lean();
  if (!user) {
    return null;
  }

  if (user.role === 'SUPER_ADMIN') {
    if (user.organizationId || !isConfiguredPlatformAdminEmail(user.email)) {
      return null;
    }
    return {
      id: user._id.toString(),
      email: user.email ?? null,
      name: user.name ?? null,
      role: user.role,
      organizationId: null,
    };
  }

  if (isConfiguredPlatformAdminEmail(user.email)) {
    return null;
  }

  if (!user.organizationId || !mongoose.isValidObjectId(user.organizationId)) {
    return null;
  }

  const organization = await Organization.findById(user.organizationId).select('name').lean();
  if (!organization) {
    return null;
  }

  return {
    id: user._id.toString(),
    email: user.email ?? null,
    name: user.name ?? null,
    role: user.role,
    organizationId: user.organizationId.toString(),
    organizationName: organization.name,
  };
}

export async function requireAuth(): Promise<AuthenticatedSessionUser> {
  const user = await getCurrentUser();

  if (!user) {
    const error = new Error('Authentication required');
    (error as Error & { statusCode?: number }).statusCode = 401;
    throw error;
  }

  return user;
}

export interface OrganizationAuthenticatedUser extends AuthenticatedSessionUser {
  organizationId: string;
}

export async function requireOrganizationAuth(): Promise<OrganizationAuthenticatedUser> {
  const user = await requireAuth();
  if (user.role === 'SUPER_ADMIN') {
    const error = new Error('Platform administrators cannot use organization CRM endpoints.');
    (error as Error & { statusCode?: number }).statusCode = 403;
    throw error;
  }
  if (!user.organizationId || !mongoose.isValidObjectId(user.organizationId)) {
    const error = new Error('Organization context is missing or invalid.');
    (error as Error & { statusCode?: number }).statusCode = 401;
    throw error;
  }
  return { ...user, organizationId: user.organizationId };
}

export function canManageLeads(role?: Role | string) {
  return Boolean(role && [
    'ORGANIZATION_OWNER',
    'ORGANIZATION_ADMIN',
    'SALES_MANAGER',
    'SALES_AGENT',
    'ADMIN',
    'SALES',
    'AGENT',
  ].includes(role));
}

export function canViewLeads(role?: Role | string) {
  return Boolean(role && [
    'ORGANIZATION_OWNER',
    'ORGANIZATION_ADMIN',
    'SALES_MANAGER',
    'SALES_AGENT',
    'VIEWER',
    'ADMIN',
    'SALES',
    'SUPPORT',
    'AGENT',
  ].includes(role));
}

export function canManageOrganization(role?: Role | string) {
  return role === 'ORGANIZATION_OWNER' || role === 'ORGANIZATION_ADMIN' || role === 'ADMIN';
}

export async function requirePlatformAdmin(): Promise<AuthenticatedSessionUser> {
  const user = await requireAuth();
  if (
    user.role !== 'SUPER_ADMIN' ||
    user.organizationId ||
    !isConfiguredPlatformAdminEmail(user.email)
  ) {
    const error = new Error('Platform administrator access is required.');
    (error as Error & { statusCode?: number }).statusCode = 403;
    throw error;
  }
  return user;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 12 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'user@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid email or password');
        }

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email.toLowerCase() });

          if (!user || !user.password) {
            throw new Error('Invalid email or password');
          }

          const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordMatch) {
            throw new Error('Invalid email or password');
          }

          const isPlatformAdmin = user.role === 'SUPER_ADMIN';
          if (
            isConfiguredPlatformAdminEmail(user.email) !== isPlatformAdmin ||
            (isPlatformAdmin && user.organizationId)
          ) {
            throw new Error('Invalid email or password');
          }
          const organization = isPlatformAdmin
            ? null
            : await Organization.findById(user.organizationId);
          if (!isPlatformAdmin && !organization) {
            throw new Error('Unable to authenticate at this time');
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId?.toString() ?? null,
            avatarUrl: user.avatarUrl || null,
            organizationName: organization?.name,
          };
        } catch (error) {
          if (error instanceof Error && error.message === 'Invalid email or password') {
            throw error;
          }

          const details = error as { name?: string; code?: string | number };
          console.error('[auth] Credential authorization failed.', {
            name: details?.name ?? 'Error',
            code: details?.code ?? 'unavailable',
          });
          throw new Error('Unable to authenticate at this time');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.organizationId = user.organizationId;
        token.avatarUrl = user.avatarUrl;
        token.organizationName = user.organizationName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.organizationId = token.organizationId;
        session.user.avatarUrl = token.avatarUrl;
        session.user.organizationName = token.organizationName;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
