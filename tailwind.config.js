/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

// Rotate X utilities
const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-90': {
      transform: 'rotateY(90deg)',
    },
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
  })
})

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'espn-red': 'rgb(195,30,50)'
      }, 
      screens: {
        'xs': '385px',
        // => @media (min-width: 385px) { ... }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    rotateY,
  ],
}
