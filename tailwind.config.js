/* eslint-disable global-require */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'custom': ["Helvetica Neue", "Helvetica", "Arial", "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", "sans-serif"],
      },
      minWidth: {
        "full": "100%",
        "2xs": "375px",
        "xs": "414px",
        "sm": "640px",
        "md": "768px"
      }
    }
  },
  variants: {
    extend: {
      margin: ['responsive', 'hover'],
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms')
  ],
};
