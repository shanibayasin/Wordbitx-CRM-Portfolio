import NextAuth from 'next-auth';
import authOptions from '../../../../../wordbitx/lib/auth';

const handler = NextAuth(authOptions);

async function handleAuth(...args: Parameters<typeof handler>) {
  const response = await handler(...args);
  const setCookies = response.headers.getSetCookie();
  const request = args[0];
  const isSignOutRequest =
    request instanceof Request && new URL(request.url).pathname.endsWith('/api/auth/signout');

  if (!setCookies.length && !isSignOutRequest) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.delete('set-cookie');

  for (const cookie of setCookies) {
    const cookieName = cookie.slice(0, cookie.indexOf('='));
    const isSessionCookie =
      /^(?:__Secure-)?next-auth\.session-token(?:\.\d+)?$/.test(cookieName) &&
      !/^[^=]+=;/.test(cookie);
    headers.append(
      'set-cookie',
      isSessionCookie
        ? cookie.replace(/;\s*(?:expires|max-age)=[^;]*/gi, '')
        : cookie
    );
  }

  if (isSignOutRequest && request instanceof Request) {
    const sessionCookieNames = new Set(
      (request.headers.get('cookie') ?? '')
        .split(';')
        .map((cookie) => cookie.trim().split('=', 1)[0])
        .filter((name) => /^(?:__Secure-)?next-auth\.session-token(?:\.\d+)?$/.test(name))
    );

    for (const cookieName of sessionCookieNames) {
      const secure = cookieName.startsWith('__Secure-') ? '; Secure' : '';
      headers.append(
        'set-cookie',
        `${cookieName}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly; SameSite=Lax${secure}`
      );
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export { handleAuth as GET, handleAuth as POST };
