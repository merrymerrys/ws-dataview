import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  base: "/ws-dataview/",

  lang: "zh-CN",
  title: "ws-dataview",
  description: "merry 今天醒来是几点",

  dest: "./docs",

  theme,

  plugins: [
    searchProPlugin({
      indexContent: true,
    }),
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});
