import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfoApi } from '../apis/login'
import router from '../router/index'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const routesList = ref(router.options.routes)
  const setUserInfo = async () => {
    const res = await getUserInfoApi()
    userInfo.value = res
  }
  const removeUserInfo = () => {
    userInfo.value = {}
  }
  return { userInfo, routesList, setUserInfo, removeUserInfo }
})
