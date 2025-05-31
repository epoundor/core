<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, type Component } from 'vue';

const props = withDefaults(
    defineProps<{
        as?: Component | string;
        id: string;
        label?: string;
        disabled?: boolean;
        type?: 'outlined' | 'filled';
    }>(),
    {
        as: 'button',
        type: 'outlined'
    }
);
const tab = ref(null);
let observer: MutationObserver | null = null;
const selected = ref(false);

const handleMutations = (mutationsList: any) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName.startsWith('data-')) {
            const attributeName = mutation.attributeName;
            const newValue = mutation.target.getAttribute(attributeName);
            selected.value = Boolean(newValue);
        }
    }
};

const classes = computed((): string => {
    const classesMappers: Record<typeof props.type, string> = {
        outlined: `border-b-gray-300 border-b-2 group-active:border-gray-800 ${selected.value ? 'text-primary !border-b-primary hover:text-red-700 group-active:border-red-800 group-active:text-red-800' : ''}`,
        filled: `border-transparent border-b-2 border-x border-t hover:bg-red-50 group-active:bg-red-50  group-active:border-t group-active:border-x group-active:border-gray-800 ${selected.value ? 'bg-red-50 text-primary !border-b-primary hover:text-red-700 group-active:border-red-800 group-active:text-red-800' : ''}`
    };
    return `${classesMappers[props.type]}`;
});

onMounted(() => {
    if (!tab.value) return;
    observer = new MutationObserver(handleMutations);
    observer.observe(tab.value, {
        attributes: true, // Watch attribute changes
        attributeFilter: ['data-coreui-tab-selected'], // Empty means all attributes
        subtree: false
    });
});

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect();
    }
});
</script>
<template>
    <component
        ref="tab"
        :is="as"
        :disabled="disabled"
        :aria-disabled="disabled"
        class="group focus:outline-none disabled:opacity-40 tab_button"
        :data-coreui-tab="`coreui-tab-${id}`"
        role="tab">
        <slot :selected>
            <div
                :class="[classes]"
                class="flex py-2 px-4 gap-2 text-body border-transparent group-focus:outline-none">
                <slot name="icon"></slot>
                <span>{{ label }}</span>
            </div>
        </slot>
    </component>
</template>
