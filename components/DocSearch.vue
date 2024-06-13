<script setup lang="ts">
import { Combobox as HCombobox, ComboboxInput as HComboboxInput, ComboboxOption as HComboboxOption, ComboboxOptions as HComboboxOptions } from '@headlessui/vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { Hit } from '@nuxtjs/algolia'
import { commandPalette } from '#ui/ui.config'

type EntryType = 'content' | 'lvl1' | 'lvl2' | 'lvl3' | 'lvl4' | 'lvl5' | 'lvl6'

interface SearchItem {
  type: EntryType
  content: string | null
  hierarchy: {
    lvl0?: string
    lvl1?: string
    lvl2?: string
    lvl3?: string
    lvl4?: string
    lvl5?: string
    lvl6?: string
  }
  url: string
}

const config = computed(() => ({
  padding: 'p-0 sm:p-4',
  rounded: 'rounded-none sm:rounded-lg',
  width: 'sm:max-w-3xl',
  height: 'h-dvh sm:h-[28rem]',
}))
const { ui: searchUi } = useUI('content.search', undefined, config, undefined, true)
const { ui: commandPaletteUi } = useUI('commandPalette', undefined, commandPalette, undefined)

const { result, search } = useAlgoliaSearch<SearchItem>('vknet')
const breakpoints = useBreakpoints(breakpointsTailwind)

// replace of the ui-pro one
const { isContentSearchModalOpen } = useUIState()
const smallerThanSm = breakpoints.smaller('sm')
const loading = ref(false)

const query = ref('')
const searchActive = ref(false)

const debouncedSearch = useDebounceFn(async () => {
  loading.value = true

  const snippetLength = 10
  await search({
    query: query.value,
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
  searchActive.value = true
  loading.value = false
}, 200, { maxWait: 500 })

const groupedSearchResult = computed(() => {
  const groups: { [key: string]: any[] } = {};
  for (const item of result.value.hits) {
    groups[item.hierarchy.lvl0 || ''] = groups[item.hierarchy.lvl0 || ''] || [];
    groups[item.hierarchy.lvl0 || ''].push(item);
  }
  return groups
})

watch(query, debouncedSearch)

function entryTypeToIcon(entryType: EntryType): string {
  if (entryType === 'content') {
    return '@dust:fa6-pro-solid:text-size'
  }
  if (entryType === 'lvl1') {
    return '@dust:fa6-pro-solid:book'
  }
  return '@dust:fa6-pro-solid:hashtag'
}

function content(hit: Hit<SearchItem>) {
  if (hit.type === 'content') {
    return hit._snippetResult?.content?.value
  }
  return null
}
function header(hit: Hit<SearchItem>) {
  if (hit.type === 'content') {
    return hit._snippetResult?.hierarchy?.lvl1?.value
  }
  return hit._snippetResult?.hierarchy[hit.type]?.value
}

const router = useRouter()
function onSelect(hit: Hit<SearchItem>) {
  let url = hit.url
  const hostname = 'https://vkdoc.net'
  if (url.startsWith(hostname)) {
    url = url.substring(hostname.length)
  }
  isContentSearchModalOpen.value = false
  router.push(url)
}

const canToggleModal = computed(() => !isContentSearchModalOpen.value)

defineShortcuts({
  meta_k: {
    usingInput: false,
    whenever: [canToggleModal],
    handler: () => {
      isContentSearchModalOpen.value = true
    },
  },
  escape: {
    usingInput: true,
    whenever: [isContentSearchModalOpen],
    handler: () => { isContentSearchModalOpen.value = false },
  },
})
</script>

<template>
  <UModal v-model="isContentSearchModalOpen" :overlay="!smallerThanSm" :transition="!smallerThanSm" :ui="searchUi">
    <HCombobox
      as="div"
      class="flex flex-col flex-1 min-h-0 divide-y divide-gray-100 dark:divide-gray-800"
      @update:model-value="onSelect"
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
          :value="query"
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
      <div class="flex flex-col min-h-[20rem] grow">
        <div
          v-if="query === '' || !searchActive"
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
          static
          hold
          class="flex-1 flex flex-col gap-2 overflow-y-auto max-h-full relative scroll-py-10 divide-gray-100 dark:divide-gray-800 divide-y"
          :class="{
            'pb-2': result.hits.length <= 2,
          }"
        >
          <div v-for="[key, group] in Object.entries(groupedSearchResult)" :key="key" class="p-2">
            <div class="text-xs font-semibold text-gray-900 dark:text-white uppercase my-2 px-2">{{  key  }}</div>
            <HComboboxOption
              v-for="hit in group"
              :key="hit.objectID"
              v-slot="{ active }"
              :value="hit"
              as="template"
            >
              <div class="cursor-pointer" :class="[commandPaletteUi.group.command.base, active ? commandPaletteUi.group.command.active : commandPaletteUi.group.command.inactive]">
                <div :class="commandPaletteUi.group.command.container">
                  <UIcon :name="entryTypeToIcon(hit.type)" :class="[commandPaletteUi.group.command.icon.base, active ? commandPaletteUi.group.command.icon.active : commandPaletteUi.group.command.icon.inactive]" aria-hidden="true" />

                  <div :class="[commandPaletteUi.group.command.label]">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="truncate flex-none" v-html="header(hit)" />
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span class="truncate" :class="commandPaletteUi.group.command.suffix" v-html="content(hit)" />
                  </div>
                </div>
              </div>
            </HComboboxOption>
          </div>
        </HComboboxOptions>
      </div>
      <div class="pb-2 pt-1 px-8 text-right">
        <UIcon class="w-16 ml-2" name="logos:algolia" />
      </div>
    </HCombobox>
  </UModal>
</template>

<style>
mark {
  @apply bg-primary-400;
}
</style>
