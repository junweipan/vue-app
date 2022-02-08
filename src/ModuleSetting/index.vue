<template>
  <module-layout :moduleRoutes="asyncRoutes"></module-layout>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(["roles"]),
  },
  mounted() {
    this.asyncRoutes = this.filterRoutes(
      ModuleSettingRoutes,
      this.roles
    );
  },
  data() {
    return {
      asyncRoutes: [],
      // currentRoles: ["admin"],
    };
  },
  methods: {
    hasPermission(roles, route) {
      if (route.meta && route.meta.roles) {
        return roles.some((role) => route.meta.roles.includes(role));
      } else {
        return true;
      }
    },
    // 根据store中的roles控制sidebar显示的路由
    filterRoutes(routes, roles) {
      const res = [];
      routes.forEach((route) => {
        const tmp = { ...route };
        if (this.hasPermission(roles, tmp)) {
          if (tmp.children) {
            tmp.children = this.filterRoutes(tmp.children, roles);
          }
          res.push(tmp);
        }
      });

      return res;
    },
  },
};
</script>