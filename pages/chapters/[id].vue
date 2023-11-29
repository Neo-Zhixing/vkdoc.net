<template lang="pug">
UContainer
  UPage
    template(#left)
      UAside
        UNavigationTree(:links="navLinks" default-open :multiple="false")
    UPageBody(prose)
      ContentRenderer(v-if="page.body" :value="page")
</template>


<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';

const route = useRoute()
const { data: page } = await useFetch<ParsedContent>(`https://data.vkdoc.net/chapters/${route.params.id}.json`);
const { data: index } = await useFetch<{ title: string, index: string }[]>(`https://data.vkdoc.net/chapters/index.json`);
if (!page.value || !index.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}
const navLinks = computed(() => {
  if (!index.value) {
    return 
  }
  const specs =  index.value.map((i: any) => ({
    label: i.title,
    to: '/chapters/' + i.index,
  }));
  return [{
    label: 'Vulkan Specification',
    icon: 'i-heroicons-book-open',
    to: '/chapters',
    children: specs
  }]
})

</script>