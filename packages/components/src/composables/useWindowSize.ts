// This hook is useful to known the size of screen

import { onMounted, onBeforeUnmount, reactive, ref, watch } from 'vue';

const MOBILE_WIDTH = 1024;
const useWindowSize = () => {
    const windowSize = reactive({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const isOnMobileDevice = ref(false);

    const updateWindowSize = () => {
        windowSize.width = window.innerWidth;
        windowSize.height = window.innerHeight;
    };

    watch(
        () => windowSize.width,
        () => {
            if (windowSize.width <= MOBILE_WIDTH - 1) {
                isOnMobileDevice.value = true;
                return null;
            }
            isOnMobileDevice.value = false;
            return null;
        }
    );

    function initParameters() {
        if (windowSize.width <= MOBILE_WIDTH - 1) {
            isOnMobileDevice.value = true;
        } else {
            isOnMobileDevice.value = false;
        }
    }
    onMounted(() => {
        initParameters();
        window.addEventListener('resize', updateWindowSize);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateWindowSize);
    });

    return { windowSize, isOnMobileDevice };
};

export { useWindowSize };
