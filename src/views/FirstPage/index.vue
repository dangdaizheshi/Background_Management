<template>
  <el-card>
    <div class="box">
      <img src="../../assets/images/11.PNG" alt="">
      <div class="re">
        <h3>{{getTime()}}好! admin</h3>
        <p>喵星人大战包子怪</p>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { getTime } from '../../utils/time';
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .re {
    margin-left: 20px;
  }
}
</style>