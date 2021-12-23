/* Layout - ModuleOne */
import ModuleContract from '@/ModuleContract'

import { contractRoutes } from './contractRoutes'
import { module2Routes } from './module2Routes'
import { settingRoutes } from './settingRoutes'
import { analysisRoutes } from './analysisRoutes'

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
export const constantRoutes= [
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
      component: () => import('@/home/index'),
      children:[
        {
          path: '/',
          component: ModuleContract,
          redirect: '/welcome',
          children: [{
          path: 'welcome',
          name: 'Welcome',
          component: () => import('@/views/welcome/index'),
          meta: { title: '欢迎页', icon: 'dashboard', affix: true }
        }]
        },
        contractRoutes,
        module2Routes,
        analysisRoutes,
        settingRoutes,
      ]
    },
      {
        path: '/redirect',
        component: ModuleContract,
        hidden: true,
        children: [
          {
            path: '/redirect/:path(.*)',
            component: () => import('@/views/redirect/index')
          }
        ]
      },

      // 404 page must be placed at the end !!!
      { path: '*', redirect: '/404', hidden: true }
]