<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="hasTagsView main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <!-- 使用标签导航组件 -->
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
// 1. 导入标签导航组件TagsView
import Sidebar from './Sidebar'
import AppMain from '@/ModuleLayout/components/AppMain'
import TagsView from '@/ModuleLayout/components/TagsView'
import Navbar from '@/components/NavBar'
import ResizeMixin from '@/ModuleLayout/mixin/ResizeHandler'

export default {
  name: 'ModuleValue',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView // 2. 引入 TagsView 组件
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  @import "~@/ModuleLayout/indexStyle.scss";
</style>
