import ModuleTwoLayout from '@/ModuleTwoLayout'
export const module2Routes = {
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
}