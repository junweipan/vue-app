
import ModuleSetting from '@/ModuleSetting'
export const settingRoutes = {
    path: '/setting-module',
    component: ModuleSetting,
    redirect: '/setting-module/dashboard',
    children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/moduleSetting/dashboard/index'),
    meta: { title: '设置', icon: 'userInfo', affix: false }
    },
    {
      path: 'user-info',
      name: 'UserInfo',
      component: () => import('@/views/moduleSetting/userInfo/index'),
      meta: { title: '用户信息', icon: 'userInfo', affix: false }
    }
  ]
}