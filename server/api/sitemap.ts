import { defineEventHandler } from 'h3'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (e) => {
  const contentList = (await serverQueryContent(e).find()) as ParsedContent[]
  return contentList.map(c => {
    if (c._dir === 'man') {
      return asSitemapUrl({
        loc: `/man/${c.title}`,
        //lastmod: updatedAt
      });
    }

    return c.sitemap;
  }).filter(Boolean)
})

