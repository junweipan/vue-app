<template>
  <div>
    <el-button round @click="backHome">返回</el-button>
    <div class="container">
      <h2>{{ title }}</h2>
      <el-form
        ref="formData"
        :model="formData"
        label-position="right"
        style="width: 100%"
        status-icon
      >
        <el-form-item>
          <!-- 所属机构行 -->
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="所属机构:"
                ><br />

                <!-- <el-select style="width: 100%">
                  <el-option
                    v-for="item in brhs"
                    :key="item.code"
                    :label="item.brhType"
                    :value="item.code"
                  >
                  </el-option>
                </el-select> -->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="40">
            <!-- 前4列输入项 -->
            <el-col :span="5">
              <el-row :gutter="40">
                <el-col>
                  <el-row>
                    <el-form-item label="操作员编号:">
                      <el-input v-model="formData.operator.oprId"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="性别:">
                      <el-input v-model="formData.operator.gender"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="邮箱:">
                      <el-input v-model="formData.operator.email"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row v-if="title == '新增数据'">
                    <el-form-item label="初始密码:">
                      <el-input v-model="formData.operator.pwd"></el-input>
                    </el-form-item>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
            <!-- 后4列输入项 -->
            <el-col :span="5">
              <el-row :gutter="40">
                <el-col>
                  <el-row>
                    <el-form-item label="姓名:">
                      <el-input v-model="formData.operator.name"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="手机:">
                      <el-input v-model="formData.operator.mobile"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="密码更新周期:">
                      <el-input v-model="formData.operator.pwdCycle"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row v-if="title == '新增数据'">
                    <el-form-item label="密码确认:">
                      <el-input v-model="formData.operator.pwd"></el-input>
                    </el-form-item>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="2"><p></p></el-col>
            <!-- 穿梭框 -->
            <el-col :span="12">
              <el-transfer
                @change="onTransferChange"
                :titles="['可选角色选项:', '当前已选角色:']"
                filterable
                :filter-method="filterMethod"
                filter-placeholder="请输入角色名"
                v-model="value"
                :data="transferData"
              >
              </el-transfer>
            </el-col>
          </el-row>

          <el-button type="primary" @click="submitForm('formData')" size="mini"
            >确定</el-button
          >
          <el-button size="mini" @click="onReset">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      title: "",
      transferData: [],
      value: [1,3],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      formData: {
        operator: {
          brhId: "",
          brhIdName: "",
          oprId: "",
          gender: "",
          email: "",
          pwd: "",
          name: "",
          mobile: "",
          email: "",
          pwdCycle: "",
        },
      },
      brhs: [
        {
          code: "qq",
          label: "ww",
          value: "ee",
        },
      ],
    };
  },
  computed: {},
  mounted() {
    this.title = this.$route.query.title;
    this.formData.operator = this.$route.query.operator;
    this.transferData = this.$route.query.role;
  },
  methods: {
    // 重置
    onReset() {
      // 将表单清空
      this.$refs["formData"].resetFields();
    },
    backHome() {
      //关闭当前标签并跳转回父组件
      const view = this.$route;
      this.$store.dispatch("tagsView/delView", view).then(() => {
        this.$router.back();
      });
    },
    onTransferChange() {
      console.log(this.value);
    },
    // 提交表单数据
    submitForm(formName) {
      // console.log("提交对象", this.formData);
      // console.log("$route", this.$route);
      // this.onReset();
      // //关闭当前标签并跳转回父组件
      // const view = this.$route;
      // this.$store
      //   .dispatch("tagsView/delView", view)
      //   .then(() => {
      //     this.$router.back();
      //   });
      // this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //         // 校验通过，提交表单数据
      //         this.submitData()
      //     } else {
      //         // console.log('error submit!!');
      //         return false;
      //     }
      // })
    },

    async submitData() {
      // let response = null;
      // if (this.formData.id) {
      //   // 编辑
      //   // response = await api.update(this.formData);
      // } else {
      //   // 新增
      //   // response = await api.add(this.formData);
      // }
      // if (response.code === 20000) {
      //   this.$message({
      //     message: "保存成功",
      //     type: "success",
      //   });
      //   // Todo: 回到表格页
      // } else {
      //   this.$message({
      //     message: "保存失败",
      //     type: "error",
      //   });
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 50px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
::v-deep .el-transfer-panel__body {
  height: 300px;
}
::v-deep .el-transfer-panel__list.is-filterable {
  height: 250px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple-light {
  background: #e5e9f2;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
</style>