<template>
  <div class="main">
    <div class="left-section">
      <div class="workspace">
        <el-icon class="workspace-icon"><Orange /></el-icon>
        工作区
      </div>
      <div class="toolbar-icons">
        <el-icon class="toolbar-icon"><Fold /></el-icon>
        <el-tooltip effect="dark" content="刷新" placement="bottom">
          <el-icon class="toolbar-icon" @click = "refresh()"><RefreshRight /></el-icon>
        </el-tooltip>
      </div>
    </div>
    <div class="right-section">
      <el-tooltip effect="dark" content="全屏" placement="bottom" v-if="isFullScreen === false"><el-icon class="toolbar-icon fullscreen-icon" @click = "toggleFullScreen()"><FullScreen /></el-icon></el-tooltip>
      <el-tooltip effect="dark" content="退出全屏" placement="bottom" v-else><el-icon class="toolbar-icon fullscreen-icon" @click = "toggleFullScreen()"><Aim /></el-icon></el-tooltip>
      <el-dropdown>
        <div class="el-dropdown-link">
          <el-avatar class="user-avatar" :size="32" :src="circleUrl" />
          <span class="username">当代哲师</span>
          <el-icon class="el-icon--right arrow-icon">
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click = "updatePassword()">修改密码</el-dropdown-item>
            <el-dropdown-item @click = "exit()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <FormDrawer ref="formDrawerRef" title="修改密码" close-on-click-modal="true" @submit="repassword()">
      <el-form :model="loginForm" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item prop="password" label="原密码">
          <el-input 
            v-model="loginForm.password"
            type="password"
            autofocus
            placeholder="请输入原密码"
            show-password>
          </el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input 
            v-model="loginForm.newPassword"
            type="password" 
            show-password
            placeholder="请输入新密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="rePassword" label="确认密码">
          <el-input 
            v-model="loginForm.rePassword"
            type="password" 
            show-password
            placeholder="请确认新密码">
          </el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template> 

<script setup lang="ts">
import { ref, reactive} from 'vue'
import { ArrowDown, Fold, Orange, RefreshRight, FullScreen, ArrowUp, Aim } from '@element-plus/icons-vue'
import notificationUtils from '../../../utils/notificationUtils';
import { ElMessage} from 'element-plus'
import { useRouter } from 'vue-router';
import { logoutApi, updatePasswordApi } from '../../../apis/login';
import tokenUtils from '../../../utils/tokenUtil';
import { useUserStore } from '../../../stores/user';
import FormDrawer from '../../../components/FormDrawer.vue';

const userStore = useUserStore();
const userouter = useRouter();
const circleUrl = ref('../../../assets/images/11.PNG');
const isFullScreen = ref(false);
const drawer = ref(false);
const formDrawerRef = ref(null)
const loginForm = reactive({
  password: '',
  newPassword: '',
  rePassword: ''
})
const formRef = ref()
const rules = reactive({
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_!@#$%^&*(),.?":{}|<>]+$/,
      message: '密码只能包含数字、字母、标点符号和下划线',
      trigger: 'blur'
    }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_!@#$%^&*(),.?":{}|<>]+$/,
      message: '密码只能包含数字、字母、标点符号和下划线',
      trigger: 'blur'
    }
  ],
  rePassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_!@#$%^&*(),.?":{}|<>]+$/,
      message: '密码只能包含数字、字母、标点符号和下划线',
      trigger: 'blur'
    }
  ]
})
function refresh() {
  location.reload();
}
function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
  isFullScreen.value = !isFullScreen.value;
}
function exit() {
  notificationUtils.messageBox('warning', '确定要退出登录吗？').then(() => {
    logoutApi().finally(() => {
      userStore.removeUserInfo();
      tokenUtils.removeToken();
      notificationUtils.toast('success', '退出登录成功');
      userouter.push('/login');
    })
  })
}
function updatePassword() {
  drawer.value = true
  formRef.value = {}
  formDrawerRef.value.open()
}
const repassword = async () => { 
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      updatePasswordApi(loginForm).then(() => { 
        formDrawerRef.value.showLoading();
        notificationUtils.toast('success', '修改密码成功');
        drawer.value = false;
        userStore.removeUserInfo();
        tokenUtils.removeToken();
        userouter.push('/login');
      }).finally(() => {
        formDrawerRef.value.hideLoading();
      })
    } 
    else {
      console.log('验证失败', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px 0 40px;
  background: linear-gradient(90deg, #1e88e5, #42a5f5);
  color: white;
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  
  .left-section {
    display: flex;
    align-items: center;
    gap: 30px;
    
    .workspace {
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 500;
      gap: 8px;
      .workspace-icon {
        font-size: 23px;
        vertical-align: bottom;
      }
    }
    
    .toolbar-icons {
      margin-left: 50px;
      display: flex;
      gap: 1px;
      
      .toolbar-icon {
        font-size: 20px;
        cursor: pointer;
        padding: 6px;
        border-radius: 4px;
        transition: all 0.3s ease;
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }
      }
    }
  }
  
  .right-section {
    display: flex;
    align-items: center;
    gap: 20px;
    
    .fullscreen-icon {
      cursor: pointer;
      padding: 6px;
      border-radius: 4px;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
      }
    }
    
    .el-dropdown-link {
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 8px;
      transition: all 0.3s ease;
      
      &:hover {
        opacity: 0.9;
      }
      
      .user-avatar {
        border: 2px solid rgba(255, 255, 255, 0.3);
      }
      
      .username {
        color: white;
        font-weight: 500;
        margin-left: 5px;
      }
      
      .arrow-icon {
        transition: transform 0.3s ease;
      }
      
      &:hover .arrow-icon {
        transform: rotate(180deg);
      }
    }
  }
}
</style>