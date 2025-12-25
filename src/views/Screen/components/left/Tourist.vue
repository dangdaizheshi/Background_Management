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
const value = 0.6;
const option = {
   title: {
      text: (value * 100).toFixed(0) + '{a|%}',
      x: 'center',
      y: 'center',
      textStyle: {
         fontSize: 40,
         fontWeight: '700',
         color: 'rgb(34,34,34)',
         rich: {
            a: {
               fontSize: 16
            }
         }
      }
   },
   series: [{
      type: 'liquidFill',
      radius: '80%',
      data: [value, value],
      outline: {
         borderDistance: -1,
         itemStyle: {
            borderWidth: 20,
            borderColor: {
               type: 'linear',
               x: 0,
               y: 1,
               x2: 0,
               y2: 0,
               colorStops: [{
                  offset: 0,
                  color: 'rgb(53,193,241)'
               }, {
                  offset: value,
                  color: 'rgb(147,238,253)'
               }, {
                  offset: value + 0.1,
                  color: 'rgb(223,247,255)'
               }, {
                  offset: 1,
                  color: 'rgb(223,247,255)'
               }],
            },
            shadowColor: 'rgba(53,193,241,0.3)'
         }
      },
      itemStyle: {
         shadowBlur: 0,
      },
      color: [{
         type: 'linear',
         x: 0,
         y: 1,
         x2: 0,
         y2: 0,
         colorStops: [{
            offset: 0,
            color: 'rgb(144,226,255)'
         }, {
            offset: 1,
            color: 'rgb(231,249,255)'
         }],
      }],
      label: {
         formatter: ''
      }
   }]
};


myChart.setOption(option)
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
    height: 250px;
  }
}
</style>