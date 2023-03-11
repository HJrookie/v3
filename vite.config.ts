import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
      // Specify symbolId format
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
    //
    // extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://10.103.237.163/",
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});
