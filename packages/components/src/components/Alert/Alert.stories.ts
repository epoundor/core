import type { Meta, StoryObj } from "@storybook/vue3";
import Alert from "./Alert.vue";

const meta = {
  title: "Alert",
  parameters: { layout: "centered" },
  component: Alert,
  args: {
    title: "Info alert! Change a few things up and try submitting again.",
  },
} satisfies Meta<typeof Alert>;

type AlertStory = StoryObj<typeof Alert>;

export const Default = {} satisfies AlertStory;

export default meta;

export const WithIcon = {
  args: {
    title: "Info alert! Change a few things up and try submitting again.",
    type: "info",
    closable: false,
    icon: true,
  },
} satisfies AlertStory;

export const Bordered = {
  args: {
    title: "Info alert! Change a few things up and try submitting again.",
    type: "info",
    closable: false,
    icon: false,
    border: true,
  },
} satisfies AlertStory;

export const WithList = {
  args: {
    type: "info",
  },

  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `
          <Alert v-bind="args" >
             <span class="font-medium">Ensure that these requirements are met:</span>
            <ul class="mt-1.5 ml-4 list-disc list-inside">
                <li>At least 10 characters (and up to 100 characters)</li>
                <li>At least one lowercase character</li>
                <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
            </ul>
          </Alert>
        `,
  }),
} satisfies AlertStory;

export const Dismissible = {
  args: {
    title: "Warning",
    type: "warning",
    closable: true,
    icon: false,
    border: false,
  },
} satisfies AlertStory;

export const AdditonalContent = {
  args: {
    type: "info",
  },

  render: (args) => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `
          <Alert v-bind="args" >
              <template #icon>
      <svg
        class="flex-shrink-0 w-4 h-4 mr-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span class="sr-only">Info</span>
    </template>
    <template #title>
      <h3 class="text-lg font-medium">
        This is a info alert
      </h3>
    </template>
    <template #default="{ onCloseClick }">
      <div class="mt-2 mb-4 text-sm">
        More info about this info alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.
      </div>
      <div class="flex">
        <button
          type="button"
          class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            class="-ml-0.5 mr-2 h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 14"
          >
            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
          </svg>
          View more
        </button>
        <button
          type="button"
          class="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800"
          data-dismiss-target="#alert-additional-content-1"
          aria-label="Close"
          @click="onCloseClick"
        >
          Dismiss
        </button>
      </div>
    </template>
          </Alert>
        `,
  }),
} satisfies AlertStory;
