<template>
  <el-card style="height: 80px;">
    <el-form inline class="form">
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 15px 0;"> 
    <el-button type="primary">添加用户</el-button>
    <el-button type="warning">批量删除</el-button>
    <el-table style="margin: 10px 0;" border>
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center"></el-table-column>
      <el-table-column label="id" align="center"></el-table-column>
      <el-table-column label="用户名字" align="center"></el-table-column>
      <el-table-column label="用户名称" align="center"></el-table-column>
      <el-table-column label="用户角色" align="center"></el-table-column>
      <el-table-column label="创建时间" align="center"></el-table-column>
      <el-table-column label="更新时间" align="center"></el-table-column>
      <el-table-column label="操作" width="260px" align="center">
        <template #default="scope">
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
          <el-button type="warning" size="mini">分配角色</el-button>
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
      @current-change="handleCurrentChange"
    />
  </el-card>
  <el-drawer v-model="drawer1">
    <template #header>
      <h4>分配用户角色</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox v-model="checkedAll" :indeterminate="indeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(city, index) in cities" :label="city" :key="index">
              {{ city }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let drawer1 = ref<boolean>(true)
let checkedAll = ref<boolean>(false)
let indeterminate = ref<boolean>(false)
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Hangzhou', 'Wuhan', 'Nanjing', 'Chongqing', 'Tianjin', 'Kunming']
const checkedCities = ref(['Shanghai', 'Beijing'])

const handleCheckAllChange = (val: boolean) => {
  val ? (checkedCities.value = cities) : (checkedCities.value = [])
  indeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkedAll.value = checkedCount === cities.length
  indeterminate.value = !(checkedCount > 0 && checkedCount < cities.length)
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>