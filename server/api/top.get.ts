interface Result {
  page: string,
  visitors: number,
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { results } = await $fetch< { results: Result[] } >('https://analytics.vkdoc.net/api/v1/stats/breakdown', {
    headers: {
      Authorization: `Bearer ${config.plausibleToken}`
    },
    query: {
      site_id: 'vkdoc.net',
      period: '7d',
      property: 'event:page',
      limit: 100,
      filters: 'event:page==/man/*'
    }
  });
  setResponseHeader(event, 'Cache-Control', 'public, max-age=86400');
  return results
})
