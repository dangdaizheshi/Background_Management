<template>
  <el-card>
    <el-form inline>
        <el-form-item label="一级分类">
            <el-select placeholder="Select" style="width: 180px">
              <el-option v-for="(item, index) in c1List" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <el-select>
              <el-option label="北极"></el-option>
              <el-option label="广州"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
            <el-select>
              <el-option label="北极"></el-option>
              <el-option label="广州"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {reqCategory1List , reqCategory2List , reqCategory3List} from '../apis/product/attr/attr'

const c1List = ref<any>([])
const getC1 = async() => { 
  const res = await reqCategory1List()
  c1List.value = res.data
}
onMounted(() => {
  getC1()
})
</script>

<style lang="scss" scoped>

</style>