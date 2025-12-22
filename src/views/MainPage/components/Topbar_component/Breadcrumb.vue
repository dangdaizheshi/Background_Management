<template>
  <el-icon style="margin-right: 10px;" @click="changeIcon()">
    <component :is="settingsStore.isFold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue'
import { useSettingsStore } from '../../../../stores/settings';

const settingsStore = useSettingsStore()
const changeIcon = () => {
  settingsStore.toggleFold()
}
</script>

<style lang="scss" scoped>

</style>