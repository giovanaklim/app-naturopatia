/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
    screens: {
      sm: '600px',
      // => @media (min-width: 640px) { ... }

      md: '960px',
      // => @media (min-width: 768px) { ... }

      lg: '1264px',
      // => @media (min-width: 1024px) { ... }

      xl: '1686px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
