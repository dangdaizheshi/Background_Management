<template>
    <el-button size="small" icon="Refresh" circle></el-button>
    <el-button size="small" icon="FullScreen" circle></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
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

</script>

<style lang="scss" scoped>
img {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin: 0 10px;
}
</style>