/* eslint-disable global-require */
module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}',
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
      },
      maxWidth: {
        '1/4': '25%',
        '1/3': '33.3%',
        '2/5': '40%',
        '1/2': '50%',
        '3/5': '60%',
        '3/4': '75%',
        '4/5': '80%',
        '5/6': '83.33%',
        '11/12': '91.67%'
      }
    }
  },
  variants: {
    extend: {
      margin: ['responsive', 'hover'],
    }
  },
  plugins: [
    // A plugin that provides utilities for visually truncating text after a fixed number of lines.
    require('@tailwindcss/line-clamp'),
    // Change Default forms to TailwindCSS Style. Web and Android except iOS support Tailwind (08/29/2021). But use iOS's default forms even uglier.
    require('@tailwindcss/forms')
  ],
};
