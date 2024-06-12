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
</script>

<template lang="pug">
UContainer
  UPage(:ui="uiPage")
    template(#left)
      UAside
        DocNav
    UPageBody(prose)
      ContentRenderer(v-if="page?.body" :value="page")
    template(#right)
      UContentToc(v-if="page?.body?.toc?.links?.length" :links="page.body.toc.links")
        template(#bottom)
          Field(name="Type") {{page.type === 'device' ? 'Device Extension' : 'Instance Extension'}}
          Field(name="Registered Extension Number") {{ page.number }}
          Field(name="Promoted To" v-if="page.promotedto")
            NuxtLink.underline(:to="'/extensions/' + page.promotedto") {{ page.promotedto }}
          Field(name="Deprecated By" v-if="page.deprecatedby")
            NuxtLink.underline(:to="'/extensions/' + page.deprecatedby") {{ page.deprecatedby }}
          Field(name="Obsoletedby By" v-if="page.obsoletedby")
            NuxtLink.underline(:to="'/extensions/' + page.obsoletedby") {{ page.obsoletedby }}
          Field(name="Status")
            UBadge.mr-2(:color="page.ratified ? 'green' : 'orange'") {{ page.ratified ? 'Ratified' : 'Not Ratified' }}
            NuxtLink.mr-2(to="/boilerplate#boilerplate-provisional-header")
              UBadge(v-if="page.provisional" color="red" ) Provisional
            NuxtLink.mr-2(:to="`/extensions/${page.extension}/proposal`")
              UBadge(v-if="page.proposal" color="blue" ) Proposal Available
</template>
