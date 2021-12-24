
import ModuleSetting from '@/ModuleSetting'
export const settingRoutes = {
    path: '/setting-module',
    component: ModuleSetting,
    redirect: '/setting-module/dashboard',
    children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/moduleSetting/dashboard/index'),
    meta: { title: '系统设置-主页', icon: 'userInfo', affix: false }
    },
    {
      path: 'user-info',
      name: 'UserInfo',
      component: () => import('@/views/moduleSetting/userInfo/index'),
      meta: { title: '系统设置-用户信息', icon: 'userInfo', affix: false }
    },
    {
      path: 'upload',
      name: 'Upload',
      component: () => import('@/views/moduleSetting/upload/index'),
      meta: { title: '系统设置-文件上传', icon: 'userInfo', affix: false }
    }
  ]
}