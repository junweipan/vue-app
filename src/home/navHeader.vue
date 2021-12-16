<template>
    <div>
     <el-menu :default-active="activeIndex" router :class="classObj" class="el-menu-demo" mode="horizontal" @select="handleSelect">
       <top-level-menu></top-level-menu>
       <el-menu-item class="newMessage"><message-list></message-list></el-menu-item>
    </el-menu>
    </div>
</template>


<script>
import MessageList from './messageList.vue'
import TopLevalMenu from '@/components/TopLevelMenu'
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    components:{
      'message-list':MessageList,
      'top-level-menu': TopLevalMenu
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
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

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>