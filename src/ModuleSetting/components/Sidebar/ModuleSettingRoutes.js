export const ModuleSettingRoutes = [
    {
        "path": "/login",
        "hidden": true
    },
    {
        "path": "/404",
        "hidden": true
    },
    {
        "path": "/setting-module",
        "redirect": "/setting-module/user-info",
        "name": "UserInfo",
        "meta": {
            "title": "设置",
            "icon": "el-icon-notebook-2"
        },
        "children": [
            {
                "path": "user-info",
                "name": "UserInfo",
                "meta": {
                    "title": "用户信息",
                    "icon": "el-icon-notebook-1"
                }
            },
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