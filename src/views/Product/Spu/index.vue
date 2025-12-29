<template>
  <div class="spu_container">
    <TopCategory />
    <el-card style="margin: 15px 0;">
      <div v-show="scene === 0">
        <el-button type="primary" icon="Plus" :disabled="categoryStore.c3id ? false : true" @click="addSpu">添加SPU</el-button>
        <el-table border style="margin: 15px 0;" :data="records">
          <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" icon="Plus" size="small" title="添加SKU"></el-button>
              <el-button type="warning" icon="Edit" size="small" title="编辑SPU" @click="updateSpu(scope.row)"></el-button>
              <el-button type="info" icon="View" size="small" title="查看SKU"></el-button>
              <el-button type="danger" icon="Delete" size="small" title="删除SPU"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          background
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @size-change="getHasSpu"
          @current-change="getHasSpu"
        />
      </div>
      <SpuForm ref="Spu" v-show="scene === 1" @changeScene="changeScene" />
      <SkuForm v-show="scene === 2"/>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { SpuData, HasSpuResponseData } from '../../../apis/product/spu/type'
import { ref, reactive, watch, onMounted } from 'vue'
import TopCategory from '../../../components/TopCategory.vue';
import { useCategoryStore } from '../../../stores/category'
import { reqHasSpu } from '../../../apis/product/spu/index'
import SkuForm from './components/SkuForm.vue';
import SpuForm from './components/SpuForm.vue';

const categoryStore = useCategoryStore()
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
let scene = ref<number>(0)
let records = ref<SpuData[]>([])
const Spu = ref<any>()
const changeScene = (val: number) => {
  scene.value = val
}
const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  const res: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3id)
  records.value = res.data.records
  total.value = res.data.total
}
watch(() => categoryStore.c3id, () => {
  if(!categoryStore.c3id) return
  getHasSpu()
})
const addSpu = () => {
  scene.value = 1
}
const updateSpu = (row: SpuData) => {
  scene.value = 1
  Spu.value.initSpuData(row)
}
</script>

<style lang="scss" scoped>

</style>