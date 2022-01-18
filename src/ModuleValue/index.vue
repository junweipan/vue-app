<template>
  <module-layout :moduleRoutes='moduleRoutes'></module-layout>
</template>

<script>
import ModuleLayout from "@/ModuleLayout/moduleLayout";
import { ModuleValueRoutes } from './ModuleValueRoutes'

export default {
  name: "ModuleValue",
  components: {
    "module-layout": ModuleLayout,
    // 动态路由, 会根据服务器获取, 传入modulelayout后再传给sidebarlayout组件
    ModuleValueRoutes
  },
  data(){
    return ({
      moduleRoutes:ModuleValueRoutes
    })
  }
};
</script>