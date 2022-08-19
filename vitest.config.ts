/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "vite-preset-react";

// https://vitest.dev/config/#configuration
export default defineConfig({
  plugins: [react({ removeDevtoolsInProd: true, injectReact: true })],
  test: {
    globals: false,
    environment: "jsdom",
  },
});
