export const ModuleAnalysisRoutes = [
    {
        "path": "/login",
        "hidden": true
    },
    {
        "path": "/404",
        "hidden": true
    },
    {
        "path": "/analysis-module",
        "redirect": "/analysis-module/dashboard",
        "name": "统计分析页",
        "meta": {
            "title": "统计分析",
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
                "path": "charts-demo",
                "name": "ChartsDemo",
                "meta": {
                    "title": "图形展示",
                    "icon": "el-icon-s-marketing"
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