// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  generate: {
    routes: ['/game/0', '/game/1', '/game/2', '/game/3', '/game/4', '/game/5', '/game/6', '/game/7', 
             '/game/8', '/game/9', '/game/10', '/game/11', '/game/12', '/game/13', '/game/14', '/game/15', 
             '/cbb', '/nfldecision', '/nflrtm', '/nba', '/nfl', '/apps', '/cfb', '/cfblines', '/cfblines+', 
             '/nbalines', '/nbalines+', '/nfllines', '/nfllines+', '/cfb4thdown', '/cfbpredictor', 
             '/livecfbepa', '/livemlb', '/mlbwpa', '/nflfpi+', '/nflpredictor', '/playstation', '/wnba', '/soccer', 
             '/nfl-sim', '/nfl-draft', '/mcbb', '/wcbb', '/mcbb-title', '/wcbb-title', '/mcbb-games', '/mcbb-games',
             '/wcbb-all', '/mcbb-all']
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
    '/': { redirect: '/decision'},
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