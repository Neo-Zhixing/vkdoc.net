export default async function useNavLinks(){
  const { data: index } = await useFetch<{ title: string, index: string }[]>(`https://data.vkdoc.net/chapters/index.json`)
  if (!index.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  const navLinks = computed(() => {
    if (!index.value) {
      return
    }
    const specs = index.value.map((i: any) => ({
      label: `${i.index}. ${i.title}`,
      to: `/chapters/${i.index}`,
    }))
    return [{
      label: 'Vulkan Specification',
      icon: 'i-heroicons-book-open',
      children: specs,
    }]
  });
  return navLinks
}
