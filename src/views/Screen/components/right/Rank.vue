<template>
  <div class="rank_style">
    <div class="top">
      <p class="title">年龄分布</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.rank_style{
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%; 
  margin: 20px 0;
  .top {
    margin-left: 20px;
    .title {
      color: white;
      font-size: 20px;
    }
  }
}
</style>