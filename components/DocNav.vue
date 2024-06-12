<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const config = {
  wrapper: 'space-y-3',
  accordion: {},
  links: {},
}

const { ui, attrs } = useUI('navigation.tree', undefined, config, undefined, true)
const { data: index } = await useFetch<{ title: string, index: string }[]>(`https://data.vkdoc.net/chapters/index.json`)
const { data: extensionIndex } = await useFetch<{ extension: string, author: string, specialuse?: string }[]>(`https://data.vkdoc.net/extensions/index.json`)
if (!index.value || !extensionIndex.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const chapters = computed(() => {
  if (!index.value) {
    return
  }
  const chapters = index.value.filter((i: any) => !i.appendix).map((i: any) => ({
    label: `${i.index}. ${i.title}`,
    to: `/chapters/${i.id}`,
    noPrefetch: true,
  }))
  return [{
    label: 'Vulkan Specification',
    icon: '@dust:fa6-pro-light:books',
    children: chapters,
  }]
})
const appendix = computed(() => {
  if (!index.value) {
    return
  }

  const appendix = index.value.filter((i: any) => i.appendix).map((i: any) => ({
    label: `${String.fromCharCode(65 + i.index)}. ${i.title}`,
    to: `/chapters/${i.id}`,
    noPrefetch: true,
  }))
  return [{
    label: 'Appendix',
    icon: '@dust:fa6-pro-light:paperclip',
    children: appendix,
  }]
})
const extensions = computed(() => {
  if (!extensionIndex.value) {
    return
  }
  const vendors: { [key: string]: any[] } = {}
  const specialuse: { [key: string]: any[] } = {}
  for (const extension of extensionIndex.value) {
    const vendor = extension.extension.match(/^VK_([A-Z]+)_/)![1]
    const item = {
      label: extension.extension,
      to: `/extensions/${extension.extension}`,
      noPrefetch: true,
    }
    vendors[vendor] = vendors[vendor] || []
    vendors[vendor].push(item)

    if (extension.specialuse) {
      for (const useCase of extension.specialuse.split(',')) {
        specialuse[useCase] = specialuse[useCase] || []
        specialuse[useCase].push(item)
      }
    }
  }
  const khr = vendors.KHR
  const ext = vendors.EXT
  delete vendors.KHR
  delete vendors.EXT
  return [{
    label: 'Extensions',
    icon: '@dust:fa6-pro-light:puzzle-piece',
    children: [{
      label: 'Khronos (KHR)',
      children: khr,
    }, {
      label: 'Cross-Vendor (EXT)',
      children: ext,
    }, {
      label: 'Vendor Specific',
      children: Object.entries(vendors).map((a) => {
        const icon = {
          AMDX: 'bi:amd',
          AMD: 'bi:amd',
          MSFT: 'simple-icons:microsoft',
          GOOGLE: 'mdi:google',
          GGP: 'mdi:google',
          ARM: 'simple-icons:arm',
          INTEL: 'simple-icons:intel',
          HUAWEI: 'simple-icons:huawei',
          VALVE: 'simple-icons:valve',
          SEC: 'simple-icons:samsung',
          MVK: 'simple-icons:apple',
          NN: 'simple-icons:nintendo',
          QCOM: 'simple-icons:qualcomm',
          QNX: 'simple-icons:blackberry',
          NV: 'simple-icons:nvidia',
          NVX: 'simple-icons:nvidia',
          ANDROID: 'simple-icons:android',
          KHR: '@dust:fa6-pro-solid:star',
          EXT: '@dust:fa6-pro-solid:sparkles',
        }[a[0] as string] || '@dust:fa6-pro-solid:cube'
        return {
          label: a[0],
          icon,
          children: a[1],
        }
      }),
    }, {
      label: 'Special Use',
      children: Object.entries(specialuse).map((a) => {
        const label = {
          devtools: 'Dev Tools',
          glemulation: 'OpenGL Emulation',
          d3demulation: 'Direct3D Emulation',
          debugging: 'Debugging',
          cadsupport: 'CAD Support',

        }[a[0] as string] || a[0] as string
        return {
          label,
          children: a[1],
        }
      }),
    }],
  }]
})
</script>

<template>
  <nav :class="ui.wrapper" v-bind="attrs">
    <UNavigationAccordion
      :links="chapters"
      :multiple="false"
      :default-open="($route.path.startsWith('/extensions') || $route.path === '/chapters/extensions') ? true : undefined"
      :ui="{ ...ui.accordion, links: ui.links }"
    />
    <UNavigationAccordion
      :links="appendix"
      :multiple="false"
      :default-open="($route.path.startsWith('/extensions') || $route.path === '/chapters/extensions') ? true : undefined"
      :ui="{ ...ui.accordion, links: ui.links }"
    />
    <UNavigationAccordion
      :links="extensions"
      :multiple="false"
      :default-open="!($route.path.startsWith('/extensions') || $route.path === '/chapters/extensions')"
      :ui="{ ...ui.accordion, links: ui.links }"
    />
  </nav>
</template>
