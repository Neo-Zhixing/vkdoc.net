<script setup lang="ts">
const navLinks = await useNavLinks();
</script>

<template lang="pug">
UHeader
  template(#logo)
    | VulkanHub
  template(#center)
    UDocsSearchButton
  template(#right)
    UColorModeButton
    UButton(to="https://github.com/Neo-Zhixing/vkdoc.net" target="_blank" icon="i-simple-icons-github" color="gray" variant="ghost")
  template(#panel)
    LazyUNavigationTree(:multiple="false" :links="navLinks")
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
