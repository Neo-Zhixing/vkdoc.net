<script setup lang="ts">
const wrapperStyle = 'note pl-4 pr-6 py-4 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm/6 my-5 font-normal prose-code:bg-white dark:prose-code:bg-gray-900'
const iconStyle = 'note-icon w-4 h-4 mr-2 mt-1 text-[--color-light] dark:text-[--color-dark]'
</script>

<template>
  <div :class="wrapperStyle">
    <UIcon :class="iconStyle" name="@dust:fa6-pro-solid:info" />
    <div class="note-content">
      <ContentSlot :use="$slots.default" />
    </div>
  </div>
</template>

<style>
.note {
  display: flex;
}
.note-icon {
  flex-shrink: 0;
}
.note-content {
  :first-child {
    margin-top: 0;
  }
  :last-child {
    margin-bottom: 0;
  }
}
</style>
