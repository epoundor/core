import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

    addons: [
        // "@storybook/addon-links",
        // "@storybook/addon-designs",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
        "@storybook/addon-a11y",
        "@storybook/addon-mdx-gfm"],

    framework: {
        name: "@storybook/vue3-vite",
        options: {
            docgen: "vue-component-meta",
        },
    },

    docs: {}
};
export default config;
