<script setup lang="ts">
export interface DataSlot {
  label: string
  value: string
}
defineProps<DataSlot>()
</script>
<template>
  <div class="flex flex-col py-2.5 gap-1 text-sm">
    <span class="text-gray-500">{{ label }}</span>
    <div class="font-medium text-gray-700">{{ value }}</div>
  </div>
</template>