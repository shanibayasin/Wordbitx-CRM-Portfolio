import type { DefaultSession } from 'next-auth';
import type { Role } from './index';

declare module 'next-auth' {
  interface User {
    role?: Role;
    organizationId?: string | null;
    avatarUrl?: string | null;
    organizationName?: string;
  }

  interface Session {
    user: {
      id?: string;
      role?: Role;
      organizationId?: string | null;
      avatarUrl?: string | null;
      organizationName?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: Role;
    organizationId?: string | null;
    avatarUrl?: string | null;
    organizationName?: string;
  }
}
