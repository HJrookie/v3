<template>
  <transition name="fade-transform" mode="out-in">
    <router-view />
  </transition>
  <!--    <router-view>-->
  <!--      &lt;!&ndash;      <transition name="fade-transform" mode="out-in">&ndash;&gt;-->
  <!--      &lt;!&ndash;        <keep-alive :include="tagsViewStore.cachedViews">&ndash;&gt;-->
  <!--      &lt;!&ndash;          <component v-if="!route.meta.link" :is="Component" :key="route.path"/>&ndash;&gt;-->
  <!--      &lt;!&ndash;        </keep-alive>&ndash;&gt;-->
  <!--      &lt;!&ndash;      </transition>&ndash;&gt;-->
  <!--    </router-view>-->
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 17px;
  }
}
</style>
