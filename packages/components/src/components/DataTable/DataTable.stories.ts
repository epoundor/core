import type { Meta, StoryObj } from '@storybook/vue3';
import DataTable from './DataTable.vue';

const meta = {
    title: 'DataTable',
    parameters: { layout: 'centered' },
    component: DataTable
} satisfies Meta<typeof DataTable>;

type DataTableStory = StoryObj<typeof DataTable>;

export const Default = {} satisfies DataTableStory;

export default meta;
