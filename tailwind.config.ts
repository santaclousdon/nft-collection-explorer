import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      xxl: '1900px',
    },
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        purple: '#AB23FF',
        blue: '#3D8BFF',
        'grey-line': '#13171D',
        'grey-text': '#46505F',
      },
      backgroundImage: {
        linear: 'linear-gradient(0deg, #3D8BFF 0%, #AB23FF 99%)',
        linearDark: 'linear-gradient(0deg, #000 0%, #3D8BFF 47%, #AB23FF 99%)',
        linearShadow:
          'linear-gradient(to bottom, black 0%, transparent 50%, black 100%)',
      },
      boxShadow: {
        inner: 'inset 0 0 30px 30px #000',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },

  plugins: [],
};
export default config;
