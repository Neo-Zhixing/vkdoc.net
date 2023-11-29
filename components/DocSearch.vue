<script setup lang="ts">
import { Combobox as HCombobox, ComboboxInput as HComboboxInput, ComboboxOptions as HComboboxOptions, ComboboxOption as HComboboxOption } from '@headlessui/vue'
const breakpoints = useBreakpoints({ mobile: 640 })

// replace of the ui-pro one
const { isDocsSearchModalOpen } = useUIState()
const isXs = breakpoints.smaller('mobile')
const loading = ref(false)
const { search } = useMeiliSearch('refpages')

const result = ref<{
  id: string
  label: string
  suffix: string
  url: string
}[]>([])

const query = ref('')

const debouncedSearch = useDebounceFn(async (t: string) => {
  loading.value = true
  result.value = (await search(t, {
    attributesToHighlight: ['content'],
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
  })).hits.map((page) => ({
    id: page.url as string,
    label: page.title as string,
    suffix: rearrange(page._formatted?.content ?? page.content, t),
    url: page.url as string,
  }))
  loading.value = false
}, 200, { maxWait: 500 })

watch(query, async (q) => {
  if (q === '') {
    result.value = []
  }
  else {
    await debouncedSearch(q)
  }
})

function rearrange(s: string, q: string): string {
  let words = s.split(' ')
  let wordIndex = words
    .map((item) => item.toLowerCase())
    .findIndex(word => word.includes(q.toLowerCase()))

  if (wordIndex === -1) {
    return s;
  }

  let result = words.slice(wordIndex).join(' ');
  if (q.toLowerCase() == 'ah') {
    console.log(s, q, result)
  }
  return result;
}
</script>

<template>
  <UModal
    v-model="isDocsSearchModalOpen"
    :fullscreen="isXs"
    v-bind="$attrs"
  >
    <HCombobox>
      <div class="relative flex items-center">
        <UIcon
          :name="loading ? 'i-heroicons-arrow-path-20-solid' : 'i-heroicons-magnifying-glass-20-solid'"
          aria-hidden="true"
          :class="loading && 'animate-spin'"
          class="pointer-events-none absolute start-4 text-gray-400 dark:text-gray-500 h-5 w-5"
        />
        <HComboboxInput
          class="flex-1 h-12 px-4 ps-12 border-none cursor-text overflow-hidden focus:outline-none"
          placeholder="Search..."
          autocomplete="off"
          @change="query = $event.target.value"
        />
        <UButton
          aria-label="Close"
          class="absolute end-4"
          icon="i-heroicons-x-mark-20-solid"
          color="gray"
          variant="link"
          :padded="false"
          @click="isDocsSearchModalOpen = false" />
      </div>
      <div class="flex flex-col min-h-[20rem]">
        <div
          v-if="query === ''"
          class="flex-1 flex flex-col items-center justify-center pointer-events-none gap-4"
        />
        <div
          v-else-if="!loading && !result.length"
          class="flex-1 flex flex-col items-center justify-center pointer-events-none gap-4"
        >
          <UIcon
            name="i-heroicons-magnifying-glass-20-solid"
            aria-hidden="true"
            class="text-gray-400 dark:text-gray-500 h-6 w-6"
          />
          <span class="text-gray-400">
            Not Found.
          </span>
        </div>
        <HComboboxOptions
          v-else
          class="p-4 grid gap-2 overflow-y-auto max-h-full"
        >
          <NuxtLink
            v-for="page in result"
            :key="page.id"
            :to="page.url"
            @click="isDocsSearchModalOpen = false"
            class="select-none grid items-center gap-2 p-2 rounded-md hover:bg-gray-100"
          >
            <h3 class="font-bold">
              {{ page.label }}
            </h3>
            <span
              v-html="page.suffix"
              class="truncate text-sm text-gray-400 [&_mark]:bg-primary-200"
            />
          </NuxtLink>
        </HComboboxOptions>

      </div>
    </HCombobox>
  </UModal>
</template>

<style>
.doc-search-result-box > div > div > div > div > div {
  display: grid;
}
</style>
