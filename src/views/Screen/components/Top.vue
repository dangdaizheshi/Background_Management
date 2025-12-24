<template>
  <div class="s_top">
    <div class="le">
        <span class="lbtn" @click="goHome()">首页</span>
    </div>
    <div class="ce">
        <span class="cbtn">数据看板</span>
    </div>
    <div class="re">
        <span class="rbtn">统计列表</span>
        <span class="time">当前时间: {{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount} from 'vue'
import { useRouter } from 'vue-router'
const routerObj = useRouter()
const time = ref(new Date().toLocaleString())
const timer = ref(0)
function goHome() {
    routerObj.push('/layout')
}
onMounted(() => {
    timer.value = setInterval(() => {
        time.value = new Date().toLocaleString()
    }, 1000)
})
onBeforeUnmount(() => {
    clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.s_top{
    display: flex;
    width: 100%;
    height: 40px;
    .le {
        flex: 1.5;
        background: url('../images/dataScreen-header-left-bg.png') no-repeat;
        background-size: cover;
        .lbtn {
            width: 150px;
            height: 40px;
            float: right;
            background: url('../images/dataScreen-header-btn-bg-l.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            font-size: 20px;
        }
    }
    .ce {
        flex: 2;
        height: 74px;
        background: url('../images/dataScreen-header-center-bg.png') no-repeat;
        background-size: cover;
        color: #29fcff;
        text-align: center;
        line-height: 74px;
        font-size: 30px;
    }
    .re {
        flex: 1.5;
        background: url('../images/dataScreen-header-left-bg.png') no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #29fcff;
        .rbtn {
            width: 150px;
            height: 40px;
            float: left;
            background: url('../images/dataScreen-header-btn-bg-r.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 40px;
            font-size: 20px;
        }
        .time {
            margin-right: 20px;
            font-size: 18px;
        }
    }
}
</style>