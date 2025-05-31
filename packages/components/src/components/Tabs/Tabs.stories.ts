import type { Meta, StoryObj } from '@storybook/vue3';
import Tabs from './Tabs.vue';
import Tab from './Tab.vue';

const meta = {
    title: 'Tabs',
    parameters: { layout: 'centered' },
    component: Tab,
} satisfies Meta<typeof Tabs>;

type TabsStory = StoryObj<typeof Tabs>;

export const Default = {
    render: (args) => ({
        components: { Tab, Tabs },
        setup() {
            return { args };
        },
        template: `
         <Tabs>
            <Tab id='tab_1' label="Tab 1"></Tab>
            <Tab id='tab_2' label="Tab 2"></Tab>
            <Tab id='tab_3' label="Tab 3"></Tab>
          </Tabs>
        `

    })
} satisfies TabsStory;

export default meta;
