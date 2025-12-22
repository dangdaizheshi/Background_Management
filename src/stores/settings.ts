import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  let isFold = ref(false)
  let refsh = ref(false)
  const toggleFold = () => {
    isFold.value = !isFold.value
  }
  const toggleRefsh = () => {
    refsh.value = !refsh.value
  }
  return { isFold,refsh, toggleFold, toggleRefsh }
})