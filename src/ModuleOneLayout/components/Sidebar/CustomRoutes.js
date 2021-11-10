export const CustomRoutes = [
    // {
    //     "path": "/",
    //     "redirect": "/module1/dashboard",
    //     "children": [
    //         {
    //             "path": "dashboard",
    //             "name": "Dashboard",
    //             "meta": {
    //                 "title": "总首页",
    //                 "icon": "dashboard",
    //                 "affix": true
    //             }
    //         }
    //     ]
    // },
    {
        "path": "/module1",
        "redirect": "/module1/dashboard",
        "children": [
            {
                "path": "dashboard",
                "name": "Dashboard",
                "meta": {
                    "title": "模块一首页",
                    "icon": "dashboard",
                    "affix": false
                }
            }
        ]
    },
    {
        "path": "/module1/blog",
        "redirect": "/module1/blog/article",
        "name": "Blog",
        "meta": {
            "title": "博客管理",
            "icon": "el-icon-notebook-2"
        },
        "children": [
            {
                "path": "article",
                "name": "Article",
                "meta": {
                    "title": "文章管理",
                    "icon": "el-icon-notebook-1"
                }
            },
            {
                "path": "category",
                "name": "Category",
                "meta": {
                    "title": "分类管理",
                    "icon": "el-icon-s-order"
                }
            },
            {
                "path": "label",
                "name": "Label",
                "meta": {
                    "title": "标签管理",
                    "icon": "el-icon-collection-tag"
                }
            }
        ]
    },
    {
        "path": "/module1/advert",
        "children": [
            {
                "path": "index",
                "name": "Advert",
                "meta": {
                    "title": "广告管理",
                    "icon": "el-icon-picture-outline-round"
                }
            }
        ]
    },
    {
        "path": "/module1/system",
        "redirect": "/module1/system/user",
        "name": "System",
        "meta": {
            "title": "系统管理",
            "icon": "el-icon-setting"
        },
        "children": [
            {
                "path": "user",
                "name": "User",
                "meta": {
                    "title": "用户管理",
                    "icon": "el-icon-user-solid"
                }
            },
            {
                "path": "role",
                "name": "Role",
                "meta": {
                    "title": "角色管理",
                    "icon": "el-icon-coin"
                }
            },
            {
                "path": "menu",
                "name": "Menu",
                "meta": {
                    "title": "菜单管理",
                    "icon": "el-icon-menu"
                }
            }
        ]
    },
    {
        "path": "/module1/gg",
        "children": [
            {
                "path": "http://www.google.com",
                "meta": {
                    "title": "谷歌",
                    "icon": "el-icon-link"
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