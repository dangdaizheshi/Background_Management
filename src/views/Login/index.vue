<template>
  <div class="container">
    <el-row>
      <el-col :span="12" :xs="0">左侧区域</el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="formRef">
          <h1>Hello</h1>
          <h2>后台管理系统</h2>
          <el-form-item prop="username">
            <el-input 
              v-model="loginForm.username"
              autofocus
              :prefix-icon="User" 
              placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input 
              v-model="loginForm.password"
              type="password" 
              :prefix-icon="Lock" 
              show-password
              placeholder="请输入密码">
            </el-input>
          </el-form-item>
           <el-form-item>
            <el-button class="login_btn" type="primary" @click="handleLogin" :loading = "loading">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Search, User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { loginApi, getUserInfoApi } from '../../apis/login'
import { useRouter } from 'vue-router'
import tokenUtils from '../../utils/tokenUtil'
import notificationUtils from '../../utils/notificationUtils'

const userouter = useRouter()
// Define form data
const loginForm = reactive({
  username: '',
  password: ''
})

// Form reference for validation
const formRef = ref<FormInstance>()

// Validation rules
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '用户名长度应在3到5个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_!@#$%^&*(),.?":{}|<>]+$/,
      message: '密码只能包含数字、字母、标点符号和下划线',
      trigger: 'blur'
    }
  ]
})

const loading = ref(false)

// Handle login
const handleLogin = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
        loading.value = true
        loginApi(loginForm.username, loginForm.password).then(res => {
        console.log(res)
        notificationUtils.toast('success', '登录成功')
        tokenUtils.setToken(res.token)
        userouter.push('/')
      }).finally(() => {
        loading.value = false
      })
    } 
    else {
      console.log('验证失败', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: url('../../assets/images/baokemeng.png') no-repeat center;
  background-size: cover;
  .login_form {
    padding: 40px;
    position: relative;
    width: 75%;
    top: 30vh;
    background: url('../../assets/images/login_form.png') no-repeat;
    background-size: cover;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>