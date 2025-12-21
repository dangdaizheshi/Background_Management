import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('../views/Login/index.vue'),
      meta: {
        title: '登录页'
      }
    },
    {
      path: '/',
      component: () => import('../views/Layout/index.vue'),
      meta: {
        title: '后台首页'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/404/index.vue'),
      meta: {
        title: '无效页面'
      }
    },
    {
      path: '/layout',
      component: () => import('../views/MainPage/index.vue'),
      children: [
        {
          path: 'home',
          component: () => import('../views/Home/index.vue'),
          meta: {
            title: '主页',
          }
        },
        {
          path: 'ceshi',
          component: () => import('../views/Home/index.vue'),
          meta: {
            title: '测试',
          }
        }
      ],
      meta: {
        title: '布局页',
      }
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