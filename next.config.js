// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    // 型エラーがあってもビルドを止めない
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
