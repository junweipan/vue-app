import ModuleValue from '@/layout/ModuleLayoutValue'
export const valueRoutes = {
    path: '/value-module',
    component: ModuleValue,
    redirect: '/value-module/dashboard',
    
    children: [{
    path: 'dashboard',
    name: 'Dashboard-Value',
    component: () => import('@/views/moduleValue/dashboard/index'),
    meta: { title: '产值分配-主页', icon: 'dashboard', affix: false }
  },
  {
    path: 'article',
    name: 'Article',
    component: () => import('@/views/moduleValue/article/index'),
    meta: { title: '产值分配-菜单功能1', icon: 'el-icon-notebook-1' }
  },
  {
    path: 'category',
    name: 'Category',
    component: () => import('@/views/moduleValue/category/index'),
    meta: { title: '产值分配-菜单功能2', icon: 'el-icon-s-order' }
  }]
}