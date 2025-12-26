<template>
  <el-card>
    <el-form inline>
        <el-form-item label="一级分类">
            <el-select v-model="categoryStore.c1id" placeholder="Select" style="width: 180px" @change="getC2">
              <el-option v-for="item in categoryStore.c1List" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <el-select v-model="categoryStore.c2id" placeholder="Select" style="width: 180px" @change="getC3">
              <el-option v-for="item in categoryStore.c2List" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
             <el-select v-model="categoryStore.c3id" placeholder="Select" style="width: 180px">
              <el-option v-for="item in categoryStore.c3List" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {useCategoryStore} from '../stores/category'

let categoryStore = useCategoryStore()
onMounted(() => {
  categoryStore.getC1()
})
const getC2 = () => {
  categoryStore.c2id = ''
  categoryStore.c3id = ''
  categoryStore.c3List = []
  categoryStore.getC2()
}
const getC3 = () => {
  categoryStore.c3id = ''
  categoryStore.getC3()
}
</script>

<style lang="scss" scoped>

</style>