import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('../views/Login/index.vue')
    },
    {
      path: '/',
      component: () => import('../views/Layout/index.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/404/index.vue')
    }
  ],
  // 配置路由切换时页面自动回到顶部
  scrollBehavior() {
    return{
      top: 0,
    }
  }
})

export default router