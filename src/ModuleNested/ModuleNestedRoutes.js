/** When your routing table is too long, you can split it into small modules **/
export const ModuleNestedRoutes = [
    {
        "path": "/login",
        "hidden": true
    },
    {
        "path": "/404",
        "hidden": true
    },
    {
        "path": '/nested',
        "redirect": '/nested/menu1/menu1-1',
        "name": 'Nested',
        "meta": {
          "title": 'Nested Routes',
          "icon": 'nested'
        },
        "children": [
          {
            "path": 'menu1',
            "name": 'Menu1',
            "meta": { "title": 'Menu 1' },
            "redirect": '/nested/menu1/menu1-1',
            "children": [
              {
                "path": 'menu1-1',
                "name": 'Menu1-1',
                "meta": { "title": 'Menu 1-1' }
              },
              {
                "path": 'menu1-2',
                "name": 'Menu1-2',
                "redirect": '/nested/menu1/menu1-2/menu1-2-1',
                "meta": { "title": 'Menu 1-2' },
                "children": [
                  {
                    "path": 'menu1-2-1',
                    "name": 'Menu1-2-1',
                    "meta": { "title": 'Menu 1-2-1' }
                  },
                  {
                    "path": 'menu1-2-2',
                    "name": 'Menu1-2-2',
                    "meta": { "title": 'Menu 1-2-2' }
                  }
                ]
              },
              {
                "path": 'menu1-3',
                "name": 'Menu1-3',
                "meta": { "title": 'Menu 1-3' }
              }
            ]
          },
          {
            "path": 'menu2',
            "name": 'Menu2',
            "meta": { "title": 'Menu 2' }
          }
        ]
      }
]


