import tailwindcssAnimated from 'tailwindcss-animated';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Rubik', 'sans-serif'],
      body: ['Nunito', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: colors.orange,
      },
      screens: {
        lg: '927px',
      },
    },
  },
  plugins: [tailwindcssAnimated],
};
