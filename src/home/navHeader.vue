<template>
    <div>
     <el-menu :default-active="activeIndex" router :class="classObj" class="el-menu-demo" mode="horizontal" @select="handleSelect">
       <top-level-menu></top-level-menu>
       
      <el-menu-item class="userList">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
      </el-menu-item>
      <el-menu-item class="messageList"><message-list></message-list></el-menu-item>
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
        activeIndex2: '1',
        cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        value: ''
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
  position:absolute;
  z-index: 9;
  /* width: calc(100% - 210px);
  -webkit-transition: width 0.28s;
  transition: width 0.28s; */
  // @media only screen and (max-width: 600px) {
  //   left: 0;
  // }
}
.messageList{
  float: right;
  margin-top: 5px;
}
.userList {
  float: right;
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