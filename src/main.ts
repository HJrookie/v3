import { createApp } from "vue";
import App from "./App.vue";
import SvgIcon from "@/components/SvgIcon/index.vue"; // svg component
import "element-plus/dist/index.css";
import "@/assets/styles/index.scss"; // global css
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "virtual:svg-icons-register";
import store from "@/store";
import router from "./router";
import { createPinia } from "pinia";
const pinia = createPinia();

const app = createApp(App);
app.component("svg-icon", SvgIcon);

window.l = console.log;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(pinia).use(router).mount("#app");
