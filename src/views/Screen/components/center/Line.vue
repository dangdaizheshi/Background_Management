<template>
  <div class="line_style">
    <div class="top">
      <p class="title">未来30天游客量趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.line_style {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
  margin: 0 15px;
  .top {
    margin-left: 20px;
    .title {
      color: white;
      font-size: 20px;
    }
  }
}
</style>