<template>
    <el-button size="small" icon="Refresh" circle @click="updateRefsh()"></el-button>
    <el-button size="small" icon="FullScreen" circle></el-button>
    <el-popover
        placement="bottom"
        title="主题设置"
        :width="300"
        trigger="hover"
    >
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker @change="setColor" v-model="color" show-alpha :predefine="predefineColors" size="small"/>
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch
                    @change="changeDark"
                    v-model="dark"
                    size="small"
                />
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button size="small" icon="Setting" circle></el-button>
        </template>
    </el-popover>
    <img src="../../../../assets/images/11.PNG" alt="">
    <el-dropdown>
        <span class="el-dropdown-link">
            Dropdown List
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSettingsStore } from '../../../../stores/settings';

const settingsStore = useSettingsStore();

const updateRefsh = () => {
    settingsStore.toggleRefsh()
}
const color = ref('rgba(255, 69, 0, 0.68)')
const dark = ref<boolean>(false)
const predefineColors = ref<string[]>([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const changeDark = () => {
    const html = document.documentElement
    dark.value ? html.classList.add('dark') : html.classList.remove('dark')
}
const setColor = () => {
    const html = document.documentElement
    html.style.setProperty('--el-color-primary', color.value)
}
</script>

<style lang="scss" scoped>
img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin: 0 10px;
}
</style>