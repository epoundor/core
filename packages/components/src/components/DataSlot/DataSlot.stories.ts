import type { Meta, StoryObj } from '@storybook/vue3';
import DataSlot from './DataSlot.vue';

const meta = {
    title: 'DataSlot',
    parameters: { layout: 'centered' },
    component: DataSlot
} satisfies Meta<typeof DataSlot>;

type DataSlotStory = StoryObj<typeof DataSlot>;

export const Default = {} satisfies DataSlotStory;

export default meta;
