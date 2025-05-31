<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { TabsElement } from './lib';

export interface TabsProps {
    defaultIndex?: number;
}
const props = withDefaults(defineProps<TabsProps>(), { defaultIndex: 0 });
const selectedIndex = defineModel<number>('selectedIndex', { default: 0 });
const tab_container = ref<HTMLDivElement | null>(null);

function useTabs(element: HTMLDivElement) {
    const { selectedIndex: selected } = new TabsElement(
        element,
        props.defaultIndex,
        selectedIndex.value
    );
    watch(selected, () => {
        selectedIndex.value = selected.value;
    });
}

watch(selectedIndex, () => {
    if (!tab_container.value) return;
    useTabs(tab_container.value);
});

onMounted(() => {
    if (!tab_container.value) return;
    useTabs(tab_container.value);
});
</script>
<template>
    <div ref="tab_container" role="tablist">
        <slot />
    </div>
</template>
