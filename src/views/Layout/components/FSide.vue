<template>
  <div class="f_side">
    <el-scrollbar height="100%">
      <el-menu
        class="el-menu-vertical-demo"
        router
      >
        <template v-for="(item, index1) in userStore.menus" :key="index1">
          <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
            <template #title>
              <el-icon><component :is="item.icon"></component></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(item2, index2) in item.child" :index="item2.frontpath">
              <template #title>
                <el-icon><component :is="item2.icon"></component></el-icon>
                <span>{{ item2.name }}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item v-else :index="item.frontpath">
            <template #title>
              <el-icon><component :is="item.icon"></component></el-icon>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { useUserStore } from '../../../stores/user';

const userStore = useUserStore();
onMounted(() => {
  userStore.setMenus();
});
</script>

<style lang="scss" scoped>
.f_side {
  position: fixed;
  width: $base-menu-width;
  height: calc(100vh - 64px);
  top: 64px;
  left: 0;
  .el-menu {
    border-right: 0;
  }
}
</style>
