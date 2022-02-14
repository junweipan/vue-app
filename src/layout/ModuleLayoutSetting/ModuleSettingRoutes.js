// 角色ID  角色名称
// 1	   开发人员
// 22	   产值分配经办人
// 19	   公司领导
// 21	   工程主持人
// 62	   中层领导（财务主管所室负责人）
// 64	   普通员工
// 65	   产值工作人员
// 11	   超级管理员
export const ModuleSettingRoutes = [
    {
        "path": "/setting-module",
        "redirect": "/setting-module/basic/branch-info",
        "meta": {
            "title": "系统设置",
            "icon": "el-icon-s-home"
        },
        "children": [
            {
                "path": 'basic',
                "meta": { "title": '基础管理' },
                "redirect": '/setting-module/basic/branch-info',
                "children": [
                    {
                        "path": 'branch-info',
                        "name": 'BranchInfo',
                        "meta": { "title": '机构信息维护' },
                    },
                    {
                        "path": 'branch-info-edit-add',
                        "name": 'BranchInfoEditAdd',
                        "meta": { "title": '机构增加/修改', "roles": [1, 11] },
                    },
                    {
                        path: 'department-info',
                        component: () => import('@/views/moduleSetting/manageBasic/departmentInfo'),
                        name: 'DepartmentInfo',
                        meta: { title: '部门信息维护' }
                    },
                    {
                        path: 'occupation-info',
                        component: () => import('@/views/moduleSetting/manageBasic/occupationInfo'),
                        name: 'OccupationInfo',
                        meta: { title: '岗位信息维护' }
                    },
                    {
                        path: 'employee-info',
                        component: () => import('@/views/moduleSetting/manageBasic/employeeInfo'),
                        name: 'EmployeeInfo',
                        meta: { title: '员工信息维护' }
                    },

                ],
                // "children": [
                //     {
                //       "path": 'system',
                //       "name": 'System',
                //       "meta": { "title": '信息管理' }
                //     },
                //   ]
            },
            {
                path: 'system',
                name: 'ManageSystem',
                meta: { title: '系统管理' },
                redirect: '/setting-module/system/role-info',
                children: [
                    {
                        "path": 'role-info',
                        "name": 'RoleInfo',
                        "meta": { "title": '角色信息维护' }
                    },
                    {
                        path: 'role-info-edit-add',
                        component: () => import('@/views/moduleSetting/manageSystem/roleInfo/roleEditAdd'),
                        name: 'RoleInfoEditAdd',
                        meta: { title: '角色增加/修改', "roles": [1, 11] }
                    },
                    {
                        path: 'audit',
                        component: () => import('@/views/moduleSetting/manageSystem/audit'),
                        name: 'Audit',
                        meta: { title: '审核流程配置' }
                    },
                    {
                        path: 'operator',
                        component: () => import('@/views/moduleSetting/manageSystem/operator'),
                        name: 'Operator',
                        meta: { title: '操作员管理' },
                    },
                    {
                        path: 'operator-edit-add',
                        component: () => import('@/views/moduleSetting/manageSystem/operator/operatorEditAdd'),
                        name: 'OperatorEditAdd',
                        meta: { title: '操作员增加/修改', "roles": [1, 11] },
                    },
                    {
                        path: 'operation-log',
                        component: () => import('@/views/moduleSetting/manageSystem/operationLog'),
                        name: 'OperationLog',
                        meta: { title: '操作日志查询' }
                    },
                    {
                        path: 'system-config',
                        component: () => import('@/views/moduleSetting/manageSystem/systemConfig'),
                        name: 'SystemConfig',
                        meta: { title: '系统参数配置' }
                    },
                ]
            },
            {
                "path": 'setting',
                "name": 'ManageSetting',
                "meta": { "title": '配置管理' },
                "redirect": '/setting-module/setting/busi-config',
                "children": [
                    {
                        path: 'project-type',
                        component: () => import('@/views/moduleSetting/manageSetting/projectType'),
                        name: 'ProjectType',
                        meta: { title: '工程类型维护' }
                    },
                    {
                        path: 'occupation-ratio',
                        component: () => import('@/views/moduleSetting/manageSetting/occupationRatio'),
                        name: 'OccupationRatio',
                        meta: { title: '工种岗位比例配置' }
                    },
                    {
                        path: 'busi-config',
                        component: () => import('@/views/moduleSetting/manageSetting/busiConfig'),
                        name: 'BusiConfig',
                        meta: { title: '业务参数配置' }
                    },
                ]
            },
            // {
            //     "path": "user-info",
            //     "name": "UserInfo",
            //     "meta": {
            //         "title": "用户信息",
            //         "icon": "el-icon-s-custom"
            //     }
            // },
            // {
            //     "path": "upload",
            //     "name": "Upload",
            //     "meta": {
            //         "title": "文件上传",
            //         "icon": "el-icon-s-custom"
            //     }
            // },
            // {
            //     "path": "message-list",
            //     "name": "MessageList",
            //     "meta": {
            //         "title": "消息列表",
            //         "icon": "el-icon-s-custom"
            //     }
            // }
        ],
    }
]