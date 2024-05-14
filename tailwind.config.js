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
        'Sports-Gray-60': '#6C6E6F',
        'espnred-50': 'rgba(195, 30, 50, 0.1)',
        'espnred-600': 'rgba(195,30,50, 0.9)',
        'espnred': 'rgb(195,30,50)',
        'espncyan-50': 'rgba(0, 174, 239, .1)',
        'espncyan-100': 'rgb(0, 174, 239)',
        'espncyan-200': 'rgb(0, 167, 225)',
        'espncyan-900': 'rgb(0, 100, 149)',
        'espngray-100': 'rgb(242, 242, 242)',
        'espngray-300': 'rgb(220, 220, 220)', 
        'espngray-400': 'rgb(177, 177, 177)',
        'espngray-600': 'rgb(95, 95, 95)',
        'espngray-900': 'rgb(57, 57, 57)',
        'espnblack': 'rgb(27, 36, 44)',
        'stoplight-red': '#bc544b',
        'stoplight-yellow': '#f9e076',
        'stoplight-green': '#3cb043',
      },
      screens: {
        'xxs': '385px',
        'xs': '480px',
        'temp': '705px',
        // => @media (min-width: 385px) { ... }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    rotateY,
  ],
}
