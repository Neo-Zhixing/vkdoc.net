// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  css: ['~/assets/global.css'],
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    'nuxt-simple-sitemap',
    //'@nuxtjs/web-vitals',
  ],
  site: {
    url: 'https://vkdoc.net',
  },
  sitemap: {
    sources: [
      '/api/sitemap'
    ]
  },
})
