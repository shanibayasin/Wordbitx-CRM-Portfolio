import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectToDatabase from './mongodb.ts';
import User from '../models/User.ts';
import Organization from '../models/Organization.ts';

export type AuthenticatedSessionUser = {
  id: string;
  email?: string | null;
  name?: string | null;
  role?: string;
  organizationId?: string;
  organizationName?: string;
};

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
  const user = session?.user;

  if (!user?.id || !user.organizationId) {
    return null;
  }

  return {
    id: user.id,
    email: user.email ?? null,
    name: user.name ?? null,
    role: user.role ?? undefined,
    organizationId: user.organizationId,
    organizationName: user.organizationName ?? undefined,
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

export function canManageLeads(role?: string) {
  return role === 'ADMIN' || role === 'SALES' || role === 'AGENT';
}

export function canViewLeads(role?: string) {
  return Boolean(role && ['ADMIN', 'SALES', 'SUPPORT', 'AGENT'].includes(role));
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
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

          const organization = await Organization.findById(user.organizationId);
          if (!organization) {
            throw new Error('Unable to authenticate at this time');
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId.toString(),
            avatarUrl: user.avatarUrl || null,
            organizationName: organization.name,
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
