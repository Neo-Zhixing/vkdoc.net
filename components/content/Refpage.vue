<script setup lang="ts">
const props = defineProps<{
  name: string
  type: string
}>();

const normalizedName = computed(() => {
  return props.name.replaceAll('\\_', '_');
})

const state: Ref<'close' | 'ready' | 'pending' | 'initial'> = ref('close');

function onPendingStateChange(isPending: boolean) {
  state.value = isPending ? 'pending' : 'ready';
}

function onClick() {
  if (state.value === 'close') {
    state.value = 'initial';
    setTimeout(() => {
      if (state.value === 'initial') {
        state.value = 'pending';
      }
    }, 400);
  } else {
    state.value = 'close';
  }
}

const iconName = computed(() => {
  return {
    ready: 'i-heroicons-chevron-down-20-solid',
    initial: 'i-heroicons-chevron-up-20-solid',
    close: 'i-heroicons-chevron-up-20-solid',
    pending: 'eos-icons:loading'
  }[state.value]
})
</script>

<template>
  <div class="ring-1 shadow overflow-hidden ring-gray-200 dark:ring-gray-700 rounded-lg my-6">
    <div class="bg-gray-100 dark:bg-gray-800 p-4 refpage-header" @click="onClick">
      <div class="text-sm refpage-header-title flex-col sm:flex-row">
        <b class="mr-4 text-base refpage-main-header">{{ normalizedName }}</b>
        <ContentSlot :use="$slots.default" unwrap="p" />
      </div>
      <UIcon class="text-2xl shrink-0" :name="iconName" />
    </div>
    <RefpageContent :name="normalizedName" v-if="state !== 'close'" @pending="onPendingStateChange"/>
    <UDivider />
    <div class="p-4 flex justify-end" v-if="state === 'ready'">
      <UButton :to="'/man/' + normalizedName" label="Open in New Page" icon="i-heroicons-link" color="primary" />
      <UButton class="ml-2" label="Close" icon="i-heroicons-chevron-up-20-solid" color="gray" @click="state = 'close'" />
    </div>
  </div>
</template>

<style>
.refpage-header {
  display: flex;
  flex-wrap: nowrap;
  cursor: pointer;
  align-items: center;
  user-select: none;
}
.refpage-header-title {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  flex-grow: 1;
  overflow: hidden;
}
b.refpage-main-header {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
