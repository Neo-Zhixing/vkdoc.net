<script setup lang="ts">
import { Combobox as HCombobox, ComboboxInput as HComboboxInput, ComboboxOptions as HComboboxOptions } from '@headlessui/vue'

interface SearchItem {
  type: 'content' | 'lvl1' | 'lvl2' | 'lvl3' | 'lvl4' | 'lvl5' | 'lvl6'
  content: string | null
  hierarchy: {
    lvl1?: string
    lvl2?: string
    lvl3?: string
    lvl4?: string
    lvl5?: string
    lvl6?: string
  }
  url: string
}
const { result, search } = useAlgoliaSearch<SearchItem>('vknet')
const breakpoints = useBreakpoints({ mobile: 640 })

// replace of the ui-pro one
const { isContentSearchModalOpen } = useUIState()
const isXs = breakpoints.smaller('mobile')
const loading = ref(false)

const query = ref('')
const active = ref(false)

const debouncedSearch = useDebounceFn(async (t: string) => {
  loading.value = true

  const snippetLength = 10
  await search({
    query: t,
    // attributesToHighlight: ['title', 'content'],
    requestOptions: {
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
      snippetEllipsisText: '…',
      clickAnalytics: true,
      attributesToRetrieve: [
        'hierarchy.lvl0',
        'hierarchy.lvl1',
        'hierarchy.lvl2',
        'hierarchy.lvl3',
        'hierarchy.lvl4',
        'hierarchy.lvl5',
        'hierarchy.lvl6',
        'content',
        'type',
        'url',
      ],
      attributesToSnippet: [
        `hierarchy.lvl1:${snippetLength}`,
        `hierarchy.lvl2:${snippetLength}`,
        `hierarchy.lvl3:${snippetLength}`,
        `hierarchy.lvl4:${snippetLength}`,
        `hierarchy.lvl5:${snippetLength}`,
        `hierarchy.lvl6:${snippetLength}`,
        `content:${snippetLength}`,
      ],
    },
  })
  console.log(result)
  active.value = true
  loading.value = false
}, 200, { maxWait: 500 })

watch(query, async (q) => {
  await debouncedSearch(q)
})

function rearrange(s: string): string {
  const words = s.split(' ')
  const wordIndex = words
    .map(item => item.toLowerCase())
    .findIndex(word => word.includes('<mark>'))

  if (wordIndex === -1) {
    return s
  }

  const result = words.slice(wordIndex).join(' ')
  return result
}
</script>

<template>
  <UModal
    v-model="isContentSearchModalOpen"
    :fullscreen="isXs"
    v-bind="$attrs"
    :ui="{
      base: 'sm:!max-w-3xl h-screen sm:h-[28rem] rounded-none sm:rounded-lg sm:my-8',
    }"
  >
    <HCombobox
      as="div"
      class="flex flex-col flex-1 min-h-0 divide-y divide-gray-100 dark:divide-gray-800"
    >
      <div class="relative flex items-center">
        <UIcon
          :name="loading ? 'i-heroicons-arrow-path-20-solid' : 'i-heroicons-magnifying-glass-20-solid'"
          aria-hidden="true"
          :class="loading && 'animate-spin'"
          class="pointer-events-none absolute start-4 text-gray-400 dark:text-gray-500 h-5 w-5"
        />
        <HComboboxInput
          class="flex-1 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent border-0 text-gray-900 dark:text-white focus:ring-0 focus:outline-none sm:text-sm h-[--header-height] sm:h-12 px-4 ps-11"
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
          @click="isContentSearchModalOpen = false"
        />
      </div>
      <div class="flex flex-col min-h-[20rem]">
        <div
          v-if="query === '' || !active"
          class="flex-1 flex flex-col items-center justify-center pointer-events-none gap-4"
        />
        <div
          v-else-if="!loading && !result.hits.length"
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
          class="p-4 flex-1 flex flex-col gap-2 overflow-y-auto max-h-full relative scroll-py-10"
          :class="{
            'pb-2': result.hits.length <= 2,
          }"
        >
          <div
            v-for="hit in result.hits"
            :key="hit.objectID"
            class="rounded-md px-2 py-1.5 hover:bg-gray-100 hover:dark:bg-gray-800 text-gray-900 dark:text-white"
            :class="{
              'max-h-16': result.hits.length <= 2,
            }"
          >
            <NuxtLink
              no-prefetch
              :to="hit.url"
              class="select-none grid"
              @click="isContentSearchModalOpen = false"
            >
              <template v-if="hit.type === 'lvl1' && hit.hierarchy[hit.type]">
                <UIcon name="@dust:fa6-pro-solid:book" dynamic class="text-gray-900 dark:text-white" />
                <span
                  class="[&_mark]:font-bold [&_mark]:bg-transparent [&_mark]:text-gray-900 [&_mark]:dark:text-white"
                  v-html="hit._snippetResult!.hierarchy.lvl1!.value"
                />
                <span
                  v-if="hit.content"
                  class="truncate text-sm text-gray-400 [&_mark]:bg-primary-400"
                  v-html="hit._snippetResult!.content!.value"
                />
              </template>
              <template v-else-if="(hit.type === 'lvl2' || hit.type === 'lvl3' || hit.type === 'lvl4' || hit.type === 'lvl5' || hit.type === 'lvl6') && hit.hierarchy[hit.type]">
                <span
                  class="[&_mark]:font-bold [&_mark]:bg-transparent [&_mark]:text-gray-900 [&_mark]:dark:text-white"
                  v-html="hit._snippetResult!.hierarchy[hit.type]!.value"
                />
                <span
                  class="truncate text-sm text-gray-400 [&_mark]:bg-primary-400"
                  v-html="hit._snippetResult!.hierarchy.lvl1!.value"
                />
              </template>
              <template v-else-if="hit.type === 'content'">
                <span
                  class="[&_mark]:font-bold [&_mark]:bg-transparent [&_mark]:text-gray-900 [&_mark]:dark:text-white"
                  v-html="hit._snippetResult!.content!.value"
                />
                <span
                  class="truncate text-sm text-gray-400 [&_mark]:bg-primary-400"
                  v-html="hit._snippetResult!.hierarchy.lvl1.value"
                />
              </template>
            </NuxtLink>
          </div>
        </HComboboxOptions>
      </div>
    </HCombobox>
  </UModal>
</template>
