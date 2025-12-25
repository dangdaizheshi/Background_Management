<template>
  <div class="rank_style">
    <div class="top">
      <p class="title">热门景区排行</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chart = ref();
onMounted(() => {
  const myChart = echarts.init(chart.value);
  myChart.setOption({
    title: {
      text: '景区排行',
      left: 'center',
      link: '',
      textStyle: {
        color: 'yellowgreen',
        fontSize: 20
      },
      subtext: "各大景区排行",
      subtextStyle: {
        color: 'white',
        fontSize: 16
      }
    }
  })
})
</script>

<style lang="scss" scoped>
.rank_style{
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-rt.png') no-repeat;
  background-size: 100% 100%; 
  margin: 20px 0;
  .top {
    margin-left: 5px;
    margin-top: 5px;
    .title {
      color: white;
      font-size: 20px;
    }
  }
  .chart {
    height: calc(100% - 40px);
  }
}
</style>