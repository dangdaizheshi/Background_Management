<template>
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
let drawer1 = ref(true)
let checkedAll = ref(false)
let indeterminate = ref(false)
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

</style>