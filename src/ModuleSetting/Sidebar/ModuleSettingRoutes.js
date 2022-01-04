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
        "redirect": "/setting-module/dashboard",
        "name": "dashboard",
        "meta": {
            "title": "系统设置",
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