<template>
  <svg
    v-if="iconData"
    :width="iconData.attributes.width"
    :height="iconData.attributes.height"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    class="icon"
    role="img"
    :viewBox="iconData.attributes.viewBox"
    v-html="iconData.body"
  >
  </svg>
</template>

<script setup lang="ts">
import { iconToSVG } from '@iconify/utils/lib/svg/build';
import type { IconifyJSON, IconifyIcon } from '@iconify/types';

const props = defineProps<{
  name: string
}>()
const { data: iconData } = await useAsyncData(props.name, async () => {
    const iconInfo = {
        provider: 'default',
        set: '',
        name: ''
    };
    if (props.name.startsWith('@')) {
        const components = props.name.split(':');
        iconInfo.provider = components[0].slice(1);
        iconInfo.set = components[1];
        iconInfo.name = components[2];
    } else if (props.name.startsWith('i-')) {
        const components = props.name.split('-')
        iconInfo.set = components[1];
        iconInfo.name = components.slice(2).join('-');
    } else {
        const components = props.name.split(':');
        iconInfo.set = components[0];
        iconInfo.name = components[1];
    }
    
    const host = {
        dust: 'icon.dust.rs',
        default: 'api.iconify.design'
    }[iconInfo.provider];
    const url = `https://${host}/${iconInfo.set}.json?icons=${iconInfo.name}`


    const data = await $fetch<IconifyJSON>(url);
    const iconData: IconifyIcon = data.icons[iconInfo.name];

    iconData.width = iconData.width || data.width;
    iconData.height = iconData.height || data.height;
    iconData.top = iconData.top || data.top || 0;
    iconData.left = iconData.left || data.left || 0;
    return iconToSVG(iconData);
}, {
    watch: [props]
});
</script>

<style>
.icon {
  display: inline-block;
  vertical-align: middle;
}
/*
Font Awesome Duotone icons do not automatically set the colors to currentColor.
Instead, it adds these two class names. Here we add styles for the two classes
to set their colors to currentColor globally.
*/
.fa-primary {
    fill: var(--icon-primary-color, currentColor);
}
.fa-secondary {
    fill: var(--icon-secondary-color, currentColor);
    opacity: var(--icon-secondary-opacity, 0.4);
}
</style>
