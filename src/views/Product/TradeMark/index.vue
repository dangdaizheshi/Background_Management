<template>
  <el-card>
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <el-table border style="width: 100%; margin: 20px 0;" :data="trademarkList">
      <el-table-column label="序号" width="80px" align="center" type="index" index/>
      <el-table-column label="品牌名称" prop="tmName"/> 
      <el-table-column label="品牌LOGO">
        <template #default="scope">
          <img :src="scope.row.logoUrl" alt="没有图片" style="width: 100px; height: 100px;">
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #default="scope">
          <el-button type="primary" icon="Edit" size="small"></el-button>
          <el-button type="danger" icon="Delete" size="small"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[1, 2, 3, 4, 5]"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
      @current-change="getTrademarkList"
      @size-change="getTrademarkList"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {reqTrademarkList} from '../../../apis/product/trademark/trademark'
import type {TradeMark, TradeMarkResponseData} from '../../../apis/product/trademark/type'

let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
let trademarkList = ref<TradeMark>([])
let total = ref<number>(0)
const getTrademarkList = async(pager: number = 1) => {
  currentPage.value = pager
  const res: TradeMarkResponseData = await reqTrademarkList(currentPage.value, pageSize.value)
  if(res.code === 200) {
    trademarkList.value = res.data.records
    total.value = res.data.total
  }
}
onMounted(() => {
  getTrademarkList()
})
</script>

<style lang="scss" scoped>

</style>
