<template>
    <div>
     <el-menu :default-active="activeIndex" router :class="classObj" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/module1">功能模块一</el-menu-item>
        <el-menu-item index="/module2">功能模块二</el-menu-item>
        
          <!-- <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu> -->
       <el-menu-item class="newMessage"><message-list></message-list></el-menu-item>
    <!-- <el-menu-item index="4" disabled><a disabled href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
    </el-menu>
    </div>
</template>


<script>
import MessageList from './messageList.vue'
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    components:{
      'message-list':MessageList
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed:{
      sidebar() {
      return this.$store.state.app.sidebar
    },
     classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
    }
  }
</script>

<style lang='scss' scoped>
.newMessage {
  float: right;
}
.el-menu-demo{
  width: 100%;
  position: fixed;
  right: 0;
  z-index: 9;
  /* width: calc(100% - 210px);
  -webkit-transition: width 0.28s;
  transition: width 0.28s; */
  // @media only screen and (max-width: 600px) {
  //   left: 0;
  // }
}

.hideSidebar{
    width: calc(100% - 54px);
    transition: width 0.28s;
     @media only screen and (max-width: 1000px) {
      width: 100%;
    }
  }
.openSidebar{
    width: calc(100% - 210px);
    transition: width 0.28s;
  }
</style>