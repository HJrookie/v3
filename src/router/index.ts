import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";

import Layout from "@/views/Layout/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "",
    redirect: "/codeGen",
    meta: {},
    component: Layout,
    // component: () => import("@/views/Layout/index.vue"),
    children: [
      {
        path: "/index",
        component: () => import("@/views/index.vue"),
        name: "Index",
        meta: { title: "首页", icon: "dashboard" },
      },
      {
        path: "/exams",
        component: () => import("@/views/exams/index.vue"),
        name: "Index",
        meta: { title: "exams", icon: "dashboard" },
      },
      {
        path: "/codeGen",
        component: () => import("@/views/codeGen/index.vue"),
        name: "codeGen",
        meta: { title: "exams", icon: "dashboard" },
      },
      {
        path: "/examples",
        component: () => import("@/views/examples/index.vue"),
        name: "examples",
        meta: { title: "examples", icon: "dashboard" },
      },
      {
        path: "/test",
        component: () => import("@/views/codeGen/test.vue"),
        name: "examples",
        meta: { title: "examples", icon: "dashboard" },
      },
    ],
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
