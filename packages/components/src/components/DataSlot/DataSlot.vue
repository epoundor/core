<script setup lang="ts">
export interface DataSlotProps {
  label: string
  value: string
}
defineProps<DataSlotProps>()
</script>
<template>
  <div class="flex flex-col py-2.5 gap-1 text-sm">
    <span class="text-gray-500">{{ label }}</span>
    <div class="font-medium text-gray-700">{{ value }}</div>
  </div>
</template>