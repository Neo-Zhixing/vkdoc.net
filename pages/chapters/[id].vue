<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const route = useRoute()
const { data: page } = await useFetch<ParsedContent>(`https://data.vkdoc.net/chapters/${route.params.id}.json`)
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const navLinks = await useNavLinks();

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  ogTitle: page.value.title,
  ogDescription: page.value.description,
})
</script>

<template lang="pug">
UContainer
  UPage
    template(#left)
      UAside
        UNavigationTree(:links="navLinks" :default-open="false" :multiple="false")
    UPageBody(prose)
      ContentRenderer(v-if="page.body" :value="page")
    template(v-if="page.body?.toc?.links?.length" #right)
      UDocsToc(:links="page.body.toc.links")
</template>
