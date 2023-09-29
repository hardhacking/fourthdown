// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  generate: {
    routes: ['game/0', 'game/1', 'game/2', 'game/3', 'game/4', 'game/5', 'game/6', 'game/7', 
             'game/8', 'game/9', 'game/10', 'game/11', 'game/12', 'game/13', 'game/14', 'game/15']
  },
  ssr: false,
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