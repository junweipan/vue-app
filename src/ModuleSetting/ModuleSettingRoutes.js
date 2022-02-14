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
            "title": "系统管理",
            "icon": "el-icon-s-home"
        },
        "children": [
            {
                "path": 'basic',
                "meta": { "title": '系统配置' },
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
                        "meta": { "title": '机构增加/修改', "roles":[1,11] },
                    },
                    {
                        "path": 'role-info',
                        "name": 'RoleInfo',
                        "meta": { "title": '角色信息维护' }
                    },
                    {
                        "path": 'role-info-edit-add',
                        "name": 'RoleInfoEditAdd',
                        "meta": { "title": '角色增加/修改',"roles":[1,11] }
                    },
                    {
                        "path": 'operator',
                        "name": 'Operator',
                        "meta": { "title": '操作员管理' },
                    },
                    {
                        "path": 'operator-edit-add',
                        "name": 'OperatorEditAdd',
                        "meta": { "title": '操作员增加/修改' },
                        "meta": { "title": '角色增加/修改',"roles":[1,11] }
                    },
                ]
            },
            {
                "path": "user-info",
                "name": "UserInfo",
                "meta": {
                    "title": "用户信息",
                    "icon": "el-icon-s-custom"
                }
            },
            {
                "path": "upload",
                "name": "Upload",
                "meta": {
                    "title": "文件上传",
                    "icon": "el-icon-s-custom"
                }
            },
            {
                "path": "message-list",
                "name": "MessageList",
                "meta": {
                    "title": "消息列表",
                    "icon": "el-icon-s-custom"
                }
            }
        ]
    }
]