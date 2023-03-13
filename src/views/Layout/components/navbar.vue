<template>
  <div class="navbar">
    <div class="icon" @click="store.toggle">
      <!--      <svg-icon name="verifyCode" @click="store.toggle"></svg-icon>-->
      <!--      <el-icon @click="store.toggle" color="#aaa"><DArrowLeft /></el-icon>-->
      <svg  class="hamburger" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
        <path
          d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
        />
      </svg>
    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper" @click="">
          <img :src="avatar" class="user-avatar" />
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item divided @click.native="logout"><span>退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { ref } from "vue";
import useAppStore from "@/store/app";
const store = useAppStore();

const avatar = ref(new URL("@/assets/images/avator.svg", import.meta.url).href);
const logout = () => {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      console.log(3232);
    })
    .catch(() => {});
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .icon {
    height: 100%;
    line-height: 50px;
    font-size: 20px;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    padding: 0 15px;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
  .info-msg {
    line-height: 46px;
    height: 100%;
    font-size: 24px;
    float: right;
    margin-right: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background 0.3s;
    padding: 9px 6px 0;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }

    ::v-deep {
      .el-badge__content.is-fixed {
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
        -webkit-transform: translateY(0%) translateX(100%);
        -moz-transform: translateY(0%) translateX(100%);
        -ms-transform: translateY(0%) translateX(100%);
        -o-transform: translateY(0%) translateX(100%);
        transform: translateY(0%) translateX(100%);
      }
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 20px;

      .avatar-wrapper {
        /*margin-top: 5px;*/
        //padding-top: 9px;
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        .user-avatar {
          cursor: pointer;
          width: 24px;
          height: 24px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -18px;
          top: 30px;
          font-size: 12px;
        }
      }
    }
  }
}
.el-collapse.nav-notice {
  .file {
    color: #409eff;
    cursor: pointer;
  }
}
</style>
