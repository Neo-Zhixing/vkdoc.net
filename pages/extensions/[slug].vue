<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const route = useRoute()
const { data: page } = await useFetch<ParsedContent>(`https://data.vkdoc.net/extensions/${route.params.slug}.json`)
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  ogSiteName: 'VulkanHub',
  ogType: 'article',
})

const uiPage = {
  wrapper: 'lg:grid-cols-12',
  left: 'lg:col-span-3',
  center: {
    narrow: 'lg:col-span-7',
    base: 'lg:col-span-9',
    full: 'lg:col-span-11',
  },
  right: 'lg:col-span-2',
}
</script>

<template lang="pug">
UContainer
  UPage(:ui="uiPage")
    template(#left)
      UAside
        DocNav
    UPageBody(prose)
      h1 Extension Metadata
      ContentRenderer(v-if="page?.body" :value="page")
    template(v-if="page?.body?.toc?.links?.length" #right)
      UContentToc(:links="page.body.toc.links")
</template>
