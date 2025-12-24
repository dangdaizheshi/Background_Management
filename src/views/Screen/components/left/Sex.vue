<template>
  <div class="box1">
    <div class="top">
      <p class="title">性别分布</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="sexy">
      <div class="man">
        <img src="../../images/man.png" alt="">
      </div>
      <div class="woman">
        <img src="../../images/woman.png" alt="">
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="chart" ref="chart">

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let chart = ref()
onMounted(() => { 
  let myChart = echarts.init(chart.value)
  myChart.setOption({
    title: {
      text: '性别分布',
      textStyle: {
        color: 'skyblue'
      },
      left: '40%'
    },
    xAxis: { show: false, min: 0, max: 100 },
    yAxis: { show: false, type: 'category' },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 25,
        z: 100,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 20
        }
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 25,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20
        }
      }
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  })
})
</script>

<style lang="scss" scoped>
.box1 {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;
  color: white;
  .top {
    margin-left: 20px;
    .title {
      color: white;
      font-size: 20px;
    }
  }
  .sexy {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .man{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 25px;
      width: 111px;
      height: 115px;
      background: url('../../images/man-bg.png') no-repeat;
      background-size: 100% 100%;
    }
    .woman{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 25px;
      width: 111px;
      height: 115px;
      background: url('../../images/woman-bg.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .rate {
    padding: 0 70px;
    display: flex;
    justify-content: space-between;
  }
  .chart {
    padding: 0 70px;
    height: 100px;
  }
}
</style>