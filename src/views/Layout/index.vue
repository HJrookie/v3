<template>
  <sidebar></sidebar>
  <div class="main-container">
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
</script>

<style scoped lang="scss">
.main-container {
  height: 100%;
  //width: 100%;
  margin-left: 240px;
  .main-content {
    height: 100%;
    width: 100%;
    padding: 20px;
  }
}
</style>
