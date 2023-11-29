<script setup lang="ts">
import { addAPIProvider } from '@iconify/vue'

addAPIProvider('dust', {
  resources: ['https://icon.dust.rs'],
})

useHead({
  titleTemplate: '%s - VulkanHub',
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
