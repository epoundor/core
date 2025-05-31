<script setup lang="ts">
import { computed } from "vue";
export interface ButtonProps {
  color?: "primary" | "secondary" | "outlined";
  size?: "small" | "medium" | "large";
  loading?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  loading: false,
  color: "primary",
  size: "medium",
});

const classes = computed((): string => {
  const classesMappers: Record<typeof props.size | typeof props.color, string> =
    {
      small: "button-small px-3 py-1.5 text-xs",
      medium: "button-medium px-4 py-2",
      large: "button-large px-5 py-3",
      primary: "button-primary",
      secondary: "button-secondary",
      outlined:
        "button-outlined bg-transparent border-gray-300 active:border-gray-400 focus:border-black disabled:border-gray-200 disabled:text-gray-400",
    };
  return `${classesMappers[props.size]} ${classesMappers[props.color]}`;
});
</script>
<template>
  <button
    :class="[classes]"
    :disabled="loading"
    class="flex justify-center items-center rounded-lg border gap-4"
  >
    <div class="loader h-5 w-5" v-if="loading"></div>
    <slot name="prefix"></slot>
    <slot></slot>
    <slot name="suffix"></slot>
  </button>
</template>

<style scoped>
.loader {
  min-width: 16px;
  padding: 3px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #edf9f0;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
</style>
