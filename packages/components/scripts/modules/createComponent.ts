import { prettier } from "../libs";
import * as fs from "fs";
import * as path from "path";
import * as process from "process";

function generateComponentFileContent(name: string) {
  return prettier(
    `
<script setup lang="ts">
export interface ${name}Props {}
defineProps<${name}Props>()

</script>
<template>
  <div>${name} component</div>
</template>
`,
    { parser: "vue" }
  );
}

function generateIndexFileContent(name: string) {
  return prettier(`
import ${name} from './${name}.vue'
import type {${name}Props} from './${name}.vue'


export { ${name} }
export type { ${name}Props };
export default ${name}
`);
}

function generateStoryFileContent(name: string) {
  return prettier(`
import type { Meta, StoryObj } from '@storybook/vue3';
import ${name} from './${name}.vue';

const meta = {
    title: '${name}',
    parameters: { layout: 'centered' },
    component: ${name},
} satisfies Meta<typeof ${name}>;

type ${name}Story = StoryObj<typeof ${name}>;

export const Default = {
} satisfies ${name}Story;

export default meta;
`);
}

const componentName = process.argv[2] || "";

if (!componentName) {
  console.error("Error: Argument is missing");
  process.exit(1);
}

const categoryDir = path.join(__dirname, "../..", "src", "components");

const componentDir = path.join(categoryDir, componentName);

if (fs.existsSync(componentDir)) {
  console.error(
    `\x1b[31mError: Component ${componentName} already exists\x1b[0m`
  );
  process.exit(1);
}

const componentFiles = [
  // The index file
  {
    fileName: path.join(componentDir, "index.ts"),
    fileContent: generateIndexFileContent(componentName),
  },
  // The component file
  {
    fileName: path.join(componentDir, `${componentName}.vue`),
    fileContent: generateComponentFileContent(componentName),
  },
  // The story file
  {
    fileName: path.join(componentDir, `${componentName}.stories.ts`),
    fileContent: generateStoryFileContent(componentName),
  },
];

let progress = "#";

// Creation of the component's directory
process.stdout.write(
  `[${progress}${" ".repeat(10 - progress.length)}] 🏭 Creating the component's directory...\n`
);

fs.mkdirSync(componentDir);

// Creation of the component's files
componentFiles.forEach(async ({ fileName, fileContent }) => {
  progress += "###";
  process.stdout.write(
    `\r[${progress}${" ".repeat(10 - progress.length)}] 🏭 Creating the component's files...`
  );
  fs.writeFileSync(fileName, await fileContent);
});

console.log();
