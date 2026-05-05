import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  ...(process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true' && {
    output: 'export',
    basePath: '',
    images: { unoptimized: true },
    trailingSlash: true,
  }),
};

export default withMDX(config);