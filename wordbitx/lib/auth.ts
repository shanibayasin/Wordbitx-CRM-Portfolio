import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectToDatabase from './mongodb.ts';
import User from '../models/User.ts';
import Organization from '../models/Organization.ts';

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
          throw new Error('Please enter an email and password');
        }

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email.toLowerCase() });

          if (!user || !user.password) {
            throw new Error('No user found with this email');
          }

          const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordMatch) {
            throw new Error('Incorrect password');
          }

          const organization = await Organization.findById(user.organizationId);
          if (!organization) {
            throw new Error('The user organization could not be found');
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
          if (error instanceof Error) throw error;
          throw new Error('Authentication failed');
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
    signIn: '/dashboard/login',
    newUser: '/dashboard/register',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
