<template lang="pug">
UContainer
  UPage
    template(#left)
      UAside
    UPageHeader(:headline="headline" :title="page.title" :description="page.description")
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

</script>

