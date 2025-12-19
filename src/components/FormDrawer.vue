<template>
  <el-drawer v-model="drawer" :title="title" :size="size" close-on-click-modal="false" :destroy-on-close="destroyOnClose">
    <div class="formdrawer">
        <div class="main">
          <slot></slot>
        </div>
        <div class="actions">
          <el-button type="primary" @click="submitForm()" :loading="loading">{{ confirmText }}</el-button>
          <el-button type="default" @click="close()">取消</el-button>
        </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import type { ElButton } from 'element-plus';
import {ref} from 'vue'
const drawer = ref(false)
const loading = ref(false)
const open = () => drawer.value = true
const close = () => drawer.value = false
const showLoading = () => loading.value = true
const hideLoading = () => loading.value = false

const emit = defineEmits(['submit'])
const submitForm = () => emit('submit')

//向父组件暴露方法
defineExpose({
    open,
    close,
    showLoading,
    hideLoading
})

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: '45%'
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: '提交'
  }
})
</script>

<style lang="scss" scoped>
.formdrawer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .main {
        overflow-y: auto;
    }
}
</style>