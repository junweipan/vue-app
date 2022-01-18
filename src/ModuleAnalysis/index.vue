<template>
  <module-layout :moduleRoutes='moduleRoutes'></module-layout>
</template>

<script>
import ModuleLayout from "@/ModuleLayout/moduleLayout";
import { ModuleAnalysisRoutes } from './ModuleAnalysisRoutes'

export default {
  name: "ModuleAnalysis",
  components: {
    "module-layout": ModuleLayout,
    // 动态路由, 会根据服务器获取, 传入modulelayout后再传给sidebarlayout组件
    ModuleAnalysisRoutes
  },
  data(){
    return ({
      moduleRoutes:ModuleAnalysisRoutes
    })
  }
};
</script>