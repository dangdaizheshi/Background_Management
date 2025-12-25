<template>
  <div class="box2">
    <div class="top">
      <p class="title">性别分布</p>
      <img src="../../images/dataScreen-title.png" alt="">
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
  // 获取 echarts 类的实例
  let myChart = echarts.init(chart.value)
  let option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 60,
      right: 15,
      orient: 'vertical',
      textStyle: {
        color: 'white',
        fontSize: 16
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white'
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '娱乐' },
          { value: 735, name: '方向' },
          { value: 580, name: '邮箱' },
          { value: 484, name: '广告' },
          { value: 300, name: '视频' }
        ]
      }
    ],
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    }
  };
  myChart.setOption(option);
})

</script>

<style lang="scss" scoped>
.box2 {
  width: 100%;
  height: 100%;
  background-color: palegoldenrod;
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  color: white;
  .top {
    margin-left: 20px;
    .title {
      color: white;
      font-size: 20px;
    }
  }
  .chart {
    height: 250px;
    padding: 5px 10px;
  }
}
</style>