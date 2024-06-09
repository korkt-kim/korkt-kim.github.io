/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const securityHeaders = [
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
]
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  swcMinify: true,
  reactStrictMode: false,
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['@zakelstorm/ui'],
  webpack(config) {
    {
      const fileLoaderRule = config.module.rules.find(rule =>
        rule.test?.test?.('.svg')
      )

      config.module.rules.push(
        { ...fileLoaderRule, test: /\.svg$/i, resourceQuery: /url/ },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                icon: true,
                svgProps: {
                  className: 'zakelstorm-icon',
                  fill: 'currentColor',
                },
              },
            },
          ],
        }
      )

      fileLoaderRule.exclude = /\.svg$/i
    }

    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
