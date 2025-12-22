<template>
  <div class="main">
    <!-- 左侧菜单 -->
     <div class="slider">
        <Logo />
        <!-- 菜单区域 -->
        <el-scrollbar class="scroll_bar">
          <!-- 根据路由动态生成菜单 -->
          <el-menu background-color="#001529" text-color="white" router>
            <SideMenu :menuList="userStore.routesList"/>
          </el-menu>
        </el-scrollbar>
     </div>
     <!-- 顶部导航 -->
      <div class="topbar">

      </div>
      <!-- 内容展示区 -->
       <div class="content">
        <router-view />
       </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Logo from './components/Logo.vue';
import SideMenu from './components/SideMenu.vue';
import Screen from './components/Screen.vue';
import { useUserStore } from '../../stores/user';

let userStore = useUserStore();
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: 100vh;
    color: white;
    .slider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background-color;
        .scroll_bar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
            .el-menu {
                border-right: none;
            }
        }
    }
    .topbar {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        background-color: red;
    }
    .content {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        top: $base-tabbar-height;
        left: $base-menu-width;
        background-color: yellowgreen;
        padding: 20px;
        overflow-y: auto;
    }
}
</style>