<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      router
      :class="classObj"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <top-level-menu></top-level-menu>
      <el-menu-item class="userList">
        <el-select v-model="value" @change="setAcivateType">
          <el-option
            v-for="user in usersdb"
            :key="user.id"
            :label="user.client"
            :value="user.id"
          >
            <user-card
              :id="user.id"
              :client="user.client"
              :level="user.level"
              :type="user.type"
              :autority="user.autority"
            ></user-card>
          </el-option>

          <el-row class="editUser">
            <el-col :span="12" style="width: 100%; text-align: center">
              <el-button type="primary" @click.native="onEditInfo" plain>修改信息</el-button>
            </el-col>
            <el-col :span="12" style="width: 100%; text-align: center"> 
              <el-button type="info" @click.native="onLogout" plain>安全退出</el-button> 
              </el-col>
          </el-row>
        </el-select>
      </el-menu-item>
      <el-menu-item class="messageList"
        ><message-list></message-list
      ></el-menu-item>
    </el-menu>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import MessageList from "./Messages/messageList.vue";
import TopLevalMenu from "./TopLevelMenu";
import UserCard from "./UserCard";
export default {
  data() {
    return {
      id:"",
      activeIndex: "1",
      activeIndex2: "1",
      value: "",
    };
  },
  components: {
    "message-list": MessageList,
    "top-level-menu": TopLevalMenu,
    "user-card": UserCard,
  },
  created(){
    this.value = this.currentUser.client
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    setAcivateType(id) {
      // TODO 把当前client 发给服务器, 再刷一下服务器数据 - users 信息需要放在store里
      this.$store.dispatch('user/switchCurrentUser',id);
     
     // 样式设置
      const index = this.usersdb.findIndex((item) => item.id == id);
      // 把其他type置成info, 把选中的item type 置成success
      this.usersdb.forEach((element) => {
        element.type = "info";
      });
      this.usersdb[index].type = "success";

      // 切换用户-若token未失效:直接切换, 否则会跳出当前用户登录状态
      this.$router.push({
        path: "/",
      });
      //   // 跳转到该用户下的路由界面->模拟效果
      //   if(id == '1'){
      //       this.$router.push('/value-module');
      //   }else if(id == '2'){
      //       this.$router.push('/analysis-module');
      //   }
    },
    onEditInfo() {
      // console.log(this.currentUser)
      this.$router.push({
        path: "/setting-module/user-info",
      });
    },
    onLogout() {
      // todo: 清除用户信息, 跳转回首页或login页面
      this.$store.dispatch('user/logout').then((res)=>{
        // 刷新整个浏览器, 会通过permission.js 中的逻辑返回login页面
        this.$router.go(0)
      })
    },
  },
  computed: {
    ...mapGetters(["usersdb", "currentUser"]),
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
};
</script>

<style lang='scss' scoped>
.editUser {
  display: flex;
  justify-content: center;
}

.el-menu-demo {
  // 这段css控制顶级菜单和sidebar, 不能轻易更改
  width: 100%;
  height: 100px;
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

::v-deep .el-input__inner {
  width: 230px;
  height: 60px;
  // background-color: rgba(51, 211, 131, 0.2);
  // text-align: center;
  // padding-right: 15px;
  //border: none;
}
// ::v-deep .el-select .el-input .el-select__caret {
//   color: transparent;
// }
.el-select-dropdown__item {
  height: auto;
  cursor: auto;
  margin-bottom: 5px;
  border-bottom-style: inset;
}

.messageList {
  float: right;
  margin-top: 5px;
}
.userList {
  float: right;
}
.hideSidebar {
  width: calc(100% - 54px);
  transition: width 0.28s;
  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
}
.openSidebar {
  width: calc(100% - 210px);
  transition: width 0.28s;
}

.text {
  font-size: 16px;
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
  clear: both;
}
</style>