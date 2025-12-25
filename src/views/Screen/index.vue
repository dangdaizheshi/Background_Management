<template>
  <div class="screen_container">
    <div class="screen_main" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="le">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="ce">
          <Map class="map" />
          <Line class="line" />
        </div>
        <div class="re">
          <Rank class="rank" />
          <Year class="year" />
          <counter class="counter" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import Top from './components/Top.vue'
import Tourist from './components/left/Tourist.vue'
import Sex from './components/left/Sex.vue'
import Age from './components/left/Age.vue'
import Map from './components/center/Map.vue'
import Line from './components/center/Line.vue'
import Rank from './components/right/Rank.vue'
import Year from './components/right/Year.vue'
import counter from './components/right/counter.vue'

let screen = ref()
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})
// 定义大屏缩放比例
function getScale(w = 1920, h = 1080) { 
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
// 监听视口变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}
</script>

<style lang="scss" scoped>
.screen_container { 
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;
  .screen_main {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      padding: 0 40px;
      display: flex;
      .le {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .sex, .age {
          flex: 1;
        }
        .tourist {
          flex: 1.2;
        }
      }
      .ce {
        flex: 2.4;
        display: flex;
        flex-direction: column;
        .map {
          flex: 3;
        }
        .line {
          flex: 1.1;
        }
      }
      .re {
        flex: 1.1;
        display: flex;
        flex-direction: column;
        .rank {
          flex: 1.5;
        }
        .year {
          flex: 1;
        }
        .counter {
          flex: 1;
        }
      }
    }
  }
}
</style>