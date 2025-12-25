<template>
  <div class="box" ref="map"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'

let map = ref()
let chinaMap = ref()
const getChinaMap = async () => {
  const res = await axios.get('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
  chinaMap.value = res.data
}
onMounted(async () => {
  await getChinaMap()
  echarts.registerMap('china', chinaMap.value)
  let myChart = echarts.init(map.value)
  const points = [
    { value: [110.81, 33.40], itemStyle: { color: '#fff' }, name: '中心1', total: 0, yx: 0 },
    { value: [116.55, 40.01], itemStyle: { color: '#fff1d6' }, name: '中心2', total: 0, yx: 0 },
    { value: [113.11, 28.40], itemStyle: { color: '#fff1d6' }, name: '中心3', total: 5, yx: 5 },
    { value: [106.44, 29.50], itemStyle: { color: '#fff1d6' }, name: '中心4', total: 10, yx: 10 },
    { value: [112.85, 38.95], itemStyle: { color: '#fff1d6' }, name: '中心5', total: 8, yx: 8 },
    { value: [82.78, 43.27], itemStyle: { color: '#fff1d6' }, name: '中心6', total: 18, yx: 18 }
  ]
  // 线条改为浅色（匹配示例图的浅色连线）
  const lineToLf = [
    { name: '11', coords: [[110.81, 33.40], [116.55, 40.01]], lineStyle: { color: '#fff' } },
    { name: '22', coords: [[113.11, 28.40], [116.55, 40.01]], lineStyle: { color: '#fff1d6' } },
    { name: '33', coords: [[106.44, 29.50], [116.55, 40.01]], lineStyle: { color: '#fff1d6' } },
    { name: '44', coords: [[112.85, 38.95], [116.55, 40.01]], lineStyle: { color: '#fff1d6' } },
    { name: '55', coords: [[82.78, 43.27], [116.55, 40.01]], lineStyle: { color: '#fff1d6' } }
  ]
  const option = {
    // 匹配示例图的深色背景
    //backgroundColor: '#0a1930',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 30, 60, 0.9)',
      borderColor: '#0FA3F0',
      borderWidth: 1,
      textStyle: { color: '#fff', fontSize: 14 },
      formatter: function (params) {
        if (params.seriesType === 'effectScatter') {
          return `名称: ${params.name}\n总数: ${params.data.total}\n优秀: ${params.data.yx}`;
        }
        return params.name;
      }
    },
    // 新增visualMap，控制地图区域深浅（匹配示例图的蓝色分层）
    visualMap: {
      show: false,
      min: 0,
      max: 100,
      left: 'left',
      top: 'bottom',
      seriesIndex: 0,
      inRange: {
        color: ['#1a5cad', '#0f4896', '#0a3a7d', '#072d63'] // 从浅到深的蓝色系
      }
    },
    // 去掉多层3D阴影，简化为平面geo
    geo: [
      {
        map: 'china',
        tooltip: { show: false },
        label: { show: false },
        zoom: 1.15,
        silent: true,
        roam: false,
        aspectScale: 0.75,
        itemStyle: {
          borderColor: '#0FA3F0',
          borderWidth: 1,
          areaColor: '#0a3a7d'
        },
        top: 128,
        left: 'center',
        regions: [{
          name: '南海诸岛',
          itemStyle: { areaColor: 'transparent', borderColor: 'transparent' }
        }],
        z: 1
      }
    ],
    series: [
      // 平面地图（区域深浅由visualMap控制）
      {
        type: 'map',
        map: 'china',
        zoom: 1.15,
        label: {
          show: true, // 显示省份名称（匹配示例图的白色文字）
          color: '#fff',
          fontSize: 12,
          align: 'center'
        },
        top: 128,
        left: 'center',
        aspectScale: 0.75,
        roam: false,
        itemStyle: {
          borderColor: '#0FA3F0',
          borderWidth: 1.2,
          areaColor: '#1a5cad'
        },
        emphasis: {
          label: { color: '#04CFF5' },
          itemStyle: { areaColor: '#0a8bd8' }
        },
        z: 2,
        // 给区域加默认值，让visualMap生效（模拟区域深浅）
        data: [
          { name: '北京市', value: 30 },
          { name: '上海市', value: 40 },
          { name: '广东省', value: 50 },
          { name: '新疆维吾尔自治区', value: 20 },
          { name: '西藏自治区', value: 10 }
        ]
      },
      // 点（改为浅色，匹配示例图）
      {
        name: 'companyPoint',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        showEffectOn: 'render',
        rippleEffect: {
          number: 2,
          period: 5,
          scale: 2.5,
          brushType: 'stroke'
        },
        symbol: 'circle',
        symbolSize: 12,
        data: points,
        tooltip: { show: true },
        z: 4
      },
      // 线条（浅色，匹配示例图的连线）
      {
        name: 'arrowline',
        type: 'lines',
        effect: {
          show: true,
          period: 4,
          trailLength: 0.3,
          symbol: 'arrow',
          symbolSize: 6
        },
        lineStyle: {
          width: 1.5,
          opacity: 0.8,
          curveness: 0.15
        },
        data: lineToLf,
        z: 3
      }
    ]
  };
  myChart.setOption(option);
  window.addEventListener('resize', () => myChart.resize())
})
</script>

<style lang="scss" scoped>
.box {
}
</style>