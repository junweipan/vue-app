import ModuleContract from '@/ModuleContract'
export const contractRoutes = {
  path: '/contract-module',
  component: ModuleContract,
  redirect: '/contract-module/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/moduleContract/dashboard/index'),
    meta: { title: '合同管理-主页', icon: 'dashboard', affix: false }
  },
  {
    path: 'sysLog',
    name: 'SysLog',
    component: () => import('@/views/moduleContract/sysLog/index'),
    meta: { title: '合同管理-系统日志', icon: 'el-icon-s-order' }
  },
  {
    path: 'funmanager',
    name: 'FunManager',
    component: () => import('@/views/moduleContract/funManager/index'),
    meta: { title: '合同管理-功能管理', icon: 'el-icon-collection-tag' }
  },
  {
    path: 'tabledata',
    name: 'Tabledata',
    component: () => import('@/views/moduleContract/tableData/index'),
    meta: {
      title: '合同管理-数据测试',
      icon: 'el-icon-s-grid'
    }
  },
  {
    path: 'tabledata-edit',
    name: 'TabledataEdit',
    component: () => import('@/views/moduleContract/tableData/edit'),
    meta: {
      title: '合同管理-数据测试-修改',
    }
  }
  ]
}