<template>
  <TopCategory />
  <div class="attr_ody">
    <el-card style="margin: 10px 0;">
      <div class="card_1" v-show="scene === 0">
        <el-button type="primary" icon="Plus" @click="addAttr">添加属性</el-button>
        <el-table border style="margin: 10px 0;">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="属性名称" align="center" width="120px"></el-table-column>
          <el-table-column label="属性值名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="120px">
            <template #default="scope">
              <el-button type="primary" icon="Edit" size="small" @click="updateTable"></el-button>
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

<script setup>
import TopCategory from '../../../components/TopCategory.vue';
import { ref } from 'vue';

let scene = ref(0)
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