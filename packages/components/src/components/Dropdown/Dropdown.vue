<script setup lang="ts">
import { computed, onMounted } from "vue";
import Menu, { MenuButton, MenuItem, MenuItems } from "../Menu";

interface Option extends Record<string, string> {
  label: string;
  value: string;
}

export interface DropdownProps {
  /**
   * Button label (for default trigger)
   */
  label?: string;
  type?: "default" | "floating";
  size?: "small" | "regular";
  options: Option[];
}
const props = withDefaults(defineProps<DropdownProps>(), {
  type: "default",
  size: "small",
});

const model = defineModel<string>();
const option = defineModel<Option>("option");
const classes = computed((): string => {
  const classesMappers: Record<typeof props.size | typeof props.type, string> =
    {
      small: "text-xs dropdown-small",
      regular: "text-base dropdown-regular",
      default: "border border-gray-300 bg-gray-50 dropdown-default",
      floating: "dropdown-floating",
    };
  return `${classesMappers[props.size]} ${classesMappers[props.type]}`;
});

onMounted(() => {
  option.value = props.options.find((opt) => opt.value === model.value);
});
</script>
<template>
  <Menu class="relative">
    <MenuButton class="flex flex-col gap-2 cursor-pointer" as="div">
      <span>{{ label }}</span>
      <div
        class="py-3 px-4 flex text-gray-700 justify-between items-center min-w-72 rounded-lg w-full"
        :class="classes"
      >
        <span v-if="option">{{ option.label }}</span>
        <span v-else>Cliquer pour sélectionner</span>
        <slot name="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </slot>
      </div>
    </MenuButton>
    <MenuItems
      class="absolute right-0 left-0 mt-1 origin-top-right rounded-lg bg-white focus:outline-none p-2 gap-1 z-50 shadow-lg dropdown-items"
    >
      <div
        v-for="opt in options"
        @click="
          () => {
            model = opt.value;
            option = opt;
          }
        "
      >
        <slot name="option" role="menuitem" :option="opt">
          <MenuItem
            class="text-normal cursor-pointer p-2 flex justify-between items-center"
            >{{ opt.label }}
          </MenuItem>
        </slot>
      </div>
    </MenuItems>
  </Menu>
</template>
