import type { Meta, StoryObj } from '@storybook/vue3';
import Input from './Input.vue';

const meta = {
    title: 'Input',
    parameters: { layout: 'centered' },
    component: Input
} satisfies Meta<typeof Input>;

type InputStory = StoryObj<typeof Input>;

export const Default = {} satisfies InputStory;

export default meta;
