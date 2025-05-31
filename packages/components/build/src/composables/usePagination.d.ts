import { Ref } from 'vue';
interface PaginateOptions {
    totalItems: Ref<number>;
    pageSize: Ref<number>;
    currentPage: Ref<number>;
}
export declare const usePagination: (options: PaginateOptions) => {
    totalItems: import('vue').ComputedRef<number>;
    currentPage: Ref<number, number>;
    pageSize: Ref<number, number>;
    totalPages: import('vue').ComputedRef<number>;
    startIndex: import('vue').ComputedRef<number>;
    endIndex: import('vue').ComputedRef<number>;
    isNextEnabled: import('vue').ComputedRef<boolean>;
    isPreviousEnabled: import('vue').ComputedRef<boolean>;
    setPage: (page: number) => void;
    nextPage: () => void;
    previousPage: () => void;
};
export {};
