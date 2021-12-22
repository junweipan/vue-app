/* Layout - ModuleOne */
import ModuleOneLayout from '@/ModuleOneLayout'
import ModuleTwoLayout from '@/ModuleTwoLayout'
import ModuleSetting from '@/ModuleSetting'

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
          component: ModuleOneLayout,
          redirect: '/welcome',
          children: [{
          path: 'welcome',
          name: 'Welcome',
          component: () => import('@/views/welcome/index'),
          meta: { title: '欢迎页', icon: 'dashboard', affix: true }
        }]
        },
        {
          path: '/module1',
          component: ModuleOneLayout,
          redirect: '/module1/dashboard',
          children: [{
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/index'),
          meta: { title: '默认模块', icon: 'dashboard', affix: false }
        },
        {
          path: 'sysLog',
          name: 'SysLog',
          component: () => import('@/views/defaultModule/sysLog/index'),
          meta: { title: '系统日志', icon: 'el-icon-s-order' }
        },
        {
          path: 'funmanager',
          name: 'FunManager',
          component: () => import('@/views/defaultModule/funManager/index'),
          meta: { title: '功能管理', icon: 'el-icon-collection-tag' }
        },
        {
          path: 'tabledata',
          name: 'Tabledata',
          component: () => import('@/views/tableData/index'),
          meta: {
              title: '数据测试',
              icon: 'el-icon-s-grid'
          }
      }]
        },
        {
          path: '/module2',
          component: ModuleTwoLayout,
          redirect: '/module2/dashboard2',
          children: [{
          path: 'dashboard2',
          name: 'Dashboard2',
          component: () => import('@/views/dashboard2/index'),
          meta: { title: '新增模块', icon: 'dashboard2', affix: false }
        },
        {
          path: 'article',
          name: 'Article',
          component: () => import('@/views/article/index'),
          meta: { title: '菜单功能1', icon: 'el-icon-notebook-1' }
        },
        {
          path: 'category',
          name: 'Category',
          component: () => import('@/views/category/index'),
          meta: { title: '菜单功能2', icon: 'el-icon-s-order' }
        }]
      },
      {
        path: '/setting-module',
        component: ModuleSetting,
        redirect: '/setting-module/user-info',
        children: [{
        path: 'user-info',
        name: 'UserInfo',
        component: () => import('@/views/userInfo/index'),
        meta: { title: '用户信息', icon: 'userInfo', affix: false }
        }
      ]
    }
      ]
    },
      {
        path: '/redirect',
        component: ModuleOneLayout,
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