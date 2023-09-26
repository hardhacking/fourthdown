// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
})