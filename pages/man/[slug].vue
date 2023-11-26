<template lang="pug">
UContainer
  UPage
    UPageHeader(:headline="headline" :title="page.title" :description="page.description" :class="{ 'border-b-0': attributes.length > 0 }")
    div(class="relative flex border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden not-prose" v-if="attributes.length > 0")
        div(v-for="attrib in attributes" :key="attrib.id" class="flex flex-col gap-0.5 justify-between py-1.5 font-medium bg-gray-50 dark:bg-gray-800 border-r border-r-gray-200 dark:border-r-gray-700")
          label(class="block text-xs px-2.5 font-medium text-gray-400 dark:text-gray-500 -my-px") {{ attrib.title }}
          span(class="mx-2.5") {{ attrib.values }}
    UPageBody(prose)
      ContentRenderer(v-if="page.body" :value="page")
</template>

<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryContent(route.path.toLowerCase()).findOne());
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}
// ensure correct capitalization in path
if (page.value._file && (route.path !== '/' + page.value._file.slice(0, -3))) {
  navigateTo({
    path: '/' + page.value._file.slice(0, -3)
  })
}

const headline = computed(() => {
  const ty: string = page.value?.type;
  if (ty) {
    const name = {
      handles: 'Handle',
      protos: 'Function Prototype',
      structs: 'Structures',
      enums: 'Enum',
      flags: 'Flags',
      defines: 'Macro',
      feature: 'Feature',
      freeform: 'Manual'
    }[ty];
    if (name) {
      return name;
    }
  }
  return ty || 'Manual'
})

type Attribute = {
  id: string,
  title: string,
  values: string
}
const attributes: Attribute[] = computed(() => {
  const v: Attribute[] = [];
  if (!page.value) {
    return v;
  }
  if (page.value.cmd_buf_level) {
    v.push({
      id: 'cmd_buf_level',
      title: 'Command Buffer Level',
      values: page.value.cmd_buf_level.join(' / '),
    })
  }
  if (page.value.render_pass_scope) {
    v.push({
      id: 'render_pass_scope',
      title: 'Render Pass Scope',
      values: page.value.render_pass_scope,
    })
  }
  if (page.value.video_coding_scope) {
    v.push({
      id: 'video_coding_scope',
      title: 'Video Coding Scope',
      values: page.value.video_coding_scope,
    })
  }
  if (page.value.supported_queue_types) {
    v.push({
      id: 'supported_queue_types',
      title: 'Queue Types',
      values: page.value.supported_queue_types.join(' / '),
    })
  }
  if (page.value.tasks) {
    v.push({
      id: 'tasks',
      title: 'Tasks',
      values: page.value.tasks.join(' / '),
    })
  }
  return v
})

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  ogTitle: page.value.title,
  ogDescription: page.value.description,
})
</script>

