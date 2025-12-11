<template>
  <div class="container">
    <el-row>
      <el-col :span="12" :xs="0">左侧区域</el-col>
      <el-col :span="12" :xs="24">
          <el-form class="login_form">
            <h1>Hello</h1>
            <h2>后台管理系统</h2>
            <el-form-item>
              <el-input :prefix-icon="User"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="password" :prefix-icon="Lock" show-password></el-input>
            </el-form-item>
             <el-form-item>
              <el-button class="login_btn" type="primary">登录</el-button>
            </el-form-item>
          </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Search, User, Lock } from '@element-plus/icons-vue'
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
