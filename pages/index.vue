<script setup>
useSeoMeta({
  title: 'HomePage',
  description: 'Better Vulkan Documetation starts here',
  ogTitle: 'VulkanHub',
  ogSiteName: 'VulkanHub',
  ogDescription: 'Better Vulkan Documetation starts here',
})
</script>

<template>
  <ULandingHero
    title="VulkanHub"
    description="Better Vulkan Documentation starts here"
    :links="[{ label: 'Start Reading', icon: '@dust:fa6-pro-regular:book', size: 'lg', to: '/chapters/introduction' }]"
  />
  <ULandingSection title="Our Features">
    <ULandingGrid>
      <ULandingCard class="col-span-6 row-span-2" icon="@dust:fa6-pro-regular:magnifying-glass" title="Efficient Search" description="Efficiently search the Vulkan Specification with MeiliSearch" />
      <ULandingCard class="col-span-6 row-span-4" icon="@dust:fa6-pro-regular:circle-up" title="Latest Updates" description="Stay up to date with the latest Vulkan Extensions" />
      <ULandingCard class="col-span-6 row-span-4" icon="@dust:fa6-pro-regular:wifi-slash" title="Offline Docs" description="TODO" />
      <ULandingCard class="col-span-6 row-span-2" icon="@dust:fa6-pro-regular:globe" title="Web-first Documentation" description="Customized conversion from AsciiDoc ensures the best reading experience on the web" />
    </ULandingGrid>
  </ULandingSection>
</template>
