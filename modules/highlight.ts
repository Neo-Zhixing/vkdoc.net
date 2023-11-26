import { createResolver, defineNuxtModule, addImportsDir, hasNuxtModule, addComponentsDir } from '@nuxt/kit'


export default defineNuxtModule({
    setup(_, nuxt) {
        // Set the code highlight configurations
        if (nuxt.options.content?.highlight) {
            nuxt.options.content.highlight.preload = ['rust', 'c']
        }
    }
})