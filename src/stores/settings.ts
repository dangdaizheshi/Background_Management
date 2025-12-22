import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  let isFold = ref(false)
  const toggleFold = () => {
    isFold.value = !isFold.value
  }
  return { isFold, toggleFold}
})
