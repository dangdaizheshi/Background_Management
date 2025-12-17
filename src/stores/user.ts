import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfoApi } from '../apis/login'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const setUserInfo = async () => {
    const res = await getUserInfoApi()
    userInfo.value = res
  }
  const removeUserInfo = () => {
    userInfo.value = {}
  }
  return { userInfo, setUserInfo, removeUserInfo }
})
