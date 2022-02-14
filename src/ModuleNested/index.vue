<template>
  <module-layout :moduleRoutes='moduleRoutes'></module-layout>
</template>

<script>
import ModuleLayout from "../ModuleLayout/moduleLayout";
import { ModuleNestedRoutes } from './ModuleNestedRoutes'

export default {
  name: "ModuleNeted",
  components: {
    "module-layout": ModuleLayout,
    // 动态路由, 会根据服务器获取, 传入modulelayout后再传给sidebarlayout组件
    ModuleNestedRoutes
  },
  data(){
    return ({
      moduleRoutes:ModuleNestedRoutes
    })
  }
};
</script>