// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  css: ['~/assets/docsearch.css'],
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxtjs/sitemap',
    'nuxt-meilisearch',
    '@nuxtjs/web-vitals',
    '@vueuse/nuxt',
    '@nuxtjs/plausible',
    '@nuxtjs/algolia',
  ],
  algolia: {
    apiKey: '8a0e8ff6ce82bb377db643e2203d4cc9',
    applicationId: 'A96G3B0V8P',
    docSearch: {
      indexName: 'vknet',
    }
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  meilisearch: {
    hostUrl: 'https://search.vkdoc.net',
    searchApiKey: '3653930cde1ea048501e365b9cd24fc7df4a40248bb2ef185868468c3203ccf8',
  },
  site: {
    url: 'https://vkdoc.net',
  },
  routeRules: {
    '/chapters': { redirect: '/chapters/0' },
    '/chapters/**': { isr: true, prerender: true },
    '/man/**': { isr: true, prerender: true },
  },
  plausible: {
    apiHost: 'https://analytics.vkdoc.net'
  },
  nitro: {
    prerender: {
      routes: [
        '/',
        '/copyright'
      ],
    },
  },
})
