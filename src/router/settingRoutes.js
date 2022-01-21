
import ModuleSetting from '@/ModuleSetting'
export const settingRoutes = {
  path: '/setting-module',
  component: ModuleSetting,
  redirect: '/setting-module/sys-setting/branch-info',
  meta: {
    title: "",
    icon: ""
  },
  children: [
    {
      path: 'sys-setting',
      component: () => import('@/views/moduleSetting/sysSetting/index'), // Parent router-view
      name: 'SystemSetting',
      meta: { title: '系统配置' },
      redirect: '/setting-module/sys-setting/branch-info',
      children: [
        {
          path: 'branch-info',
          component: () => import('@/views/moduleSetting/sysSetting/branchInfo'),
          name: 'BranchInfo',
          meta: { title: '机构信息维护' }
        },
        {
          path: 'branch-info-edit-add',
          component: () => import('@/views/moduleSetting/sysSetting/branchInfo/branchEditAdd'),
          name: 'BranchInfoEditAdd',
          meta: { title: '机构增加/修改' }
        },
        {
          path: 'role-info',
          component: () => import('@/views/moduleSetting/sysSetting/roleInfo'),
          name: 'RoleInfo',
          meta: { title: '角色信息维护' }
        },
        {
          path: 'operator',
          component: () => import('@/views/moduleSetting/sysSetting/operator'),
          name: 'Operator',
          meta: { title: '操作员管理' },
        },
      ]
    },
    // {
    //   path: 'dashboard',
    //   name: 'Dashboard-Setting',
    //   component: () => import('@/views/moduleSetting/dashboard/index'),
    //   meta: { title: '系统设置-主页', icon: 'userInfo', affix: false }
    // },
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
    },
    ,
    {
      path: 'message-list',
      name: 'MessageList',
      component: () => import('@/views/moduleSetting/message'),
      meta: { title: '系统设置-消息列表', icon: 'userInfo', affix: false }
    },
  ]
}