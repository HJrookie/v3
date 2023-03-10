import { createApp } from "vue";
import App from "./App.vue";
import SvgIcon from "@/components/SvgIcon/index.vue"; // svg component
import 'element-plus/dist/index.css';
import "@/assets/styles/index.scss"; // global css

import router from "./router";

const app = createApp(App);
app.component("svg-icon", SvgIcon);

window.l = console.log;

app.use(router).mount("#app");
