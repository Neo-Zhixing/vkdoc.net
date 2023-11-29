<script setup lang="ts">
import { Combobox as HCombobox, ComboboxInput as HComboboxInput, ComboboxOptions as HComboboxOptions } from '@headlessui/vue'

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
const active = ref(false)

const debouncedSearch = useDebounceFn(async (t: string) => {
  loading.value = true
  result.value = (await search(t, {
    attributesToHighlight: ['title', 'content'],
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
  })).hits.map(page => ({
    id: page.url as string,
    label: rearrange(page._formatted?.title ?? page.title),
    suffix: rearrange(page._formatted?.content ?? page.content),
    url: page.url as string,
  }))
  active.value = true
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
    v-model="isDocsSearchModalOpen"
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
          @click="isDocsSearchModalOpen = false"
        />
      </div>
      <div class="flex flex-col min-h-[20rem]">
        <div
          v-if="query === '' || !active"
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
          class="p-4 grid gap-2 overflow-y-auto max-h-full relative flex-1 scroll-py-10"
        >
          <div
            v-for="page in result"
            :key="page.id"
            class="rounded-md px-2 py-1.5 hover:bg-gray-100 hover:dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <NuxtLink
              :to="page.url"
              class="select-none grid"
              @click="isDocsSearchModalOpen = false"
            >
              <span
                class="[&_mark]:font-bold [&_mark]:bg-transparent [&_mark]:text-gray-900 [&_mark]:dark:text-white"
                v-html="page.label"
              />
              <span
                class="truncate text-sm text-gray-400 [&_mark]:bg-primary-400"
                v-html="page.suffix"
              />
            </NuxtLink>
          </div>
        </HComboboxOptions>
      </div>
    </HCombobox>
  </UModal>
</template>
