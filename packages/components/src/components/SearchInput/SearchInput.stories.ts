import type { Meta, StoryObj } from '@storybook/vue3';
import SearchInput from './SearchInput.vue';

const meta = {
    title: 'SearchInput',
    parameters: { layout: 'centered' },
    component: SearchInput
} satisfies Meta<typeof SearchInput>;

type SearchInputStory = StoryObj<typeof SearchInput>;

export const Default = {} satisfies SearchInputStory;

export default meta;
