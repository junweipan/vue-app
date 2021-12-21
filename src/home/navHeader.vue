<template>
    <div>
     <el-menu :default-active="activeIndex" router :class="classObj" class="el-menu-demo" mode="horizontal" @select="handleSelect">
       <top-level-menu></top-level-menu>
      <el-menu-item class="userList">
        <el-select v-model="value" @change="setAcivateType">
          <el-option
            v-for="item in items"
            :key="item.id"
            :label="item.client"
            :value="item.id">
            <user-card :client="item.client" :level="item.level" :type="item.type" :autority="item.autority"></user-card>
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
import UserCard from '@/components/UserCard'
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        items: [{
          id:'1',
          client: '舟山市规划建筑设计院有限公司',
          level: '本级',
          type:'success',
          autority:'开发人员'
        }, {
          id:'2',
          client: 'XXXX有限公司',
          level: '一级',
          type:'info',
          autority:'普通用户'
        }],
        value: '舟山市规划建筑设计院有限公司'
      };
    },
    components:{
      'message-list':MessageList,
      'top-level-menu': TopLevalMenu,
      'user-card': UserCard
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      setAcivateType(id){
        // TODO 把当前client 发给服务器, 再刷一下服务器数据
        
        const index = this.items.findIndex(item=>item.id == id)
        // 把其他type置成info, 把选中的item type 置成success
        this.$data.items.forEach(element => {
          element.type = 'info'
        });
        this.$data.items[index].type = 'success'
        
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
  // 这段css控制顶级菜单和sidebar, 不能轻易更改
  width: 100%;
  position:fixed;
  right: 0;
  z-index: 9;
  /* width: calc(100% - 210px);
  -webkit-transition: width 0.28s;
  transition: width 0.28s; */
  // @media only screen and (max-width: 600px) {
  //   left: 0;
  // }
}

::v-deep .el-input__inner{
  width: 230px;
  background-color: rgba(51, 211, 131, 0.2);
  text-align: center;
  padding-right: 15px;
   //border: none;
}
::v-deep .el-select .el-input .el-select__caret {
  color: transparent;
}
.el-select-dropdown__item{
  height: auto;
  cursor:auto;
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