import { defineConfig } from "vite";
import react from "vite-preset-react";

import vitePluginImp from 'vite-plugin-imp';
import { getThemeVariables } from 'antd/dist/theme';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ removeDevtoolsInProd: true, injectReact: true }),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      // { find: '@', replacement: path.resolve(__dirname, 'src') },
      // fix less import by: @import ~
      // https://github.com/vitejs/vite/issues/2185#issuecomment-784637827
      { find: /^~/, replacement: '' },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: { 'primary-color': '#13c2c2' },
        modifyVars: getThemeVariables({
          // dark: true,
          // compact: true,
        }),
        javascriptEnabled: true,
      },
    },
  },
});
