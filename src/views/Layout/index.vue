<template>
  <sidebar></sidebar>
  <div class="main-container" :style="{ 'margin-left': (collapsed ? 64 : 240) + 'px' }">
    <navbar></navbar>
    <div class="main-content">
      <main-content></main-content>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/navbar.vue";
import Sidebar from "@/views/Layout/components/sidebar.vue";
import MainContent from "@/views/Layout/components/mainContent.vue";
import { storeToRefs } from "pinia";
import useAppStore from "@/store/app";
const store = useAppStore();
const { collapsed } = storeToRefs(store);
</script>

<style scoped lang="scss">
.main-container {
  height: 100%;
  //width: 100%;
  margin-left: 240px;
  transition: all linear 0.5s;
  .main-content {
    height: 100%;
    width: 100%;
    padding: 20px;
  }
}
</style>
