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
    <el-button type="primary" @click="addUser">添加用户</el-button>
    <el-button type="warning" @click="deleteBatchUser" :disabled="deleteBatchArr.length ? false : true">批量删除</el-button>
    <el-table style="margin: 10px 0;" border :data="userArr" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="id" align="center" prop="id"></el-table-column>
      <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" icon="User" @click="updateRole(scope.row)">分配角色</el-button>
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
      @size-change="handleSizeChange"
      @current-change="getAllUser"
    />
  </el-card>
  <el-drawer v-model="drawer1">
    <template #header>
      <h4>分配用户角色</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="userParams.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox v-model="checkedAll" :indeterminate="indeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(item, index) in roles" :label="item" :key="index">
              {{ item.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="addRole">confirm</el-button>
      </div>
    </template>
  </el-drawer>
  <el-drawer v-model="drawer2">
    <template #header>
      <h4>{{ userParams.id ? "更新用户" : "添加用户" }}</h4>
    </template>
    <template #default>
      <el-form :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用户姓名" prop="username">
          <el-input placeholder="请您输入用户姓名" v-model="userParams.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input placeholder="请您输入用户昵称" v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-show="!userParams.id">
          <el-input placeholder="请您输入用户密码" v-model="userParams.password"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import type { UserResponseData, User, RoleResponseData, RoleData, addRoleData } from '../../../apis/acl/user/type'
import {reqGetAllUser, reqAddOrUpdateUser, reqGetUserRoles, reqAssignRoles, reqDeleteUser, reqDeleteBatchUser} from '../../../apis/acl/user/index'
import { ElMessage } from 'element-plus'
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let drawer1 = ref<boolean>(false)
let drawer2 = ref<boolean>(false)
let checkedAll = ref<boolean>(false)
let indeterminate = ref<boolean>(false)
let total = ref<number>(0)
let userArr = ref<User[]>([])
// 这个数组存储要批量删除的用户id
let deleteBatchArr = ref<number[]>([])
const userParams = reactive<User>({
  username: '',
  name: '',
  password: ''
})
const formRef = ref()
const roles = ref<RoleData[]>([])
const checkedRoles = ref<RoleData[]>([])

const handleSelectionChange = (val: User[]) => {
  deleteBatchArr.value = val.map(item => item.id!)
}
const handleCheckAllChange = (val: boolean) => {
  val ? (checkedRoles.value = roles.value) : (checkedRoles.value = [])
  indeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkedAll.value = checkedCount === roles.value.length
  indeterminate.value = !(checkedCount > 0 && checkedCount < roles.value.length)
}
const getAllUser = async (pager = 1) => {
  pageNo.value = pager
  const res: UserResponseData = await reqGetAllUser(pageNo.value, pageSize.value)
  if (res.code === 200) {
    userArr.value = res.data.records
    total.value = res.data.total
  }
}
const handleSizeChange = () => {
  getAllUser(1)
}
const addUser = () => {
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: ''
  })
  drawer2.value = true
  formRef.value?.resetFields()
}
const updateUser = (row: User) => {
  formRef.value?.clearValidate()
  Object.assign(userParams, row)
  drawer2.value = true
}
const deleteUser = async(id: number) => {
  const res: any = await reqDeleteUser(id)
  if (res.code === 200) {
    ElMessage.success("删除成功")
    getAllUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}
const deleteBatchUser = async() => {
  const res: any = await reqDeleteBatchUser(deleteBatchArr.value)
  if (res.code === 200) {
    ElMessage.success("批量删除成功")
    getAllUser()
  }
}
const updateRole = async(row: User) => {
  Object.assign(userParams, row)
  const res: RoleResponseData = await reqGetUserRoles(row.id as number)
  if (res.code === 200) {
    roles.value = res.data.allRolesList
    checkedRoles.value = res.data.assignRoles
    drawer1.value = true
  }
}
const addRole = async() => { 
  const reqData: addRoleData = {
    roleIdList: checkedRoles.value.map(item => item.id!),
    userId: userParams.id!
  }
  const res: any = await reqAssignRoles(reqData)
  if (res.code === 200) {
    ElMessage.success("分配角色成功")
    drawer1.value = false
    getAllUser(pageNo.value)
  }
}
const save = async() => {
  await formRef.value.validate()
  reqAddOrUpdateUser(userParams).then(res => {
    ElMessage.success(userParams.id ? "修改成功" : "添加成功")
    getAllUser(userParams.id ? pageNo.value : 1)
    drawer2.value = false
  }).catch(err => {
    ElMessage.error(userParams.id ? "修改失败" : "添加失败")
  })
}
const cancelClick = () => {
  drawer1.value = false
  drawer2.value = false
}
onMounted(() => {
  getAllUser()
})

const validatorUsername = (rule: any, value: any, callback: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 5) {
    callback();
  } else {
    callback(new Error('用户名字至少五位'))
  }
}
const validatorname = (rule: any, value: any, callback: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 2) {
    callback();
  } else {
    callback(new Error('用户昵称至少2位'))
  }
}
const validatorpassword = (rule: any, value: any, callback: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 6) {
    callback();
  } else {
    callback(new Error('用户昵称至少6位'))
  }
}

//表单校验的规则对象
const rules = {
  //用户名字
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  //用户昵称
  name: [{ required: true, trigger: 'blur', validator: validatorname }],
  password: [{ required: true, trigger: 'blur', validator: validatorpassword }],
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