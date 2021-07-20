const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: ['_site/**/*.html'],
  },
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      gray: colors.gray,
      primary: colors.sky,
    },
    fontFamily: {
      'sans': ['Inter', 'sans-serif']
    }
  },
  variants: {},
  plugins: [],
}