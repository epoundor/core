import { computed, type Ref } from 'vue';
interface PaginateOptions {
    totalItems: Ref<number>;
    pageSize: Ref<number>;
    currentPage: Ref<number>;
}

export const usePagination = (options: PaginateOptions) => {
    const totalItems = computed(() => options.totalItems.value);

    const currentPage = options.currentPage;
    const pageSize = options.pageSize;

    const totalPages = computed(() =>
        Math.ceil(totalItems.value / pageSize.value),
    );

    const startIndex = computed(() => (currentPage.value - 1) * pageSize.value);

    const endIndex = computed(
        () => Math.min(currentPage.value * pageSize.value, totalItems.value) - 1,
    );
    const isNextEnabled = computed(() => currentPage.value < totalPages.value);
    const isPreviousEnabled = computed(() => currentPage.value > 1);

    function setPage(page: number) {
        if (page < 1 || page > totalPages.value) {
            return;
        }

        currentPage.value = page;
    }

    function nextPage() {
        setPage(currentPage.value + 1);
        console.log('nextPage', currentPage.value);
    }

    function previousPage() {
        setPage(currentPage.value - 1);
    }

    return {
        totalItems,
        currentPage,
        pageSize,
        totalPages,
        startIndex,
        endIndex,
        isNextEnabled,
        isPreviousEnabled,

        setPage,
        nextPage,
        previousPage,
    };
};
