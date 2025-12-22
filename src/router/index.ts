import { hi } from 'element-plus/es/locales.mjs'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('../views/Login/index.vue'),
      meta: {
        title: '登录页',
        hidden: true,
        icon: 'Promotion'
      }
    },
    {
      path: '/',
      component: () => import('../views/Layout/index.vue'),
      name: 'Screen',
      meta: {
        title: '后台首页',
        hidden: false,
        icon: 'Avatar'
      }
    },
    {
      path: '/screen',
      component: () => import('../views/Screen/index.vue'),
      meta: {
        title: '数据大屏',
        hidden: false,
        icon: 'Platform'
      }
    },
    {
      path: '/acl',
      component: () => import('../views/Acl/index.vue'),
      name: 'Name',
      meta: {
        title: '权限管理',
        hidden: false,
        icon: 'Lock'
      },
      children: [
        {
          path: 'user',
          component: () => import('../views/Acl/User/index.vue'),
          name: 'Acl',
          meta: {
            title: '用户管理',
            hidden: false,
            icon: 'User'
          }
        },
        {
          path: 'role',
          component: () => import('../views/Acl/Role/index.vue'),
          name: 'Role',
          meta: {
            title: '角色管理',
            hidden: false,
            icon: 'UserFilled'
          }
        }, 
        {
          path: 'permiss',
          component: () => import('../views/Acl/Permiss/index.vue'),
          name: 'Permiss',
          meta: {
            title: '菜单管理',
            hidden: false,
            icon: 'Monitor'
          }
        }
      ]
    },
    {
      path: '/product',
      component: () => import('../views/Product/index.vue'),
      name: 'Product',
      meta: {
        title: '商品管理',
        hidden: false,
        icon: 'Goods'
      },
      children: [
        {
          path: 'trademark',
          component: () => import('../views/Product/Trademark/index.vue'),
          name: 'Trademark',
          meta: {
            title: '品牌管理',
            hidden: false,
            icon: 'ShoppingCartFull'
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/404/index.vue'),
      meta: {
        title: '无效页面',
        hidden: true,
        icon: 'MoreFilled'
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
            hidden: false,
            icon: 'HomeFilled'
          }
        },
        {
          path: 'ceshi',
          component: () => import('../views/Home/index.vue'),
          meta: {
            title: '测试',
            hidden: false,
            icon: 'HomeFilled'
          }
        }
      ],
      meta: {
        title: '布局页',
        hidden: false,
        icon: 'HomeFilled'
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