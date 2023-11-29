<script setup lang="ts">
defineProps<{
  name?: string
}>()
</script>

<template>
  <div class="border border-gray-200 dark:border-gray-700 rounded-md p-4 my-4 validity-box">
    <ContentSlot :use="$slots.default" />
  </div>
</template>

<style>
.validity-box > h3:first-child {
  margin-top: 0;
}
.validity-box > :last-child {
  margin-bottom: 0;
}
</style>
