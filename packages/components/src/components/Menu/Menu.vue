<script setup lang="ts">
import { onMounted, ref, type Component } from 'vue';
import { MenuElement } from './lib';

export interface MenuProps {
    as?: Component | string;
}
withDefaults(defineProps<MenuProps>(), { as: 'div' });

const menu_container = ref<HTMLDivElement | null>(null);

function useMenu(element: HTMLDivElement) {
    const menu = new MenuElement(element);
}
onMounted(() => {
    if (!menu_container.value) return;
    useMenu(menu_container.value);
});
</script>
<template>
    <component :is="as" ref="menu_container"><slot /></component>
</template>
