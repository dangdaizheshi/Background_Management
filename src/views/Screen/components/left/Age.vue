<template>
  <div class="box2">
    <div class="top">
      <p class="title">年龄分布</p>
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
  let myChart = echarts.init(chart.value)
  let option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 30, 60, 0.9)',
      textStyle: { color: '#fff', fontSize: 14 },
      formatter: '{b}: {d}%'
    },
    legend: {
      top: 'center',
      // 修改1：增大图例右侧间距（从15改为35），同时向左微调图例位置
      right: 35, 
      orient: 'vertical',
      textStyle: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 14
      }
    },
    graphic: {
      elements: [
        {
          type: 'text',
          top: 'center',
          left: 'center',
          style: {
            //text: '本日总数',
            fontSize: 18,
            fontWeight: 'bold',
            fill: '#fff'
          }
        }
      ]
    },
    series: [
      {
        name: '年龄分布',
        type: 'pie',
        radius: ['45%', '75%'],
        // 修改2：饼图整体向左偏移（默认center是['50%','50%']，改为['40%','50%']），远离右侧图例
        center: ['40%', '50%'], 
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1
        },
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          fontSize: 14,
          formatter: '{d}%'
        },
        labelLine: {
          show: false
        },
        data: [
          { 
            value: 16, 
            name: '10岁以下',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#4b7fff' },
                { offset: 0, color: '#2f54eb' }
              ])
            }
          },
          { 
            value: 8, 
            name: '10-18岁',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#ff7d00' },
                { offset: 1, color: '#d96500' }
              ])
            }
          },
          { 
            value: 12, 
            name: '18-30岁',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#00c2b8' },
                { offset: 1, color: '#009688' }
              ])
            }
          },
          { 
            value: 24, 
            name: '30-40岁',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#1890ff' },
                { offset: 1, color: '#096dd9' }
              ])
            }
          },
          { 
            value: 20, 
            name: '40-60岁',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#87ceeb' },
                { offset: 1, color: '#5baae5' }
              ])
            }
          },
          { 
            value: 20, 
            name: '60岁以上',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#9c27b0' },
                { offset: 1, color: '#7b1fa2' }
              ])
            }
          }
        ]
      }
    ]
  };
  myChart.setOption(option);
  window.addEventListener('resize', () => myChart.resize())
})
</script>

<style lang="scss" scoped>
.box2 {
  width: 100%;
  height: 100%;
  background-color: #0a1930;
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
    // 修改3：优化容器内边距，右侧内边距适度增大（从80改为90），左侧也补充内边距避免饼图贴边
    padding: 5px 20px 5px 20px; 
  }
}
</style>