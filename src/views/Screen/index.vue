<template>
  <div class="screen_container">
    <div class="screen_main" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="le">左侧</div>
        <div class="ce">中间</div>
        <div class="re">右侧</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import Top from './components/Top.vue'

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
      display: flex;
      .le {
        flex: 1;
      }
      .ce {
        flex: 2;
      }
      .re {
        flex: 1;
      }
    }
  }
}
</style>