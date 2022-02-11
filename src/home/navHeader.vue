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
        <el-select v-model="value" @change="switchRole">
          <template v-slot:prefix>
            <i class="el-icon-user"></i>
          </template>

          <el-option
            v-for="role in roles"
            :key="role.roleId"
            :label="role.roleName + ': ' + oprName"
            :value="role.roleName"
          >
            <user-card
              :id="role.roleId"
              :branch="brhName"
              :roleType="role.roleType"
              :roleName="role.roleName"
            ></user-card>
          </el-option>

          <el-row class="editUser">
            <el-col :span="12" style="width: 100%; text-align: center">
              <el-button type="primary" @click.native="onEditInfo" plain
                >修改信息</el-button
              >
            </el-col>
            <el-col :span="12" style="width: 100%; text-align: center">
              <el-button type="warning" @click.native="onLogout" plain
                >安全退出</el-button
              >
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
      id: "",
      activeIndex: "1",
      activeIndex2: "1",
      value: "",
    };
  },
  computed: {
    ...mapGetters(["roles", "currentRoleName", "brhName", "oprName"]),
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
  components: {
    "message-list": MessageList,
    "top-level-menu": TopLevalMenu,
    "user-card": UserCard,
  },
  mounted() {
    this.value = this.currentRoleName;
    console.log(this.roles);
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    switchRole() {
      const roleName = this.value
      this.$store.dispatch("user/changeRole", roleName)
      this.$router.go(0);
      //TODO
      //1, 改变store中的role
      //2, 把新的role存入cookie
      //3, 刷新页面, 重新显示sidebar menu 和 button
    },
    onEditInfo() {
      this.$router.push({
        path: "/setting-module/user-info",
      });
    },
    onLogout() {
      // todo: 清除用户信息, 跳转回首页或login页面
      this.$store.dispatch("user/logout").then((res) => {
        // 刷新整个浏览器, 会通过permission.js 中的逻辑返回到login页面
        this.$router.go(0);
      });
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
  border: none;
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