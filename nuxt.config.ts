// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  generate: {
    routes: ['/game/0', '/game/1', '/game/2', '/game/3', '/game/4', '/game/5', '/game/6', '/game/7', 
             '/game/8', '/game/9', '/game/10', '/game/11', '/game/12', '/game/13', '/game/14', '/game/15', 
             '/cbb', '/nfldecision', '/nflrtm', '/nba', '/nfl', '/apps', '/cfb', '/cfblines', '/cfblines+', 
             '/nbalines', '/nbalines+', '/nfllines', '/nfllines+', '/cfb4thdown', '/cfbpredictor', 
             '/livecfbepa', '/livemlb', '/mlbwpa', '/nflfpi+', '/nflpredictor', '/playstation', '/wnba', '/soccer', 
             '/nfl-sim', '/nfl-draft', '/mcbb', '/wcbb', '/mcbb-title', '/wcbb-title', '/mcbb-games', '/mcbb-games',
             '/wcbb-all', '/mcbb-all', '/event/0', '/event/1', '/event/2', '/event/3', '/event/4', 
             '/event/5', '/event/6', '/event/7', '/event/8', '/event/9', '/event/10', '/event/11', 
             '/event/12', '/event/13', '/event/14', '/event/15', '/event/16', '/event/17', '/event/18', 
             '/event/19', '/event/20', '/event/21', '/event/22', '/event/23', '/event/24', '/event/25', 
             '/event/26', '/event/27', '/event/28', '/event/29', '/event/30', '/event/31', '/event/32', 
             '/event/33', '/event/34', '/event/35', '/event/36', '/event/37', '/event/38', '/event/39', 
             '/event/40', '/event/41', '/event/42', '/event/43', '/event/44', '/event/45', '/event/46', 
             '/event/47', '/event/48', '/event/49', '/event/50', '/event/51', '/event/52', '/event/53', 
             '/event/54', '/event/55', '/event/56', '/event/57', '/event/58', '/event/59', '/event/60', 
             '/event/61', '/event/62', '/event/63', '/event/64', '/event/65', '/event/66', '/event/67', 
             '/event/68', '/event/69', '/event/70', '/event/71', '/event/72', '/event/73', '/event/74', ]
  },
  ssr: false,
  devtools: { enabled: true },
  modules: [
    ['nuxt-gtag', {id: 'G-W0Q1L3P863'}],
    'nuxt-headlessui', 
    ['@pinia/nuxt', {autoImports: ['defineStore', 'acceptHMRUpdate']}]
  ],
  devServerHandlers: [],
  css: ['@/assets/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/aws-sdk/2.1329.0/aws-sdk.min.js',
          // Other attributes like async, defer, etc., if needed
        },
      ],
      meta: [
        {
          hid: 'description', 
          name: 'description', 
          content: 'Models and data visualization from ESPN Analytics! 4th down decisions, receiver tracking metrics and more.'
        }, 
        {
          hid: 'twitter:card', 
          name: 'twitter:card', 
          content: 'summary_large_image'
        }, 
        {
          hid: 'twitter:site', 
          name: 'twitter:site', 
          content: '@nuxt_js'
        },
        {
          hid: 'twitter:url', 
          name: 'twitter:url',
          content: 'https://espnanalytics.com/'
        }, 
        {
          hid: 'twitter:title',
          name: 'twitter:title', 
          content: 'ESPN Analytics'
        }, 
        {
          hid: 'twitter:description',
          name: 'twitter:description', 
          content: 'Models and data visualization from ESPN Analytics! 4th down decisions, receiver tracking metrics and more.'
        }, 
        {
          hid: 'twitter:image', 
          name: 'twitter:image', 
          content: 'assets/logo.png'
        }, 
        {
          hid: 'og:site_name', 
          property: 'og:site_name', 
          content: 'ESPN Analytics'
        }, 
        {
          hid: 'og:type', 
          property: 'og:type', 
          content: 'website'
        }, 
        {
          hid: 'og:url', 
          property: 'og:url', 
          content: 'https://espnanalytics.com/'
        }, 
        {
          hid: 'og:title',
          property: 'og:title', 
          content: 'ESPN Analytics'
        }, 
        {
          hid: 'og:description', 
          property: 'og:description', 
          content: 'Models and data visualization from ESPN Analytics! 4th down decisions, receiver tracking metrics and more.'
        }, 
        {
          hid: 'og:image', 
          property: 'og:image', 
          content: 'assets/logo.png'
        }, 
        {
          hid: 'og:image:secure_url', 
          property: 'og:image:secure_url', 
          content: 'assets/logo.png'
        }, 
        {
          hid: 'og:image:alt', 
          property: 'og:image:alt', 
          content: 'ESPN Analytics'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico'}],
    }
  },
  imports: {
    dirs: ['stores']
  },
  routeRules: {
    '/cbb': { redirect: '/decision' },
    '/nfldecision': { redirect: '/decision' },
    '/nflrtm': { redirect: '/decision' },
    '/nba': { redirect: '/decision' },
    '/nfl': { redirect: '/decision' },
    '/apps': { redirect: '/decision' },
    '/cfb': { redirect: '/decision' },
    '/cfblines': { redirect: '/decision' },
    '/cfblines+': { redirect: '/decision' },
    '/nbalines': { redirect: '/decision' },
    '/nbalines+': { redirect: '/decision' },
    '/nfllines': { redirect: '/decision' },
    '/nfllines+': { redirect: '/decision' },
    '/cfb4thdown': { redirect: '/decision' },
    '/cfbpredictor': { redirect: '/decision' },
    '/livecfbepa': { redirect: '/decision' },
    '/livemlb': { redirect: '/decision' },
    '/mlbwpa': { redirect: '/decision' },
    '/nflfpi+': { redirect: '/decision' },
    '/nflpredictor': { redirect: '/decision' },
    '/playstation': { redirect: '/decision' },
    '/wnba': { redirect: '/decision' },
    '/soccer': { redirect: '/decision' },
    '/nfl-sim': { redirect: '/decision' },
    '/nfl-draft': { redirect: '/decision' },
    '/mcbb': { redirect: '/decision' },
    '/wcbb': { redirect: '/decision' },
    '/mcbb-title': { redirect: '/decision' },
    '/wcbb-title': { redirect: '/decision' },
    '/mcbb-games': { redirect: '/decision' },
    '/wcbb-games': { redirect: '/decision' },
    '/mcbb-all': { redirect: '/decision' },
    '/wcbb-all': { redirect: '/decision' }
  },
})