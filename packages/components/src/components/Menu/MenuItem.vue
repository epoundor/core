<script setup lang="ts">
import { ref, type Component } from 'vue';

withDefaults(
    defineProps<{
        as?: Component | string;
    }>(),
    {
        as: 'div'
    }
);
const active = ref(false);
</script>
<template>
    <component :active="active" :is="as" role="menuitem">
        <slot />
    </component>
</template>
