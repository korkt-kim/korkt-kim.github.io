/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) }
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) }
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) }

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: { max: '1100px' },
      md: { min: '1101px' },
    },
    extend: {
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_200,
      minHeight: px0_200,
      spacing: px0_200,
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

        '._section-title': {
          fontSize: theme('fontSize.3xl'),
          fontWeight: theme('fontWeight.bold'),
          marginBottom: theme('spacing.5'),
          '@screen md': {
            fontSize: theme('fontSize.4xl'),
          },
        },

        '._section-desc': {
          color: theme('colors.txt3'),
          fontSize: theme('fontSize.sm'),
          marginBottom: theme('spacing.5'),
          '@screen md': {
            fontSize: theme('fontSize.xl'),
          },
        },
      })
    }),
  ],
}
