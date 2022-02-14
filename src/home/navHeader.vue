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
        <el-select v-model="roleId" @change="switchRole" no-data-text=" ">
          <template v-slot:prefix>
            <i class="el-icon-user"></i>
          </template>

          <el-option
            v-for="role in operator.roleInfoList"
            :key="role.roleId"
            :label="'角色: ' + role.roleName"
            :value="role.roleId"
          >
            <user-card
              :id="role.roleId"
              :branch="operator.brhName"
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
      roleId: "",
    };
  },
  computed: {
    ...mapGetters(["operator", "currentRoleID"]),
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
    this.roleId = this.operator.roleId;
    //1, 刷新store中的roleID
    //2, 刷新cookie中的roleID
    this.$store.dispatch("user/changeRole", this.roleId);
  },
  methods: {
    handleSelect(key, keyPath) {},
    switchRole() {
      //1, 刷新store中的roleID
      //2, 刷新cookie中的roleID
      this.$store.dispatch("user/changeRole", this.roleId);
    },
    onEditInfo() {
      this.$router.push({
        path: "/setting-module/user-info",
      });
    },
    onLogout() {
      // 清除用户信息, 跳转回首页或login页面
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