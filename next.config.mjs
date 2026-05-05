import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  ...(process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true' && {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/system-design-notes',
    images: { unoptimized: true },
    trailingSlash: true,
  }),
};

export default withMDX(config);