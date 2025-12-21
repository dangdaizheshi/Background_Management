<template>
  <div class="main">
    <!-- 左侧菜单 -->
     <div class="slider">
        <Logo />
     </div>
     <!-- 顶部导航 -->
      <div class="topbar">

      </div>
      <!-- 内容展示区 -->
       <div class="content">
        <p style="height: 6000px; background: pink;">787887</p>
       </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Logo from './components/Logo.vue';
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: 100vh;
    .slider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background-color;
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
        background-color: blue;
        padding: 20px;
        overflow-y: auto;
    }
}
</style>