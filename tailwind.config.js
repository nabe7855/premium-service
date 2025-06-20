/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // すべてのファイルを対象に
  ],
  theme: {
    extend: {
      colors: {
        strawberry: {
          primary: '#FF66A3',
          bg: '#FFF0F5',
          text: '#FF1493',
        },
      },
      typography: (theme) => ({
        pink: {
          css: {
            '--tw-prose-body': theme('colors.pink.700'),
            '--tw-prose-headings': theme('colors.pink.800'),
            '--tw-prose-lead': theme('colors.pink.600'),
            '--tw-prose-links': theme('colors.pink.500'),
            '--tw-prose-bold': theme('colors.pink.900'),
            '--tw-prose-counters': theme('colors.pink.500'),
            '--tw-prose-bullets': theme('colors.pink.300'),
            '--tw-prose-hr': theme('colors.pink.200'),
            '--tw-prose-quotes': theme('colors.pink.600'),
            '--tw-prose-quote-borders': theme('colors.pink.300'),
            '--tw-prose-captions': theme('colors.pink.400'),
            '--tw-prose-code': theme('colors.pink.800'),
            '--tw-prose-pre-code': theme('colors.pink.100'),
            '--tw-prose-pre-bg': theme('colors.pink.900'),
            '--tw-prose-th-borders': theme('colors.pink.300'),
            '--tw-prose-td-borders': theme('colors.pink.200'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
