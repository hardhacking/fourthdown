// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico'}],
    }
  },
  imports: {
    dirs: ['stores']
  },
})