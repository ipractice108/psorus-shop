/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: false,
  },
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru',
  },
}

module.exports = nextConfig
