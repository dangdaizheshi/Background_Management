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
      meta: {
        title: '后台首页',
        hidden: false,
        icon: 'Avatar'
      },
      children: [
        {
          path: '/goods/list',
          component: () => import('../views/Goods/index.vue'),
          meta: {
            title: '商品列表',
            hidden: false,
            icon: 'HomeFilled'
          }
        }
      ]
    },
    {
      path: '/first',
      component: () => import('../views/FirstPage/index.vue'),
      meta: {
        title: '首页',
        hidden: false,
        icon: 'HomeFilled'
      }
    },
    {
      path: '/screen',
      component: () => import('../views/Screen/index.vue'),
      name: 'Screen',
      meta: {
        title: '数据大屏',
        hidden: false,
        icon: 'Platform'
      }
    },
    {
      path: '/acl',
      component: () => import('../views/MainPage/index.vue'),
      name: 'Name',
      meta: {
        title: '权限管理',
        hidden: false,
        icon: 'Lock'
      },
      redirect: '/acl/user',
      children: [
        {
          path: '/acl/user',
          component: () => import('../views/Acl/User/index.vue'),
          name: 'Acl',
          meta: {
            title: '用户管理',
            hidden: false,
            icon: 'User'
          }
        },
        {
          path: '/acl/role',
          component: () => import('../views/Acl/Role/index.vue'),
          name: 'Role',
          meta: {
            title: '角色管理',
            hidden: false,
            icon: 'UserFilled'
          }
        }, 
        {
          path: '/acl/permiss',
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
      component: () => import('../views/MainPage/index.vue'),
      name: 'Product',
      meta: {
        title: '商品管理',
        hidden: false,
        icon: 'Goods'
      },
      redirect: '/product/trademark',
      children: [
        {
          path: '/product/trademark',
          component: () => import('../views/Product/Trademark/index.vue'),
          name: 'Trademark',
          meta: {
            title: '品牌管理',
            hidden: false,
            icon: 'ShoppingCartFull'
          }
        },
        {
          path: '/product/attr',
          component: () => import('../views/Product/Attr/index.vue'),
          name: 'Attr',
          meta: {
            title: '属性管理',
            hidden: false,
            icon: 'Collection'
          }
        },
        {
          path: '/product/spu',
          component: () => import('../views/Product/Spu/index.vue'),
          name: 'Spu',
          meta: {
            title: 'SPU管理',
            hidden: false,
            icon: 'Calendar'
          }
        },
        {
          path: '/product/sku',
          component: () => import('../views/Product/Sku/index.vue'),
          name: 'Sku',
          meta: {
            title: 'SKU管理',
            hidden: false,
            icon: 'Orange'
          }
        }
      ]
    },
    {
      path: '/layout',
      component: () => import('../views/MainPage/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('../views/Home/index.vue'),
          meta: {
            title: '主页',
            hidden: false,
            icon: 'HomeFilled'
          }
        },
        {
          path: '/ceshi',
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
        hidden: true,
        icon: 'HomeFilled'
      }
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
  ],
  // 配置路由切换时页面自动回到顶部
  scrollBehavior() {
    return{
      top: 0,
    }
  }
})

export default router