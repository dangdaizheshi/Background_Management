<template>
  <div class="line_style">
    <div class="top">
      <p class="title">未来30天游客量趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { Right } from '@element-plus/icons-vue'
let chart = ref()
onMounted(() => {
  const myChart = echarts.init(chart.value)
  const option = {
  backgroundColor: '#011c3c',
  tooltip: {
    show: true
  },
  legend: {
    show: false
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#fff', // 红色数字
      fontSize: 16 // 可选：字体大小
    },
    // axisLine: { lineStyle: { color: '#2e4c6f' } },  // Y 轴线颜色
    splitLine: { lineStyle: { color: '#2e4c6f' } }, // 网格线
    axisTick: {
      show: true
    }
  },

  xAxis: {
    title: {
      text: '游客流量趋势图',
    },
    boundaryGap: false, // 两侧不留白
    type: 'category',
    axisLine:{
      lineStyle:{
        color:"#2e4c6f",
        width:5
      }
    },
    spliteLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    data: [
      '',
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      ''
    ],
    axisLabel: {
      rotate: 45, // 倾斜角度，45度顺时针
      fontSize: 16, // 字体大小
      color: '#fff' // 字体颜色
    }
  },
  grid: {
    left: 10, 
    top: 0,
    bottom: 10,
    right: 0
  },
  series: [
    {
      type: 'line',
      data: [
        {
          value: 20,
          symbol: 'none',
          tooltip: {
            show: false
          }
        },
        100,
        102,
        130,
        140,
        111,
        150,
        124,
        { value: 160, symbol: 'none' }
      ],
      smooth: true,
      lineStyle: {
        color: '#01f1f3'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#01f1f3' },
            { offset: 1, color: 'transparent' }
          ]
        }
      }
    }
  ]
  };
  myChart.setOption(option)
})
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
  .chart {
    margin-top: 10px;
    height: calc(100% - 40px);
  }
}
</style>