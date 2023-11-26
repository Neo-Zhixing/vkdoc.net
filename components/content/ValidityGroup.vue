<template>
  <div class="border border-gray-200 dark:border-gray-700 rounded-md p-4 my-4">
    <h3 v-if="name" class="mt-0">{{ name }}</h3>
    <FieldGroup>
      <ContentSlot :use="$slots.default" />
    </FieldGroup>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name?: string
}>()
</script>