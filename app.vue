<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <LazyUDocsSearch hide-color-mode />
  </ClientOnly>
</template>

<script setup lang="ts">
import { addAPIProvider } from '@iconify/vue'
addAPIProvider('dust', {
  resources: ['https://icon.dust.rs']
})

useHead({
  titleTemplate: '%s - vkdoc.net',
})
</script>
