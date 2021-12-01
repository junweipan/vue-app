export const CustomRoutes = [
    // {
    //     "path": "/module1",
    //     "redirect": "/module1/dashboard",
    //     "children": [
    //         {
    //             "path": "dashboard",
    //             "name": "Dashboard",
    //             "meta": {
    //                 "title": "默认模块",
    //                 "icon": "dashboard",
    //                 "affix": false
    //             }
    //         }
    //     ]
    // },
    {
        "path": "/module1",
        "redirect": "/module1/category",
        "name": "Blog",
        "meta": {
            "title": "系统功能",
            "icon": "el-icon-notebook-2"
        },
        "children": [
            {
                "path": "category",
                "name": "Category",
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
            }
        ]
    },
    // {
    //     "path": "/module1/advert",
    //     "children": [
    //         {
    //             "path": "index",
    //             "name": "Advert",
    //             "meta": {
    //                 "title": "广告管理",
    //                 "icon": "el-icon-picture-outline-round"
    //             }
    //         }
    //     ]
    // },
    // {
    //     "path": "/module1/system",
    //     "redirect": "/module1/system/user",
    //     "name": "System",
    //     "meta": {
    //         "title": "系统管理",
    //         "icon": "el-icon-setting"
    //     },
    //     "children": [
    //         {
    //             "path": "user",
    //             "name": "User",
    //             "meta": {
    //                 "title": "用户管理",
    //                 "icon": "el-icon-user-solid"
    //             }
    //         },
    //         {
    //             "path": "role",
    //             "name": "Role",
    //             "meta": {
    //                 "title": "角色管理",
    //                 "icon": "el-icon-coin"
    //             }
    //         },
    //         {
    //             "path": "menu",
    //             "name": "Menu",
    //             "meta": {
    //                 "title": "菜单管理",
    //                 "icon": "el-icon-menu"
    //             }
    //         }
    //     ]
    // },
    // {
    //     "path": "/module1/gg",
    //     "children": [
    //         {
    //             "path": "http://www.google.com",
    //             "meta": {
    //                 "title": "谷歌",
    //                 "icon": "el-icon-link"
    //             }
    //         }
    //     ]
    // },
    // {
    //     "path": "/redirect",
    //     "hidden": true,
    //     "children": [
    //         {
    //             "path": "/redirect/:path(.*)"
    //         }
    //     ]
    // },
    // {
    //     "path": "*",
    //     "redirect": "/404",
    //     "hidden": true
    // }
]