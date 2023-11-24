// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  css: ['~/assets/global.css'],
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    //'@nuxtjs/web-vitals',
    //'@nuxthq/studio',
  ],
  content: {
    highlight: {
      preload: [
        'rust',
        'glsl'
      ]
    }
  },
})
