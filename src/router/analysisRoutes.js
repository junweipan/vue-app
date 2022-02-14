
import ModuleAnalysis from '@/layout/ModuleLayoutAnalysis'
export const analysisRoutes = {
    path: '/analysis-module',
    component: ModuleAnalysis,
    redirect: '/analysis-module/dashboard',
    children: [{
    path: 'dashboard',
    name: 'Dashboard-Analysis',
    component: () => import('@/views/moduleAnalysis/dashboard/index'),
    meta: { title: '统计分析-主页', icon: 'userInfo', affix: false }
    },
    {
      path: 'charts-demo',
      name: 'ChartsDemo',
      component: () => import('@/views/moduleAnalysis/charts/index'),
      meta: { title: '统计分析-图形展示', icon: 'userInfo', affix: false }
    }
  ]
}