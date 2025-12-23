import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfoApi } from '../apis/login'
import router from '../router/index'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const routesList = ref(router.options.routes)
  const menus = ref([])
  const setUserInfo = async () => {
    const res = await getUserInfoApi()
    userInfo.value = res
  }
  const removeUserInfo = () => {
    userInfo.value = {}
  }

  const setMenus = async () => {
    const res = await getUserInfoApi()
    menus.value = res.menus
  }
  return { menus, userInfo, routesList, setUserInfo, removeUserInfo, setMenus}
})
