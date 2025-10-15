/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的出力にする（Firebase Hosting用）
  output: 'export',

  // 画像最適化を無効化（Next Imageが使えないため）
  images: {
    unoptimized: true,
  },

  // 型エラーでビルドを止めない
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
