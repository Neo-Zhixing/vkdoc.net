<script setup lang="ts">
const props = defineProps<{
  name: string
  type: string
}>();

const normalizedName = computed(() => {
  return props.name.replaceAll('\\_', '_');
})
</script>

<template>
  <Card :title="normalizedName" class="my-4" :to="`/man/${normalizedName}`">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </Card>
</template>
