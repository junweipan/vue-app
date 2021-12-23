import ModuleOneLayout from '@/ModuleOneLayout'
export const module1Routes = {
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
  }