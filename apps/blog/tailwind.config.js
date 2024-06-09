/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const { withUI } = require('../../packages/ui/util/withUI')
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) }
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) }
const px0_1000 = { ...Array.from(Array(1001)).map((_, i) => `${i}px`) }

module.exports = withUI({
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './templates/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@zakelstorm/ui/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@zakelstorm/ui/hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: { max: '1100px' },
      md: { min: '1101px' },
    },
    extend: {
      background: 'hsl(var(--background))',
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_1000,
      minHeight: px0_1000,
      spacing: px0_1000,
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '._cont': {
          margin: '0 auto',
          maxWidth: theme('screens.sm'),
          '@screen md': {
            maxWidth: theme('screens.md.min'),
          },
        },
      })
    }),
  ],
})
