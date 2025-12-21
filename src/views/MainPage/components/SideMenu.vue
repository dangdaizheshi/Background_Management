<template>
  <el-menu background-color="#001529" text-color="white">
    <template v-for="(item, index) in menuList" :key="item.path">
      <el-menu-item v-if="item.children.length === 0" :index="item.path">
        <span>{{item.meta.title}}</span>
      </el-menu-item>

      <el-menu-item v-if="item.children.length === 1" :index="item.children[0].path">
        <span>{{item.children[0].meta.title}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
const props = defineProps(['menuList'])
console.log(props.menuList);

</script>

<style lang="scss" scoped>

</style>