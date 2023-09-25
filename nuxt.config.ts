// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-headlessui', ['@pinia/nuxt', {autoImports: ['defnieStore', 'acceptHMRUpdate']}]],
  css: ['@/assets/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: 'ESPN Analytics',
    }
  },
  imports: {
    dirs: ['stores']
  },
  routeRules: {
    '/cbb': { redirect: '/' },
    '/viz/nfl_4th_down': { redirect: '/' },
    '/nba': { redirect: '/' },
    '/nfl': { redirect: '/' },
    '/apps': { redirect: '/' },
    '/cfb': { redirect: '/' },
    '/cfblines': { redirect: '/' },
    '/cfblines+': { redirect: '/' },
    '/nbalines': { redirect: '/' },
    '/nbalines+': { redirect: '/' },
    '/nfllines': { redirect: '/' },
    '/nfllines+': { redirect: '/' },
    '/cfb4thdown': { redirect: '/' },
    '/cfbpredictor': { redirect: '/' },
    '/livecfbepa': { redirect: '/' },
    '/livemlb': { redirect: '/' },
    '/mlbwpa': { redirect: '/' },
    '/nflfpi+': { redirect: '/' },
    '/nflpredictor': { redirect: '/' },
    '/playstation': { redirect: '/' },
    '/wnba': { redirect: '/' },
    '/soccer': { redirect: '/' },
  },
})