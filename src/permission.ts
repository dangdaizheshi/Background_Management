import router from "./router"
import tokenUtils from "./utils/tokenUtil"
import notificationUtils from "./utils/notificationUtils"
import { useUserStore } from "./stores/user"

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
    const token = tokenUtils.getToken()
    if (!token && to.path !== '/login') {
        notificationUtils.toast('error', '请先登录')
        return next('/login')
    }
    if (token && to.path === '/login') {
        notificationUtils.toast('error', '请勿重复登录')
        return next(from.path ? from.path : '/')
    }
    // 如果用户登录了, 自动获取用户信息，存储到 pinia 中
    if (token) {
        const userStore = useUserStore()
        userStore.setUserInfo()
    }
    next()
})