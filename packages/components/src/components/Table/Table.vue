<script setup lang="ts" generic="T = Record<string, any>">
import { computed } from "vue";
import { useWindowSize } from "../../composables/useWindowSize";
import TableTh from "./TableTh.vue";
import TableRow from "./TableRow.vue";
import TableData from "./TableData.vue";
import type { Header } from "src/types";

export interface TableProps {
  /**
   * The headers of the table
   * */
  //   @ts-ignore
  headers: Header<T>[];
  /**
   * The data to display
   * */
  //   @ts-ignore
  data: T[];
  /**
   * The loading state
   * */
  loading?: boolean;
}

const props = defineProps<TableProps>();
type anySlot = {
  [key: string]: (_: { item: T; idx: number; value: any }) => any | undefined;
};
defineSlots<
  {
    empty?: string;
  } & anySlot
>();
const emit = defineEmits<{
  (event: "rowHovered", target: { idx: number; item: T } | null): void;
  (event: "rowDblClick", target: { idx: number; item: T }): void;
}>();

const { isOnMobileDevice } = useWindowSize();

const currentHeaders = computed((): Header[] => {
  // When we are not on mobile show all headers
  if (!isOnMobileDevice.value) return props.headers;
  // When mobile attribute isn't show all headers
  if (props.headers.every((header) => !header.mobile)) return props.headers;

  return props.headers.filter((header) => {
    return header.mobile;
  })!;
});
const cellsCount = computed(() => props.headers.length);

function getItemField(item: any, header: Header) {
  let value = item[String(header.field)];
  if (!value) {
    value = "-";
  }
  if (typeof header.formatter === "function") {
    value = header.formatter(item);
  }

  return value;
}
</script>
<template>
  <div class="bg-white overflow-hidden table-container">
    <table class="w-full">
      <thead>
        <TableTh
          v-for="header in currentHeaders"
          :key="`${header.field}_header`"
          :class="header.thClass"
        >
          {{ header.label }}
        </TableTh>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr class="" v-for="(item, idx) of currentHeaders" :key="idx">
            <!-- <td
                            v-if="selectable || !loading"
                            scope="col"
                            class="w-4 px-3 py-1 text-xs md:text-sm font-medium tracking-wider">
                            <input type="checkbox" disabled />
                        </td> -->
            <td
              class="p-4"
              v-for="header in currentHeaders"
              :key="`cell_${header.field}_item${item.field}`"
            >
              <div
                class="h-4 mx-auto animate-pulse bg-gray-200 rounded-full"
              ></div>
            </td>
          </tr>
        </template>
        <template v-else-if="!data.length">
          <tr>
            <td :colspan="cellsCount">
              <slot name="empty">
                <div class="w-full py-16 text-center">
                  Aucune donnée disponible
                </div>
              </slot>
            </td>
          </tr>
        </template>
        <template v-else>
          <TableRow
            v-for="(item, idx) in data"
            @mouseover="emit('rowHovered', { idx, item })"
            @mouseleave="emit('rowHovered', null)"
            @dblclick="emit('rowDblClick', { idx, item })"
            :key="idx"
          >
            <TableData v-for="header in currentHeaders" :class="header.tdClass">
              <slot
                :name="`${header.field}`"
                :item="item"
                :value="getItemField(item, header)"
                :idx="idx"
              >
                <span>{{ getItemField(item, header) }} </span>
              </slot>
            </TableData>
          </TableRow>
        </template>
      </tbody>
    </table>
  </div>
</template>
