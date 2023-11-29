<script setup lang="ts">
</script>

<template lang="pug">
UHeader
  template(#logo)
    | VulkanHub
  template(#right)
    UDocsSearchButton(:label="null")
    UColorModeButton
  template(#panel)
    LazyUDocsSearchButton
UMain
  slot
UFooter
</template>

<style scoped>
.header-icon {
  height: 1.75rem;
  width: 1.75rem;
}
</style>
