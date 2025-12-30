<template>
  <el-card style="height: 80px;">
    <el-form inline class="form">
      <el-form-item label="角色名称">
        <el-input placeholder="角色名称" v-model="inputData"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="!inputData" @click="search">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 15px 0;"> 
    <el-button type="primary" @click="addUser" icon="Plus">添加角色</el-button>
    <el-table style="margin: 10px 0;" border :data="roleArr" @selection-change="handleSelectionChange">
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="id" align="center" prop="id"></el-table-column>
      <el-table-column label="用户名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" icon="User" @click="assignRole(scope.row)">分配权限</el-button>
          <el-button type="danger" size="small" icon="Edit" @click="updateUser(scope.row)">编辑</el-button>
          <el-popconfirm title="您确定要删除该用户吗？" @confirm="deleteUser(scope.row.id)">
            <template #reference>
              <el-button type="warning" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      background
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="total"
      @size-change="getAllRole(1)"
      @current-change="getAllRole"
    />
  </el-card>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配菜单与按钮的权限</h4>
    </template>
    <template #default>
      <el-tree
        ref="tree"
        :data="menuArr"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="selectedMenuArr"
        :props="defaultProps"
        default-expand-all
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="handler">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type {AllRoleResponseData, MenuResponseData, MunuData} from '../../../apis/acl/role/type'
import type {RoleData} from '../../../apis/acl/user/type'
import {reqGetAllRole, reqGetAllPermission, reqSetPermission} from '../../../apis/acl/role/index'
import { ElMessage } from 'element-plus'
const drawer = ref<boolean>(false)
const pageNo = ref<number>(1)
const pageSize = ref<number>(7)
const total = ref<number>(0)
const inputData = ref<string>('')
const roleArr = ref<RoleData[]>([])
let roleParams = ref<RoleData>({})
let selectedMenuArr = ref<number[]>([])
let tree = ref<any>()
const getAllRole = async (pager = 1) => {
  pageNo.value = pager
  const res: AllRoleResponseData = await reqGetAllRole(pageNo.value, pageSize.value, inputData.value)
  if (res.code === 200) {
    roleArr.value = res.data.records
    total.value = res.data.total
  }
}
const assignRole = async (role: RoleData) => { 
  Object.assign(roleParams.value, role)
  const res: MenuResponseData = await reqGetAllPermission(role.id!)
  if (res.code === 200) {
    selectedMenuArr.value = []
    menuArr.value = res.data
    dfsMenuArr(menuArr.value)
    drawer.value = true
  }
}

// 树形组件部分
let menuArr = ref<MunuData[]>([])
const dfsMenuArr = (nowData: MunuData[]) => {
  nowData.forEach(item => {
    if (item.children) {
      dfsMenuArr(item.children)
    }
    else {
      if(item.select === true) selectedMenuArr.value.push(item.id)
    }
  })
}
const defaultProps = {
  children: 'children',
  label: 'name',
}
const search = () => { 
  getAllRole()
  inputData.value = ''
}
const handler = async () => {
  let arr1 = tree.value.getCheckedKeys()
  let arr2 = tree.value.getHalfCheckedKeys()
  let arr = [...arr1, ...arr2]
  const res: any = await reqSetPermission(roleParams.value.id!, arr)
  if (res.code === 200) {
    ElMessage.success("分配权限成功")
    drawer.value = false
    window.location.reload()
  }
}
onMounted(() => {
  getAllRole()
})
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