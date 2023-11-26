import { defineNuxtModule } from '@nuxt/kit'

import { readdir } from 'fs/promises';

export default defineNuxtModule({
    async setup(_, nuxt) {
        // Set the code highlight configurations
        if (nuxt.options.content?.highlight) {
            nuxt.options.content.highlight.preload = ['rust', 'c']
        }
        /*
        nuxt.options.nitro.prerender = nuxt.options.nitro.prerender || {};
        nuxt.options.nitro.prerender.routes = nuxt.options.nitro.prerender.routes || [];
        const routes = new Set(nuxt.options.nitro.prerender.routes);

        const results = await readdir('./content/man');
        for (const filename of results) {
            routes.add('/man/' + filename.slice(0, -3));
        }
        nuxt.options.nitro.prerender.routes = Array.from(routes);
        */
    }
})
