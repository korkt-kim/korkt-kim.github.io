// eslint-disable-next-line no-undef
module.exports = {
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
                  className: 'isf-icon',
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
