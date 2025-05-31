import type { Meta, StoryObj } from '@storybook/vue3';
import Menu from './Menu.vue';
import MenuButton from './MenuButton.vue';
import MenuItems from './MenuItems.vue';
import MenuItem from './MenuItem.vue';

const meta = {
    title: 'Menu',
    parameters: { layout: 'centered' },
    component: Menu,
    render: (args) => ({
        components: { Menu, MenuButton, MenuItems, MenuItem },
        setup() {
            return { args };
        },
        template: `
          <Menu v-bind="args" class="relative inline-block text-left">
            <MenuButton  
                class="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-black hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
                Button
            </MenuButton>
            <MenuItems  
                class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            > 
                <MenuItem v-slot="{ active }">
                <button
                    :class="[
                    active ? 'bg-violet-500 text-white' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                >
                    Archive
                </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <button
                    :class="[
                    active ? 'bg-violet-500 text-white' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                >
                    Disarchive
                </button>
                </MenuItem>
            </MenuItems>
          </Menu>
        `
    })
} satisfies Meta<typeof Menu>;

type MenuStory = StoryObj<typeof Menu>;

export const Default = {
    args: { as: 'div' }
} satisfies MenuStory;

export default meta;
