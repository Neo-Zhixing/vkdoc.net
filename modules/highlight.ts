import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  async setup(_, nuxt) {
    // Set the code highlight configurations
    if (nuxt.options.content?.highlight) {
      // preload options here apply to md files in /content only.
      // Pre-compiled docs AST does not use.
      nuxt.options.content.highlight.preload = []
    }
    nuxt.options.nitro.prerender = nuxt.options.nitro.prerender || {}
    nuxt.options.nitro.prerender.routes = nuxt.options.nitro.prerender.routes || []
    const routes = new Set(nuxt.options.nitro.prerender.routes)

    {
      // Add refpages
      const results = await fetch('https://data.vkdoc.net/man/index.json')
      const resultJson = await results.json()
      for (const item of resultJson) {
        routes.add(`/man/${item.id}`)
      }
    }
    {
      // Add chapters
      const results = await fetch('https://data.vkdoc.net/chapters/index.json')
      const resultJson = await results.json()
      for (const item of resultJson) {
        routes.add(`/chapters/${item.id}`)
      }
    }
    nuxt.options.nitro.prerender.routes = Array.from(routes)
  },
})
