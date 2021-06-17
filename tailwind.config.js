/* eslint-disable global-require */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      margin: ['responsive', 'hover'],
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
};
