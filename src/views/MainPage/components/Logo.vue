<template>
  <div class="logo" v-if="!setting.logoisHidden">
    <img src="../../../assets/images/11.PNG" alt="">
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup>
import setting from '../../../setting';
</script>

<style lang="scss" scoped>
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    padding-left: 20px;
    img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }
    p {
        font-size: $base-logo-title-size;
        white-space: nowrap;
    }
}
</style>