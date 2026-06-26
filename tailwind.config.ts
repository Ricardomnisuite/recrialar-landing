import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50:  '#FDFAF5',
          100: '#F8F5EF',
          200: '#EDE7DC',
          300: '#E7DCCF',
          400: '#CFC0A8',
          500: '#B5A08A',
        },
        ink: {
          DEFAULT: '#171412',
          soft:    '#2B2622',
          muted:   '#6B6459',
          subtle:  '#3D3830',
        },
        brass: {
          DEFAULT: '#B7925A',
          light:   '#CBA978',
          dark:    '#8E6E3D',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
    },
  },
  plugins: [],
};

export default config;
