/* eslint-disable no-undef */

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

module.exports = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },

  swcMinify: true,
  reactStrictMode: false,
  images: { unoptimized: true },
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
