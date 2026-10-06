import type { NextConfig } from 'next';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
dotenv.config({ path: resolve(projectRoot, '.env.local') });

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
};

export default nextConfig;
