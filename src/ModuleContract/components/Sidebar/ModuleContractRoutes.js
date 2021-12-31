export const ModuleContractRoutes = [
    {
        "path": "/login",
        "hidden": true
    },
    {
        "path": "/404",
        "hidden": true
    },
    {
        "path": "/contract-module",
        "redirect": "/contract-module/dashboard",
        "name": "Dashboard",
        "meta": {
            "title": "合同管理",
            "icon": "el-icon-notebook-2"
        },
        "children": [
            {
                "path": "dashboard",
                "name": "Dashboard",
                "meta": {
                    "title": "Home page",
                    "icon": "el-icon-s-home"
                }
            },
            {
                "path": "sysLog",
                "name": "SysLog",
                "meta": {
                    "title": "系统日志",
                    "icon": "el-icon-s-order"
                }
            },
            {
                "path": "funmanager",
                "name": "FunManager",
                "meta": {
                    "title": "功能管理",
                    "icon": "el-icon-collection-tag"
                }
            },
            {
                "path": "tabledata",
                "name": "Tabledata",
                "meta": {
                    "title": "数据测试",
                    "icon": "el-icon-s-grid"
                }
            },
            {
                "path": "tabledata-edit",
                "hidden":true,
                "name": "TabledataEdit",
                "meta": {
                    "title": "数据修改",
                    "icon": "el-icon-s-grid"
                }
            }
        ]
    },
    {
        "path": "/redirect",
        "hidden": true,
        "children": [
            {
                "path": "/redirect/:path(.*)"
            }
        ]
    },
    {
        "path": "*",
        "redirect": "/404",
        "hidden": true
    }
]