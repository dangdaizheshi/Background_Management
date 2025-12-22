<template>
  <el-card>
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <el-table border style="width: 100%; margin: 20px 0;">
      <el-table-column label="序号" width="80px" align="center"/>
      <el-table-column label="品牌名称" width="180" />
      <el-table-column label="品牌LOGO" />
      <el-table-column label="品牌操作" />
    </el-table>
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[1, 2, 3, 4, 5]"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="40"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let currentPage4 = ref<number>(1)
let pageSize4 = ref<number>(3)
</script>

<style lang="scss" scoped>

</style>
