import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// import Layout from "@/views/Layout/index";

const routes: RouteRecordRaw[] = [
  {
    path: "",
    // redirect: "",
    meta: {},
    // component: () => import("@/views/Layout/index"),
    component: () => import("@/views/Layout/index.vue"),
    children: [],
  },
  {
    path: "/login",
    // redirect: "",
    meta: {},
    // component: () => import("@/views/Layout/index"),
    // 如果不加 vue 拓展 则无法正确引入 vue 组件
    component: () => import("@/views/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(""),
  routes: routes,
  // 其他配置...
});

export default router;
