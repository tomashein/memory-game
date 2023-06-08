import tailwindcssForms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      display: ['Rubik', 'sans-serif'],
      body: ['Nunito', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [tailwindcssForms],
};
