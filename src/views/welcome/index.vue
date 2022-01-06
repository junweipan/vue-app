<template>
  <div class="dashboard-container">
    <H1>Welcome Page</H1>
    <el-card class="box-card">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-card shadow="always">
            <div slot="header" class="clearfix">
              <span>用户统计 <el-tag type="danger">实时</el-tag></span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
            {{ 30 }}
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>今日访问用户 <el-tag type="danger">实时</el-tag></span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
            {{ 12 }}
            <!-- <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div> -->
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>今日后台请求 <el-tag type="danger">实时</el-tag></span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
            {{ 123 }}
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>关键数据监控 <el-tag type="danger">实时</el-tag></span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
            {{ 1234 }}
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <mock-welcome-page></mock-welcome-page>
    </el-card>
  </div>
</template>

<script>
import MockWelcomePage from "./mockWelcomePage";
export default {
  name: "Welcome",
  components: {
    "mock-welcome-page": MockWelcomePage,
  },
  data() {
    return {};
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.el-select-dropdown__item {
  height: 110px;
}
.el-button--text:hover {
  color: #0f41e7;
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
  clear: both;
}

.box-card {
  width: 90%;
  margin: 20px;
}

.el-col {
  display: flex;
  flex-direction: column;
  justify-content: center; /*主轴上居中*/
  align-items: center; /*侧轴上居中*/
}
.dashboard {
  &-container {
    margin: 30px;
    flex-direction: column;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.pagination {
  float: right;
  margin-top: 20px;
}
</style>

