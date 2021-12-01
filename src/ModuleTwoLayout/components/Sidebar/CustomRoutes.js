export const CustomRoutes = [
    {
        "path": "/login",
        "hidden": true
    },
    {
        "path": "/404",
        "hidden": true
    },
    // {
    //     "path": "/module2",
    //     "redirect": "/module2/dashboard2",
    //     "children": [
    //         {
    //             "path": "dashboard2",
    //             "name": "Dashboard2",
    //             "meta": {
    //                 "title": "新增模块",
    //                 "icon": "dashboard",
    //                 "affix": false
    //             }
    //         }
    //     ]
    // },
    {
        "path": "/module2",
        "redirect": "/module2/article",
        "name": "Blog",
        "meta": {
            "title": "一级分组",
            "icon": "el-icon-notebook-2"
        },
        "children": [
            {
                "path": "article",
                "name": "Article",
                "meta": {
                    "title": "菜单功能1",
                    "icon": "el-icon-notebook-1"
                }
            },
            {
                "path": "category",
                "name": "Category",
                "meta": {
                    "title": "菜单功能2",
                    "icon": "el-icon-s-order"
                }
            },
            // {
            //     "path": "label",
            //     "name": "Label",
            //     "meta": {
            //         "title": "标签管理",
            //         "icon": "el-icon-collection-tag"
            //     }
            // }
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