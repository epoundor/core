import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "epoundor-ui",
      fileName: "epoundor-ui",
      formats: ["es", "cjs"],
    },

    outDir: "build",

    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    dedupe: ["vue"],
    alias: {
      src: resolve("src/"),
    },
  },
  plugins: [vue(), dts(),
  tailwindcss(),

  ],
});
