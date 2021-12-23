export const CustomRoutes = [
    {
        "path": "/login",
        "hidden": true
    },
    {
        "path": "/404",
        "hidden": true
    },
    {
        "path": "/module2",
        "redirect": "/module2/article",
        "name": "Blog",
        "meta": {
            "title": "产值分配",
            "icon": "el-icon-notebook-2"
        },
        "children": [
            {
                "path": "dashboard2",
                "name": "Dashboard2",
                "meta": {
                    "title": "产值主页",
                    "icon": "el-icon-notebook-1"
                }
            },
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