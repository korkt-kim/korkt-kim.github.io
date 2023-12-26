/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      sm: { max: '1100px' },
      md: { min: '1101px' },
    },
    extend: {},
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
          '@screen lg': {
            fontSize: theme('fontSize.4xl'),
          },
        },

        '._section-desc': {
          color: theme('colors.txt3'),
          fontSize: theme('fontSize.sm'),
          marginBottom: theme('spacing.5'),
          '@screen lg': {
            fontSize: theme('fontSize.xl'),
          },
        },
      })
    }),
  ],
}
