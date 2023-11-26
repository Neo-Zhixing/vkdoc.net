<template lang="pug">
.mt-5.text-sm
  ProseH4(:id="name" :class="{'text-primary': titleIsHighlighted}").font-semibold.font-mono.mt-0 {{ name }}
  slot
</template>

<script setup lang="ts">
const route = useRoute();
const props = defineProps<{
  name?: string
}>();
const titleIsHighlighted = ref(false);

watch(
  () => route.hash,
  hash => {
    titleIsHighlighted.value = hash.slice(1) === props.name;
  }, {immediate: true}
);
</script>
