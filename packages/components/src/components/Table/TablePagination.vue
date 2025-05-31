<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { usePagination } from "src/composables";
import { watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    total: number;
    pageSize: number;
    modelValue: number;
  }>(),
  { totalItems: 0, pageSize: 0, modelValue: 1 }
);

const currentPage = defineModel<number>({ required: true });

const pagination = usePagination({
  totalItems: computed(() => props.total),
  pageSize: ref(props.pageSize),
  currentPage: currentPage,
});

const paginationState = reactive({
  startIndex: 1,
  endIndex: 1,
  totalItems: 0,
  isNextEnabled: false,
  isPreviousEnabled: false,
  onNextClick: () => {},
  onPreviousClick: () => {},
});

watchEffect(() => {
  // pagination = usePagination({
  //   totalItems: props.total,
  //   pageSize: props.pageSize,
  //   currentPage: currentPage.value
  // })
  paginationState.startIndex = pagination.startIndex.value;
  paginationState.endIndex = pagination.endIndex.value;
  paginationState.totalItems = pagination.totalItems.value;
  paginationState.isNextEnabled = pagination.isNextEnabled.value;
  paginationState.isPreviousEnabled = pagination.isPreviousEnabled.value;
  paginationState.onNextClick = pagination.nextPage;
  paginationState.onPreviousClick = pagination.previousPage;

  currentPage.value = pagination.currentPage.value;
});
</script>

<template>
  <div class="flex items-center text-true-gray-600">
    <span>
      {{ paginationState.startIndex + 1 }}
      -
      {{ paginationState.endIndex + 1 }}
    </span>
    <span class="ml-2">sur</span>
    <span class="ml-2">{{ paginationState.totalItems }}</span>

    <button
      :disabled="!paginationState.isPreviousEnabled"
      class="ml-4 flex w-8 h-8 rounded-full items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-200 focus:outline-none"
      :class="{
        'pointer-events-none text-gray-400': !paginationState.isPreviousEnabled,
      }"
      @click="paginationState.onPreviousClick"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <button
      :disabled="!paginationState.isNextEnabled"
      class="flex w-8 h-8 rounded-full items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-200 focus:outline-none"
      :class="{
        'pointer-events-none text-gray-400': !paginationState.isNextEnabled,
      }"
      @click="paginationState.onNextClick"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5 -rotate-180"
      >
        <path
          fill-rule="evenodd"
          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

