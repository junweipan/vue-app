
import ModuleSetting from '@/ModuleSetting'
export const settingRoutes = {
  path: '/setting-module',
  component: ModuleSetting,
  redirect: '/setting-module/basic/branch-info',
  meta: {
    title: "",
    icon: ""
  },
  children: [
    {
      path: 'basic',
      component: () => import('@/views/moduleSetting/manageBasic/index'), // Parent router-view
      name: 'ManageBasic',
      meta: { title: '系统配置' },
      redirect: '/setting-module/basic/branch-info',
      children: [
        {
          path: 'branch-info',
          component: () => import('@/views/moduleSetting/manageBasic/branchInfo'),
          name: 'BranchInfo',
          meta: { title: '机构信息维护' }
        },
        {
          path: 'branch-info-edit-add',
          component: () => import('@/views/moduleSetting/manageBasic/branchInfo/branchEditAdd'),
          name: 'BranchInfoEditAdd',
          meta: { title: '机构增加/修改' }
        },
        {
          path: 'role-info',
          component: () => import('@/views/moduleSetting/manageBasic/roleInfo'),
          name: 'RoleInfo',
          meta: { title: '角色信息维护' }
        },
        {
          path: 'role-info-edit-add',
          component: () => import('@/views/moduleSetting/manageBasic/roleInfo/roleEditAdd'),
          name: 'RoleInfoEditAdd',
          meta: { title: '角色增加/修改' }
        },
        {
          path: 'operator',
          component: () => import('@/views/moduleSetting/manageBasic/operator'),
          name: 'Operator',
          meta: { title: '操作员管理' },
        },
        {
          path: 'operator-edit-add',
          component: () => import('@/views/moduleSetting/manageBasic/operator/operatorEditAdd'),
          name: 'OperatorEditAdd',
          meta: { title: '操作员增加/修改' },
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