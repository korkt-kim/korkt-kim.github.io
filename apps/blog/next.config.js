/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const { withSentryConfig } = require('@sentry/nextjs')

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

module.exports =
  process.env.NODE_ENV !== 'production'
    ? withSentryConfig(withBundleAnalyzer(nextConfig), {
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin#options

        org: 'zakelstorm-blog',
        project: 'blog-frontend',

        authToken: process.env.SENTRY_AUTH_TOKEN,

        // Only print logs for uploading source maps in CI
        silent: !process.env.CI,

        // For all available options, see:
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,

        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true,
      })
    : withBundleAnalyzer(nextConfig)
