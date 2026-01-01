<template>
  <div class="tag_list">
    <el-tabs
      v-model="activeTag"
      type="card"
      class="demo-tabs"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in tagList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>

    <div class="drop_down">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import type { TabPaneName } from 'element-plus'

const route = useRoute()

let tabIndex = 2
const activeTag = ref(route.path)
const tagList = ref([
  {
    title: '后台首页',
    path: '/'
  },
  {
    title: '商品管理',
    path: '/goods/list'
  }
])
onBeforeRouteUpdate((to, from) => {
  console.log(to.meta.title);
  
})
const addTab = (targetName: string) => {
  const newTabName = `${++tabIndex}`
  tagList.value.push({
    title: 'New Tab',
    path: '/'
  })
  activeTag.value = newTabName
}
const removeTab = (targetName: TabPaneName) => {
  const tabs = tagList.value
  let activeName = activeTag.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  activeTag.value = activeName
  tagList.value = tabs.filter((tab) => tab.name !== targetName)
}
</script>

<style lang="scss" scoped>
.tag_list {
  position: fixed;
  width: calc(100% - $base-menu-width);
  height: 44px;
  top: 64px;
  right: 0;
  display: flex;
  background-color: rgb(249, 249, 249);
  justify-content: space-between;
  align-items: center;
  z-index: 3;
  .drop_down { 
    background-color: white;
    width: 32px;
    height: 32px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  :deep(.el-tabs__header) { 
    margin-bottom: 0;
  }
  :deep(.el-tabs__nav) {
    border: 0;
  }
  :deep(.el-tabs__item) { 
    border: 0;
    background-color: white;
    height: 32px;
    margin: 0 5px;
    border-radius: 5px;
  }
}
</style>
