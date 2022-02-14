<template>
  <module-layout :moduleRoutes="asyncRoutes"></module-layout>
</template>

<script>
import { mapGetters } from "vuex";
import ModuleLayout from "@/ModuleLayout/moduleLayout";
import { ModuleSettingRoutes } from "./ModuleSettingRoutes";

export default {
  name: "ModuleSetting",
  components: {
    "module-layout": ModuleLayout,
    // 动态路由, 会根据服务器获取, 传入modulelayout后再传给sidebarlayout组件
    ModuleSettingRoutes,
  },
  computed: {
    ...mapGetters(["currentRoleID"]),
  },
  mounted() {
    this.asyncRoutes = this.filterRoutes(ModuleSettingRoutes, 
    this.currentRoleID);
  },
  watch: {
    // 监视store中的roleID改变时, 刷新menu路由
    //重新渲染页面
    currentRoleID: {
      handler: function () {
        this.asyncRoutes = this.filterRoutes(ModuleSettingRoutes, 
        this.currentRoleID);
      },
      immediate: true,
    },
  },
  data() {
    return {
      asyncRoutes: [],
    };
  },
  methods: {
    hasPermission(role, route) {
      if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(role);
      } else {
        return true;
      }
    },
    // 根据store中的roles控制sidebar显示的路由
    filterRoutes(routes, role) {
      const res = [];
      routes.forEach((route) => {
        const tmp = { ...route };
        if (this.hasPermission(role, tmp)) {
          if (tmp.children) {
            tmp.children = this.filterRoutes(tmp.children, role);
          }
          res.push(tmp);
        }
      });
      return res;
    },
  },
};
</script>