<script setup lang="ts">
defineProps<{
  name: string
  type: string
}>()
</script>

<template>
  <Card :title="name" class="my-4" :to="`/man/${name}`">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </Card>
</template>
