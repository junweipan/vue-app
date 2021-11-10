/* Layout - ModuleOne */
import ModuleOneLayout from '@/ModuleOneLayout'
import ModuleTwoLayout from '@/ModuleTwoLayout'

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
      component: ModuleOneLayout,
      redirect: '/module1/dashboard',
      children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '总首页', icon: 'dashboard', affix: true }
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
      meta: { title: '模块一首页', icon: 'dashboard', affix: false }
    }]
    },
    // 博客管理
    {
      path: '/module1/blog',
      component: ModuleOneLayout,
      redirect: '/module1/blog/article',
      name: 'Blog',
      meta: { title: '博客管理', icon: 'el-icon-notebook-2' },
      children: [
        {
          path: 'article',
          name: 'Article',
          component: () => import('@/views/article/index'),
          meta: { title: '文章管理', icon: 'el-icon-notebook-1' }
        },
        {
          path: 'category',
          name: 'Category',
          component: () => import('@/views/category/index'),
          meta: { title: '分类管理', icon: 'el-icon-s-order' }
        },
        {
          path: 'label',
          name: 'Label',
          component: () => import('@/views/label/index'),
          meta: { title: '标签管理', icon: 'el-icon-collection-tag' }
        }
      ]
    },
      // 广告管理
      {
        path: '/module1/advert',
        component: ModuleOneLayout,
        children: [
          {
            path: 'index',
            name: 'Advert',
            component: () => import('@/views/advert/index'),
            meta: { title: '广告管理', icon: 'el-icon-picture-outline-round' }
          }
        ]
      },

      // 系统管理
      {
        path: '/module1/system',
        component: ModuleOneLayout,
        redirect: '/module1/system/user',
        name: 'System',
        meta: { title: '系统管理', icon: 'el-icon-setting' },
        children: [
          {
            path: 'user',
            name: 'User',
            component: () => import('@/views/user/index'),
            meta: { title: '用户管理', icon: 'el-icon-user-solid' }
          },
          {
            path: 'role',
            name: 'Role',
            component: () => import('@/views/role/index'),
            meta: { title: '角色管理', icon: 'el-icon-coin' }
          },
          {
            path: 'menu',
            name: 'Menu',
            component: () => import('@/views/menu/index'),
            meta: { title: '菜单管理', icon: 'el-icon-menu' }
          }
        ]
      },

      // 跳转外网
      {
        path: '/module1/gg',
        component: ModuleOneLayout,
        children: [
          {
            path: 'http://www.google.com',
            meta: { title: '谷歌', icon: 'el-icon-link' }
          }
        ]
      },
        {
          path: '/module2',
          component: ModuleTwoLayout,
          redirect: '/module2/dashboard',
          children: [{
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/index'),
          meta: { title: '模块二首页', icon: 'dashboard', affix: false }
        }]
      },
      // 博客管理
      {
        path: '/module2/blog',
        component: ModuleTwoLayout,
        redirect: '/module2/blog/article',
        name: 'Blog',
        meta: { title: '博客管理', icon: 'el-icon-notebook-2' },
        children: [
          {
            path: 'article',
            name: 'Article',
            component: () => import('@/views/article/index'),
            meta: { title: '文章管理', icon: 'el-icon-notebook-1' }
          },
          {
            path: 'category',
            name: 'Category',
            component: () => import('@/views/category/index'),
            meta: { title: '分类管理', icon: 'el-icon-s-order' }
          },
          {
            path: 'label',
            name: 'Label',
            component: () => import('@/views/label/index'),
            meta: { title: '标签管理', icon: 'el-icon-collection-tag' }
          }
        ]
      },
      // 标签导航刷新
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