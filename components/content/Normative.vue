<template>
  <span class="font-medium text-red-950	dark:text-red-200">{{ type }}</span>
</template>

<script setup lang="ts">
defineProps<{
  type: string
}>()
</script>