<script setup>
useSeoMeta({
  title: 'HomePage',
  description: 'Better Vulkan Documentation starts here',
  ogTitle: 'VulkanHub',
  ogSiteName: 'VulkanHub',
  ogDescription: 'Better Vulkan Documentation starts here',
})

const colorMode = useColorMode()
const appConfig = useAppConfig()
const { data: version } = useFetch('https://data.vkdoc.net/index.json')
</script>

<template>
  <ULandingHero
    title="VulkanHub"
    description="Better Vulkan Documentation Starts Here"
    :links="[{ label: 'Start Reading', icon: '@dust:fa6-pro-regular:book', size: 'lg', to: '/chapters/introduction' }]"
  >
    <template #headline>
      <UBadge color="gray" class="mx-2">Version {{ version.version }}</UBadge>
      <UBadge color="gray" class="mx-2">Updated on {{ (new Date(version.last_changed * 1000)).toLocaleDateString() }}</UBadge>
    </template>
  </ULandingHero>
  <ULandingSection title="Our Features">
    <ULandingGrid>
      <ULandingCard class="col-span-6 row-span-2" icon="@dust:fa6-pro-regular:magnifying-glass" title="Efficient Search" description="Efficiently search the Vulkan Specification with function names, extensions, validation codes, and more" />
      <ULandingCard class="col-span-6 row-span-4" icon="@dust:fa6-pro-regular:circle-up" title="Latest Updates" description="Stay up to date with the latest Vulkan Extensions" />
      <ULandingCard class="col-span-6 row-span-4" :icon="colorMode.value === 'dark' ? appConfig.ui.icons.dark : appConfig.ui.icons.light" title="Light/Dark Mode" :description="(colorMode.value === 'dark' ? 'Dark' : 'Light') + ' mode is the best mode!'" />
      <ULandingCard class="col-span-6 row-span-2" icon="@dust:fa6-pro-regular:globe" title="Web-first Documentation" description="Customized conversion from AsciiDoc ensures the best reading experience on the web" />
    </ULandingGrid>
  </ULandingSection>
</template>

<style>
.docbody {
  overflow-x: hidden;
  overflow-wrap: anywhere;
}
.docbody .refpage-header-container {
  margin-left: 1px;
  margin-right: 1px;
}
</style>