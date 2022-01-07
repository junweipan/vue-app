<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '@/ModuleLayout/components/Sidebar/Logo'
import SidebarItem from '@/ModuleLayout/components/Sidebar/SidebarItem'
import variables from '@/styles/variables.scss'

import { getToken } from '@/utils/auth' // get token from cookie

export default {
  components: { SidebarItem, Logo },
  props:{
    moduleRoutes:{ 
            type: Array,
            default: []
        },
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      // console.log(this.$router.options.routes)
      // 完整路径
      // return this.$router.options.routes

      // 部分路由, 控制页面显示 每次改变路由要检查token权限
      const hasToken = getToken()
      return this.moduleRoutes;
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
