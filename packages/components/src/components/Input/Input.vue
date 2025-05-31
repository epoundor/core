<script setup lang="ts">
import { computed } from "vue";

export interface InputProps {
  size?: "small" | "medium" | "large";
  type?: HTMLInputElement["type"];
  label?: string;
  name: string;
  message?: string;
  disabled?: boolean;
  isValid?: boolean;
  isError?: boolean;
}
const props = withDefaults(defineProps<InputProps>(), {
  size: "medium",
  type: "text",
});

const classes = computed((): string => {
  const classesMappers: Record<typeof props.size, string> = {
    small: `p-2 rounded`,
    medium: "p-2.5 rounded-md",
    large: "p-4 rounded-lg",
  };
  return `${classesMappers[props.size]} ${props.isValid ? "valid" : ""} ${props.isError ? "error" : ""}`;
});

const model = defineModel();
</script>
<template>
  <label
    class="flex flex-col gap-2 has-[:disabled]:opacity-40"
    :class="{
      'text-captation': size === 'small',
      'text-normal': size === 'medium',
      'text-body': size === 'large',
      'text-green-600': isValid,
      'text-red-600': isError,
    }"
  >
    <span class="text-black input-label" v-if="label">{{ label }}</span>
    <div
      :class="[classes]"
      class="flex border-gray-300 bg-gray-50 border items-center input-container"
    >
      <slot name="prefix"></slot>
      <input
        v-bind="$attrs"
        :name
        v-model="model"
        :type="type"
        :disabled="disabled"
        class="flex-1 bg-transparent focus-visible:border-none focus-visible:outline-none focus:outline-none focus:shadow-none focus:ring-0 border-0 w-full"
      />
      <slot name="suffix"></slot>
    </div>
    <span v-if="message">{{ message }}</span>
    <slot name="helper"></slot>
  </label>
</template>
<style scoped>
@reference "tailwindcss";

.valid {
  @apply bg-green-50 border-green-700 text-green-900 has-[:focus-visible]:!outline-green-700;
}

.error {
  @apply bg-red-50 border-red-700 text-red-900 has-[:focus-visible]:!outline-red-700;
}

.input-container:has(:focus-visible) {
  @apply outline-blue-700 outline;
}
</style>
