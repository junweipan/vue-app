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
        "redirect": "/module2/dashboard",
        "children": [
            {
                "path": "dashboard",
                "name": "Dashboard",
                "meta": {
                    "title": "模块二首页",
                    "icon": "dashboard",
                    "affix": false
                }
            }
        ]
    },
    {
        "path": "/module2/blog",
        "redirect": "/module2/blog/article",
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