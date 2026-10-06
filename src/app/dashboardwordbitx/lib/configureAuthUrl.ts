const deploymentHost = process.env.VERCEL_ENV === 'production'
  ? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL
  : process.env.VERCEL_URL;
const deploymentUrl = deploymentHost ? `https://${deploymentHost}` : undefined;
const localUrlPattern = /^https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(?:\/|$)/i;

if (deploymentUrl) {
  const authUrl = process.env.NEXTAUTH_URL;
  const internalAuthUrl = process.env.NEXTAUTH_URL_INTERNAL;

  if (!authUrl || localUrlPattern.test(authUrl)) {
    process.env.NEXTAUTH_URL = deploymentUrl;
  }

  if (!internalAuthUrl || localUrlPattern.test(internalAuthUrl)) {
    process.env.NEXTAUTH_URL_INTERNAL = deploymentUrl;
  }
}
