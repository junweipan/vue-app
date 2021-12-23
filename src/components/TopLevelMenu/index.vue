<template>
    <el-menu-item>
        <!-- <el-dropdown :hide-on-click="false"> 点击后不隐藏-->
       <el-dropdown trigger="click">
        <span class="el-dropdown-link">
        <i class="el-icon-menu"></i>合同管理
        </span>
        <el-dropdown-menu :class = "elDropdownMenuClass" slot="dropdown">
        <el-dropdown-item>
            <el-card class="box-card">
            <div slot="header" class="clearfix">
            <span>应用中心</span>
            </div>
            <el-row :gutter="20">
            <el-col :span="8">
              <router-link to="/module1">
                <icon-text-button  :imgUrl="require('@/assets/touzi.png')" menuText="合同管理"></icon-text-button>
              </router-link>
            </el-col>
            <el-col :span="8">
              <router-link to="/module2">
                <icon-text-button :imgUrl="require('@/assets/shangpu.png')" menuText="产值分配"></icon-text-button>
              </router-link>
            </el-col>
            <el-col :span="8">
                <icon-text-button :imgUrl="require('@/assets/tjfx.png')" menuText="统计分析"></icon-text-button>
            </el-col>
            </el-row>   
            <el-row :gutter="20">
            <el-col :span="8">
              <router-link to="/setting-module">
                <icon-text-button :imgUrl="require('@/assets/tongyong.png')" menuText="系统设置"></icon-text-button>
              </router-link>
            </el-col>
            </el-row>            
        </el-card>
        </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
    </el-menu-item>
</template>

<script>
import IconTextButton from './iconTextButton.vue'
  export default {
    data() {
      return {
        
      };
    },
    components:{
        IconTextButton
    },
    methods: {
     
    },
    computed:{
      sidebar() {
      return this.$store.state.app.sidebar
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

.box-card {
    width: 300px;
  }
.el-popper ::v-deep .popper__arrow {
    visibility: hidden;
  }
</style>