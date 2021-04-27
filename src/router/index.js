import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '数据中心', icon: 'dashboard' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '用户中心', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'owner',
        name: 'owner',
        component: () => import('@/views/table/owner'),
        meta: { title: '业主信息管理', icon: 'el-icon-user' }
      },
      {
        path: 'staff',
        name: 'staff',
        component: () => import('@/views/table/staff'),
        meta: { title: '社区员工管理', icon: 'el-icon-user' }
      },
      {
        path: 'car',
        name: 'car',
        component: () => import('@/views/table/car'),
        meta: { title: '车辆管理', icon: 'el-icon-star-on' }
      }
    ]
  },


  {
    path: '/property',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '物业管理', icon: 'el-icon-price-tag' },
    children: [
      {
        path: 'building',
        name: 'building',
        component: () => import('@/views/table/building'),
        meta: { title: '楼栋管理', icon: 'el-icon-discount' }
      },
      {
        path: 'parking',
        name: 'parking',
        component: () => import('@/views/table/parking'),
        meta: { title: '车位管理', icon: 'el-icon-receiving' }
      },
      {
        path: 'instock',
        name: 'instock',
        component: () => import('@/views/table/instock'),
        meta: { title: '库存统计', icon: 'el-icon-coin' }
      },   
     {
        path: 'transfer',
        name: 'transfer',
        component: () => import('@/views/table/transfer'),
        meta: { title: '调库申请', icon: 'el-icon-coin' }
      }
     
    ]
  },




  {
    path: '/charge',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '收费中心', icon: 'el-icon-bank-card' },
    children: [
      {
        path: 'property',
        name: 'property',
        component: () => import('@/views/table/property'),
        meta: { title: '物业费管理', icon: 'el-icon-water-cup' }
      },
      {
        path: 'water',
        name: 'water',
        component: () => import('@/views/table/water'),
        meta: { title: '用水管理', icon: 'el-icon-water-cup' }
      },
      {
        path: 'gas',
        name: 'gas',
        component: () => import('@/views/table/gas'),
        meta: { title: '用气管理', icon: 'el-icon-water-cup' }
      },   
     {
        path: 'power',
        name: 'power',
        component: () => import('@/views/table/power'),
        meta: { title: '用电管理', icon: 'el-icon-water-cup' }
      },
      {
        path: 'dock',
        name: 'dock',
        component: () => import('@/views/table/dock'),
        meta: { title: '停车管理', icon: 'el-icon-water-cup' }
      }
     
    ]
  },


  {
    path: '/service',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '服务中心', icon: 'el-icon-service' },
    children: [
      {
        path: 'application',
        name: 'application',
        component: () => import('@/views/table/application'),
        meta: { title: '客户申请', icon: 'el-icon-ship' }
      },
      {
        path: 'complaint',
        name: 'complaint',
        component: () => import('@/views/table/complaint'),
        meta: { title: '客诉回复', icon: 'el-icon-error' }
      }
     
    ]
  },






  {
    path: '/form',
    component: Layout,
    meta: { title: '配置中心', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'fchannel',
        name: 'fchannel',
        component: () => import('@/views/form/pay'),
        meta: { title: '支付配置', icon: 'form' }
      },
      {
        path: 'adver',
        name: 'adver',
        component: () => import('@/views/form/gg'),
        meta: { title: '广告配置', icon: 'form' }
      },
      {
        path: 'rate',
        name: 'rate',
        component: () => import('@/views/form/wy'),
        meta: { title: '物业费率配置', icon: 'form' }
      }
    ]
    
  },


  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://ehomes.top',
        meta: { title: '访问我的主页', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
