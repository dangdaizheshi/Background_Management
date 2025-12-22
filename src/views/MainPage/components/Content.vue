<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
        <component :is="Component" v-if="flag"/>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick} from 'vue';
import { useSettingsStore } from '../../../stores/settings';

const settingsStore = useSettingsStore();
let flag = ref(true)
watch(() => settingsStore.refsh, () => {
  flag.value = false
  nextTick(() => {
    flag.value = true
  })
});
</script>

<style lang="scss" scoped>
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}
.fade-enter-active {
    transition: all .6s;
}
.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>