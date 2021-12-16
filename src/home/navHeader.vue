<template>
    <div>
     <el-menu :default-active="activeIndex" router :class="classObj" class="el-menu-demo" mode="horizontal" @select="handleSelect">
       <el-menu-item>
          <el-dropdown>
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu :class = "elDropdownMenuClass" slot="dropdown">
            
            <el-dropdown-item>
              <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        
       </el-menu-item>
       
        <!-- <el-menu-item index="/module1">默认模块</el-menu-item>
        <el-menu-item index="/module2">新增模块</el-menu-item> -->
        
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
    },
    elDropdownMenuClass() {
      return {
        elDropdownMenuHideSidebar:!this.sidebar.opened,
        elDropdownMenuOpenSidebar:this.sidebar.opened,
    }
      } 
    }
  }
</script>

<style lang='scss' scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
.elDropdownMenuHideSidebar{
    margin-left: 54px;
}
.elDropdownMenuOpenSidebar{
    margin-left: $sideBarWidth; // 210px
}
.el-dropdown-menu{
  margin-top: -15px;
  box-shadow: none;
  background-color: rgb(255 255 255 / 0%);
  border: hidden;
}
.el-dropdown-menu__item {
  padding: 0;
}
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

  .box-card {
    width: 480px;
  }
</style>