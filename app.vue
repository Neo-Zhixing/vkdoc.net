<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { addAPIProvider } from '@iconify/vue'
addAPIProvider('dust', {
  resources: ['https://icon.dust.rs']
})
</script>
