<template>
  <div class="tourist_container">
    <div class="ltop">
      <p class="title">实时游客统计</p>
      <img src="../../images/dataScreen-title.png" alt="">
      <p class="right">可预约总量<span>9999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts">

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let people = ref('216908人')
const charts = ref()
onMounted(() => { 
  // 获取 echarts 类的实例
  let myChart = echarts.init(charts.value)
  // 设置实例的配置项
  myChart.setOption({
    title: {
      text: '水球图'
    }
  })
})
</script>

<style lang="scss" scoped>
.tourist_container {
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 15px;
  .ltop {
    margin-top: 10px;
    margin-left: 20px;
    .title {
      color: white;
      font-size: 20px;
    }
    .right {
      margin-top: 10px;
      float: right;
      color: white;
      font-size: 18px;
      span {
        color: #FFB800;
      }
    }
  }
  .number {
    margin-top: 30px;
    display: flex;
    padding: 15px;
    gap: 3px;
    span {
      height: 50px;
      flex: 1;
      text-align: center;
      line-height: 50px;
      background: url('../../images/total.png') no-repeat;
      background-size: 100% 100%;
      color: $screen-color;
      font-size: 26px;
    }
  }
  .charts {
    width: 100%;
    height: 260px;
  }
}
</style>