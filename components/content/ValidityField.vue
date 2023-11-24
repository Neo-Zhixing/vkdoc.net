<template lang="pug">
.mt-5.text-sm
  .font-semibold.font-mono {{ name }}
  slot
</template>

<script setup lang="ts">
defineProps<{
  name?: string
}>()
</script>
