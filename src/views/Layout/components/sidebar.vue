<template>
  <div class="sidebar">
    <div class="title"></div>
    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
      <el-sub-menu index="1">
        <template #title>
          <svg-icon name="verifyCode" />
          <span>Navigator One</span>
        </template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="2">
        <template #title>
          <svg-icon name="verifyCode" />
          <span>Navigator One</span>
        </template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { Document, Menu as IconMenu, Location, Setting, UserFilled } from "@element-plus/icons-vue";
const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
<style lang="scss" scoped>
.sidebar {
  //background: gray;
  position: fixed;
  height: 100%;
  width: 240px;
  .title {
    height: 40px;
  }
}
</style>
