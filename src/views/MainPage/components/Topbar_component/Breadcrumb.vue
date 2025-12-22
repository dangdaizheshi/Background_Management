<template>
  <el-icon style="margin-right: 10px;" @click="changeIcon()"><Expand /></el-icon>
  <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
const changeIcon = () => {
  
}
</script>

<style lang="scss" scoped>

</style>