<template>
  <module-layout :moduleRoutes='moduleRoutes'></module-layout>
</template>

<script>
import ModuleLayout from "../ModuleLayout/moduleLayout";
import { ModuleContractRoutes } from './ModuleContractRoutes'

export default {
  name: "ModuleContract",
  components: {
    "module-layout": ModuleLayout,
    // 动态路由, 会根据服务器获取, 传入modulelayout后再传给sidebarlayout组件
    ModuleContractRoutes
  },
  data(){
    return ({
      moduleRoutes:ModuleContractRoutes
    })
  }
};
</script>