<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>

<template>
  <div :id="id">
    <ContentSlot :use="$slots.default" />
  </div>
</template>
