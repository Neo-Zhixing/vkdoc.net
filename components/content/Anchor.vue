<template>
  <div :id="id">
    <ContentSlot :use="$slots.default" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string,
}>();
</script>