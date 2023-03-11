<template>
  <sidebar></sidebar>
  <div class="main-container">
    <navbar></navbar>
    <main-content></main-content>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/navbar.vue";
import Sidebar from "@/views/Layout/components/sidebar.vue";
import MainContent from "@/views/Layout/components/mainContent.vue";
</script>

<style scoped lang="scss">
.main-container {
  margin-left: 240px;
}
</style>
