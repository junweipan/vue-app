
import ModuleAnalysis from '@/ModuleAnalysis'
export const analysisRoutes = {
    path: '/analysis-module',
    component: ModuleAnalysis,
    redirect: '/analysis-module/dashboard',
    children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/moduleAnalysis/dashboard/index'),
    meta: { title: '设置', icon: 'userInfo', affix: false }
    },
    {
      path: 'charts-demo',
      name: 'ChartsDemo',
      component: () => import('@/views/moduleAnalysis/charts/index'),
      meta: { title: '图形展示', icon: 'userInfo', affix: false }
    }
  ]
}