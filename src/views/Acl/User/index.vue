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
          <el-checkbox>全选</el-checkbox>
          <el-checkbox-group>
            <el-checkbox v-for="city in 10">
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

</script>

<style lang="scss" scoped>

</style>