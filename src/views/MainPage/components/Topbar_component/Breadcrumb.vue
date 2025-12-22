<template>
  <el-icon style="margin-right: 10px;" @click="changeIcon()">
    <component :is="settingsStore.isFold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in routeObj.matched" :key="index" :to="item.path">
      <el-icon style="margin: 0 5px; vertical-align: top;"><component :is="item.meta.icon"></component></el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue'
import { useSettingsStore } from '../../../../stores/settings';

const routeObj = useRoute()
const settingsStore = useSettingsStore()
const changeIcon = () => {
  settingsStore.toggleFold()
}
</script>

<style lang="scss" scoped>

</style>