export const ModuleValueRoutes = [
    {
        "path": "/login",
        "hidden": true
    },
    {
        "path": "/404",
        "hidden": true
    },
    {
        "path": "/value-module",
        "redirect": "/value-module/dashboard",
        "name": "Dashboard",
        "meta": {
            "title": "产值分配",
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