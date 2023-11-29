<template>
  <Card :title="name" class="my-4" :to="'/man/' + name">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </Card>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string,
  type: string
}>();
</script>
