<template lang="pug">
UHeader
  template(#logo)
    | VulkanHub
  template(#center)
    UContentSearchButton
  template(#right)
    UColorModeButton
    UButton(to="https://github.com/Neo-Zhixing/vkdoc.net" target="_blank" icon="@dust:fa6-pro-brands:github" color="gray" variant="ghost")
  template(#panel)
    LazyDocNav
UMain
  slot
UFooter
  template(#left)
    .prose-sm.prose-grey.prose.footer-copyright(class="dark:prose-invert text-xs")
      | A redistribution of #[a(href="") Vulkan Specification] under #[a(href="https://creativecommons.org/licenses/by/4.0/") CC-BY-4.0] by #[a(href="https://github.com/Neo-Zhixing/") Neo].
      br
      | © The Khronos® Group Inc. {{ new Date().getFullYear() }}. All rights reserved.
      br
      NuxtLink(to="/copyright" no-prefetch) Copyright Notice
</template>
