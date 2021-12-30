<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      
      <!-- <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/module1?user=admin">
            <el-dropdown-item>Admin User</el-dropdown-item>
          </router-link>

          <router-link to="/module1?user=normal">
            <el-dropdown-item>Normal User</el-dropdown-item>
          </router-link>

          <a class="router-link-active">
            <li class="el-dropdown-menu__item"  @click="openUserEditInfo">
              个人信息
            </li>
          </a>

          <a class="router-link-active">
            <li class="el-dropdown-menu__item"  @click="openUserEditPassword">
              修改密码
            </li>
          </a>

          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
    <user-info-edit :visible="editVisible" :infoData="usersdb" :remoteClose="onRemoteUserInfoClose"/>
    <change-password :visible="passwordVisible" :remoteClose="onRemotePasswordClose"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import userInfoEdit from './userInfoEdit.vue'
import changePassword from './changePassword.vue'


export default {
  components: {
    Breadcrumb,
    Hamburger,
    userInfoEdit,
    changePassword
  },
  data(){
    return {
      editVisible:false,
      passwordVisible:false,
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'usersdb'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 打开user edit窗口
      openUserEditInfo() {
          this.editVisible = true
      },
      openUserEditPassword() {
          this.passwordVisible = true
      },
    // 子组件会触发此事件方法来关闭窗口
    onRemoteUserInfoClose() {
      this.editVisible = false
    },
    onRemotePasswordClose(){
      this.passwordVisible = false
    }
  },
  mounted: ()=>{}
}
</script>


<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

