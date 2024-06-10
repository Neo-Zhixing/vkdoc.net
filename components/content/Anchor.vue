<script setup lang="ts">
defineProps<{
  id: string
}>()

const ui = {
  border: {
    base: 'dark:border-primary border-primary',
  },
}
</script>

<template>
  <div :id="id" class="scroll-mt-[calc(48px+48px+var(--header-height))] lg:scroll-mt-[calc(48px+var(--header-height))]">
    <UDivider v-if="$route.hash.slice(1) === id" type="dashed" :ui="ui">
      <span class="anchor-line border-primary border-b border-dashed" />
      <span class="anchor-hint">
        <UIcon name="i-heroicons-arrow-down-solid" />
        {{ id.replaceAll('-', ' ').toUpperCase() }}
        <UIcon name="i-heroicons-arrow-down-solid" />
      </span>
      <span class="anchor-line border-primary border-b border-dashed" />
    </UDivider>
  </div>
</template>
