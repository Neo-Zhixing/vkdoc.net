<script setup lang="ts">
useHead({
  titleTemplate: '%s - VulkanHub',
})

import { addAPIProvider } from '@iconify/vue'

addAPIProvider('dust', {
  resources: ['https://icon.dust.rs'],
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <DocSearch />
  </ClientOnly>
</template>

<style>
body {
  overflow-x: hidden;
  overflow-wrap: break-word;
}
</style>
