<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const route = useRoute()
const { data: page } = await useFetch<ParsedContent>(`https://data.vkdoc.net/extensions/${route.params.slug}.json`)
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  ogSiteName: 'VulkanHub',
  ogType: 'article',
})

const uiPage = {
  wrapper: 'lg:grid-cols-12',
  left: 'lg:col-span-3',
  center: {
    narrow: 'lg:col-span-6',
    base: 'lg:col-span-8',
    full: 'lg:col-span-10',
  },
  right: 'lg:col-span-3',
}

const contacts = computed(() => {
  const contacts = page.value?.contact?.split(',') || [];
  return contacts.map((contact: string) => {
    const contactWords = contact.trim().split(' ')
    const name = contactWords.slice(0, -1).join(' ')
    let handle = contactWords[contactWords.length - 1]
    let icon = '@dust:fa6-pro-solid:user'
    let link = null
    if (handle.startsWith('gitlab:@')) {
      icon = '@dust:fa6-pro-brands:gitlab'
      handle = handle.replace('gitlab:', '')
    } else if (handle.startsWith('@')) {
      icon = '@dust:fa6-pro-brands:github'
      const issuePlaceholderText = `[${page.value?.extension}] ${handle} %0A*Here describe the issue or question you have about the ${page.value?.extension} extension*`
      link = `https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=${issuePlaceholderText}`
    }
    return {
      icon,
      name,
      link,
      handle
    }
  })
})

function promotionStatusToURL(promotion: string) {
  if (promotion.startsWith('VK_VERSION')) {
    return '/man/' + promotion
  }
  return '/extensions/' + promotion
}
</script>

<template lang="pug">
UContainer
  UPage(:ui="uiPage")
    template(#left)
      UAside
        DocNav
    UPageBody(prose).docbody
      ContentRenderer(v-if="page?.body" :value="page")
    template(#right)
      UContentToc(v-if="page" :links="page.body.toc.links")
        template(#bottom)
          Field(name="Type") {{page.type === 'device' ? 'Device Extension' : 'Instance Extension'}}
          Field(name="Registered Extension Number") {{ page.number }}
          Field(name="Promoted To" v-if="page.promotedto")
            NuxtLink.underline(:to="promotionStatusToURL(page.promotedto)") {{ page.promotedto }}
          Field(name="Deprecated By" v-if="page.deprecatedby")
            NuxtLink.underline(:to="promotionStatusToURL(page.deprecatedby)") {{ page.deprecatedby }}
          Field(name="Obsoletedby By" v-if="page.obsoletedby")
            NuxtLink.underline(:to="promotionStatusToURL(page.obsoletedby)") {{ page.obsoletedby }}
          Field(name="Status")
            NuxtLink.mr-1(to="/chapters/introduction#introduction-ratified")
              UBadge(:color="page.ratified ? 'green' : 'orange'") {{ page.ratified ? 'Ratified' : 'Not Ratified' }}
            NuxtLink.mr-1(to="/chapters/boilerplate#boilerplate-provisional-header")
              UBadge(v-if="page.provisional" color="red" ) Provisional
            NuxtLink.mr-1(to="/chapters/extendingvulkan#extendingvulkan-compatibility-promotion")
              UBadge(v-if="page.promotedto" color="teal" ) Promoted
            NuxtLink.mr-1(to="/chapters/extendingvulkan#extendingvulkan-compatibility-deprecation")
              UBadge(v-if="page.deprecatedby" color="purple" ) Deprecated
            NuxtLink.mr-1(to="/chapters/extendingvulkan#extendingvulkan-compatibility-obsoletion")
              UBadge(v-if="page.obsoletedby" color="purple" ) Obsoleted
            NuxtLink.mr-1(:to="`/extensions/${page.extension}/proposal`" v-if="page.proposal" )
              UBadge(color="blue") Proposal Available
          Field(name="Contacts")
            ul
              li.flex.items-center(v-for="contact in contacts" :key="contact.handle")
                UIcon.mr-2(:name="contact.icon" v-if="contact.icon")
                a(:href="contact.link" target="_blank" v-if="contact.link") {{ contact.name }}
                template(v-else) {{ contact.name }} ({{ contact.handle }})
</template>
