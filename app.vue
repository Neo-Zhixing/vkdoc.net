<script setup lang="ts">
import { addAPIProvider } from '@iconify/vue'

useHead({
  titleTemplate: '%s - VulkanHub',
})

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
