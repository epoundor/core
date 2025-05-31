import type { Meta, StoryObj } from '@storybook/vue3';
import Button from './Button.vue';

const meta = {
    title: 'Button',
    parameters: { layout: 'centered' },
    component: Button,
    render: (args) => ({
        components: { Button },
        setup() {
            return { args };
        },
        template: `
          <Button v-bind="args">Button</Button>        `
    })
    
} satisfies Meta<typeof Button>;

type ButtonStory = StoryObj<typeof Button>;

export const Default = {} satisfies ButtonStory;

export default meta;
