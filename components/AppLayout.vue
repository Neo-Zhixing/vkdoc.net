<template lang="pug">
UHeader
  template(#logo)
    | Vulkan Docs
  template(#right)
    UDocsSearchButton(:label="null")
    UColorModeButton
  template(#panel)
    LazyUDocsSearchButton
UMain
  slot
UFooter
</template>

<script setup lang="ts">
</script>

<style scoped>
.header-icon {
  height: 1.75rem;
  width: 1.75rem;
}
</style>
