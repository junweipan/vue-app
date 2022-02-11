export const ModuleSettingRoutes = [
    {
        "path": "/setting-module",
        "redirect": "/setting-module/sys-setting/branch-info",
        "meta": {
            "title": "系统管理",
            "icon": "el-icon-s-home"
        },
        "children": [
            {
                "path": 'sys-setting',
                "meta": { "title": '系统配置' },
                "redirect": '/setting-module/sys-setting/branch-info',
                "children": [
                    {
                        "path": 'branch-info',
                        "name": 'BranchInfo',
                        "meta": { "title": '机构信息维护' },
                    },
                    {
                        "path": 'branch-info-edit-add',
                        "name": 'BranchInfoEditAdd',
                        "meta": { "title": '机构增加/修改', "roles":['admin'] },
                    },
                    {
                        "path": 'role-info',
                        "name": 'RoleInfo',
                        "meta": { "title": '角色信息维护' }
                    },
                    {
                        "path": 'role-info-edit-add',
                        "name": 'RoleInfoEditAdd',
                        "meta": { "title": '角色增加/修改',"roles":[11] }
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
                        "meta": { "title": '角色增加/修改',"roles":[11] }
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