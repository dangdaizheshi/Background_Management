<template>
  <div class="topbar">
    <div class="le">
        <Breadcrumb />
    </div>
    <div class="re">
        <UserSetting />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './Topbar_component/Breadcrumb.vue';
import UserSetting from './Topbar_component/UserSetting.vue';
</script>

<style lang="scss" scoped>
.topbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    .le {
        display: flex;
    }
    .re {
        display: flex;
        align-items: center;
    }
}
</style>