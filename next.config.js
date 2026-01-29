/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Desactivar Turbopack temporalmente para evitar crashes
  experimental: {
    turbo: undefined,
  },
}

module.exports = nextConfig
