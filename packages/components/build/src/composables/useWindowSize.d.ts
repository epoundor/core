declare const useWindowSize: () => {
    windowSize: {
        width: number;
        height: number;
    };
    isOnMobileDevice: import('vue').Ref<boolean, boolean>;
};
export { useWindowSize };
