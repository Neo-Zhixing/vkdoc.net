<template lang="pug">
UHeader
  template(#logo)
    Icon(name="@dust:fa6-pro-duotone:block-question").header-icon
    | Dust Engine
  template(#right)
    UDocsSearchButton(:label="null")
    UColorModeButton
    UButton(to="https://github.com/dust-engine/dust" target="_blank" icon="@dust:fa6-pro-brands:github" color="gray" variant="ghost")
    UButton(to="https://discord.com/invite/7R26SXn8CT" target="_blank" icon="@dust:fa6-pro-brands:discord" color="gray" variant="ghost")
  template(#panel)
    LazyUDocsSearchButton
UMain
  slot
UFooter
  template(#right)
    UButton(to="https://github.com/dust-engine/dust" target="_blank" icon="@dust:fa6-pro-brands:github" color="gray" variant="ghost")
    UButton(to="https://discord.com/invite/7R26SXn8CT" target="_blank" icon="@dust:fa6-pro-brands:discord" color="gray" variant="ghost")
</template>

<script setup lang="ts">
</script>

<style scoped>
.header-icon {
  height: 1.75rem;
  width: 1.75rem;
}
</style>
