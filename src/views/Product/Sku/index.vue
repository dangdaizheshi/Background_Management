<template>
  <el-card>
    <el-table style="margin: 10px 0;" border :data="skuArr">
      <el-table-column label="序号" align="center" type="index" width="80px"></el-table-column>
      <el-table-column label="名称" align="center" prop="" show-overflow-tooltip width="200px"></el-table-column>
      <el-table-column label="描述" align="center" prop="" show-overflow-tooltip width="200px"></el-table-column>
      <el-table-column label="默认图片" align="center" prop="" width="200px"></el-table-column>
      <el-table-column label="重量(g)" align="center" prop="" show-overflow-tooltip width="200px"></el-table-column>
      <el-table-column label="价格(元)" align="center" prop="" show-overflow-tooltip width="200px"></el-table-column>
      <el-table-column label="操作" width="300px" align="center" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" icon="User"></el-button>
          <el-button type="danger" size="small" icon="Edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      background
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="getAllUser"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
let pageNo = ref(1)
let pageSize = ref(5)
</script>

<style lang="scss" scoped>

</style>