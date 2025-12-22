<template>
    <template v-for="(item, index) in menuList" :key="item.path">
      <template v-if="!item.meta.hidden">
        <!-- 没有子路由 -->
        <el-menu-item v-if="(!item.children || (item.children && item.children.length === 0))" :index="item.path">
          <el-icon><component :is="item.meta.icon"></component></el-icon>
          <template #title> 
            <span>{{item.meta.title}}</span>
          </template>
        </el-menu-item>
        <!-- 有 1 个子路由 -->
        <el-menu-item v-else-if="item.children.length === 1" :index="item.children[0].path">
          <el-icon><component :is="item.children[0].meta.icon"></component></el-icon>
          <template #title> 
            <span>{{item.children[0].meta.title}}</span>
          </template>
        </el-menu-item>
        <!-- 有 > 1 个子路由 -->
        <el-sub-menu v-else :index="item.path">
          <template #title>
            <el-icon><component :is="item.meta.icon"></component></el-icon>
            <span>{{item.meta.title}}</span>
          </template>
          <SideMenu :menuList="item.children"/>
        </el-sub-menu>
      </template>
    </template>
</template>

<script setup lang="ts">
const props = defineProps(['menuList'])
</script>
<script lang="ts">
export default {
    name: 'SideMenu'
}
</script>

<style lang="scss" scoped>

</style>