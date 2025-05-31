<script setup lang="ts">
import type { Component } from 'vue';

withDefaults(
    defineProps<{
        as?: Component | string;
    }>(),
    {
        as: 'button'
    }
);
</script>
<template>
    <component :is="as" data-coreui-button aria-haspopup="true"><slot /></component>
</template>
