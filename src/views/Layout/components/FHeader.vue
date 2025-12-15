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
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowDown, Fold, Orange, RefreshRight, FullScreen, ArrowUp, Aim } from '@element-plus/icons-vue'
const circleUrl = ref('../../../../assets/images/11.PNG');
const isFullScreen = ref(false);
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
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 65px;
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
      font-size: 18px;
      font-weight: 500;
      gap: 8px;
      .workspace-icon {
        font-size: 23px;
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