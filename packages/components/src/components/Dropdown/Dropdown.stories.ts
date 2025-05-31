import type { Meta, StoryObj } from '@storybook/vue3';
import Dropdown from './Dropdown.vue';

const meta = {
    title: 'Dropdown',
    parameters: { layout: 'centered' },
    component: Dropdown,
    args: {
        options: [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' }
        ]
    }
} satisfies Meta<typeof Dropdown>;

type DropdownStory = StoryObj<typeof Dropdown>;

export const Default = {
} satisfies DropdownStory;
export const Small = {
    args: {
        size: 'small'
    }
} satisfies DropdownStory;
export const Floating = { args: { style: 'floating' } } satisfies DropdownStory;

export default meta;
