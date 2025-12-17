<template>
  <el-container>
    <el-header>
      <f-header />
    </el-header>
    <el-container>
      <el-aside>
        <f-side />
      </el-aside>
      <el-main>
        <f-tag-list />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import FHeader from './components/FHeader.vue'
import FSide from './components/FSide.vue'
import FTagList from './components/FTagList.vue'
</script>

<style lang="scss" scoped>

</style>
