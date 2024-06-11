export default async function useNavLinks() {
  const { data: index } = await useFetch<{ title: string, index: string }[]>(`https://data.vkdoc.net/chapters/index.json`)
  if (!index.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }

  const navLinks = computed(() => {
    if (!index.value) {
      return
    }
    const chapters = index.value.filter((i: any) => !i.appendix).map((i: any) => ({
      label: `${i.index}. ${i.title}`,
      to: `/chapters/${i.id}`,
      noPrefetch: true,
    }))
    const appendix = index.value.filter((i: any) => i.appendix).map((i: any) => ({
      label: `${String.fromCharCode(65 + i.index)}. ${i.title}`,
      to: `/chapters/${i.id}`,
      noPrefetch: true,
    }))
    return [{
      label: 'Vulkan Specification',
      icon: 'i-heroicons-book-open',
      children: chapters,
    },{
      label: 'Appendix',
      icon: 'i-heroicons-book-open',
      children: appendix,
    }]
  })
  return navLinks
}
