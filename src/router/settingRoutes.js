
import ModuleSetting from '@/ModuleSetting'
export const settingRoutes = {
    path: '/setting-module',
    component: ModuleSetting,
    redirect: '/setting-module/dashboard',
    children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/settingModule/dashboard/index'),
    meta: { title: '设置', icon: 'userInfo', affix: false }
    },
    {
      path: 'user-info',
      name: 'UserInfo',
      component: () => import('@/views/settingModule/userInfo/index'),
      meta: { title: '用户信息', icon: 'userInfo', affix: false }
    },
    {
      path: 'charts-demo',
      name: 'ChartsDemo',
      component: () => import('@/views/settingModule/charts/index'),
      meta: { title: '图形展示', icon: 'userInfo', affix: false }
    }
  ]
}