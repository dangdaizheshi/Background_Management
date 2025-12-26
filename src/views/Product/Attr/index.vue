<template>
  <TopCategory />
  <div class="attr_ody">
    <el-card style="margin: 10px 0;">
      <div class="card_1" v-show="scene === 0">
        <el-button type="primary" icon="Plus" @click="addAttr" :disabled="categoryStore.c3id ? false : true">添加属性</el-button>
        <el-table border style="margin: 10px 0;" :data="attrList">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="属性名称" align="center" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template #default="scope">
              <el-tag v-for="item in scope.row.attrValueList" :key="item.id" style="margin: 5px;">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="140px">
            <template #default="scope">
              <el-button type="warning" icon="Edit" size="small" @click="updateTable"></el-button>
              <el-button type="danger" icon="Delete" size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="card_2" v-show="scene === 1">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="Plus">添加属性</el-button>
        <el-button @click="cancelAdd()">取消</el-button>
        <el-table border style="margin: 10px 0;">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="属性值名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="120px"></el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="cancelAdd()">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import TopCategory from '../../../components/TopCategory.vue';
import { ref, watch } from 'vue';
import { useCategoryStore } from '../../../stores/category';
import {reqAttrList} from '../../../apis/product/attr/attr'
import { ElMessage } from 'element-plus';
import type { Attr, AttrResponseData } from '../../../apis/product/attr/type'
const categoryStore = useCategoryStore()
let scene = ref(0)
const attrList = ref<Attr[]>([])

watch(() => categoryStore.c3id, () => {
  attrList.value = []
  const {c1id, c2id, c3id} = categoryStore
  if(!c3id) return
  reqAttrList(c1id, c2id, c3id).then(res => {
    attrList.value = res.data
  }).catch(err => {ElMessage.error('获取属性列表失败')})
})
const addAttr = () => {
  scene.value = 1
}
const updateTable = () => {
  scene.value = 1
}
const cancelAdd = () => {
  scene.value = 0
}
</script>

<style lang="scss" scoped>

</style>