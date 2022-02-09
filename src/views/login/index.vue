<template>
  <div class="login-container">
    <vue-particles color="#dedede" class="particles-js"></vue-particles>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">舟山智慧城市管理系统</h3>
        <!-- <h2 class="title">登录页面</h2> -->
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item prop="validateCode" style="line-height: 0px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-input
              v-model="loginForm.validateCode"
              ref="validateCode"
              placeholder="验证码"
              style="width: 100%"
            ></el-input>
          </el-col>
          <el-col :span="12">
            <img
              :src="identifyimg"
              alt="验证码图片"
              @click="refreshCode"
              class="captcha_img"
            />
          </el-col>
        </el-row>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 50%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >

      <div class="tips">
        <span> username: admin</span>
        <span> password: 123456</span>
      </div>

      <div class="title-container">
        <p class="copyright">© 2021 舟山市智慧城市运营有限公司 版权所有</p>
      </div>
    </el-form>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import { getCaptcha } from "@/api/user";
export default {
  name: "Login",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "123456",
        validateCode: "1111",
      },
      identifyCode: "",
      identifyimg: Object,
      loginRules: {
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    refreshCode() {
      getCaptcha().then((response) => {
        console.log(response);
        this.identifyimg = response.data;
      });
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      console.log("form",this.loginForm)
      this.$refs.loginForm.validate((valid) => {
        this.loading = true;
        this.$store
          .dispatch("user/login", this.loginForm)
          .then(() => {
            this.$router.push({ path: this.redirect || "/" });
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      });
    },
  },
};
</script>


<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .el-form-item {
    background: rgba(0, 0, 0, 0.2);
  }
  ::v-deep .el-input__inner {
    background-color: rgba(255, 255, 255, 0) !important;
    border: 0px solid #dcdfe6 !important;
    color: #d7ddeb;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
}
.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url(/login-bg2.jpg);
  background-size: cover;
  overflow: hidden;
  text-align: center;
  .login-form {
    position: relative;
    width: 700px;
    padding: 50px 100px 50px 100px;
    top: 300px;
    left: 600px;
    background-color: rgba(34, 72, 129, 0.8);
    border-radius: 2%;
  }

  .tips {
    font-size: 14px;
    //color: #fff;
    margin-bottom: 50px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 5px 5px 5px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 20px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .copyright {
    font-size: 15px;
    color: $light_gray;
    margin: 0px auto 0px auto;
    text-align: center;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.captcha_img {
  cursor: pointer;
  margin-top: 15px;
  width: 40%;
  margin-left: 75px;
}
</style>
