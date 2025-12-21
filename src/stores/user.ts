import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfoApi } from '../apis/login'
import router from '../router/index'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const routesList = computed(() => {
    const allRoutes = router.getRoutes()
    return allRoutes.filter(route => {
      // 只保留以下类型的路由：
      // 1. 根路径 '/'
      // 2. 单层路径如 '/login', '/layout' 等
      // 3. 通配符路径如 '/:pathMatch(.*)*'
      
      const pathParts = route.path.split('/').filter(Boolean)
      
      // 顶层路由的特点是路径深度为0或1
      return pathParts.length <= 1
    })
  })
  const setUserInfo = async () => {
    const res = await getUserInfoApi()
    userInfo.value = res
  }
  const removeUserInfo = () => {
    userInfo.value = {}
  }
  return { userInfo, routesList, setUserInfo, removeUserInfo }
})
