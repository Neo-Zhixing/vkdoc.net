// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  css: ['~/assets/global.css'],
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    'nuxt-simple-sitemap',
    'nuxt-meilisearch',
    //'@nuxtjs/web-vitals',
  ],
  meilisearch: {
    hostUrl:  'https://search.vkdoc.net',
    searchApiKey: '3653930cde1ea048501e365b9cd24fc7df4a40248bb2ef185868468c3203ccf8',
  },
  site: {
    url: 'https://vkdoc.net',
  },
  nitro: {
    prerender: {
      routes: [
        '/'
      ]
    }
  }
})
