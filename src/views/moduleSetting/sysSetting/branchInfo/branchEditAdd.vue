<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <el-form
      ref="formData"
      :model="formData"
      label-position="right"
      style="width: 100%"
      status-icon
    >
      <el-row :gutter="40">
        <el-col :span="6">
          <el-form-item label="机构类型:"
            ><br />
            
            <el-select
              style="width: 100%"
              v-model="formData.branch.brhTypeName"
              disabled
            >
              <!-- <el-option
                v-for="item in brhTypes"
                :key="item.code"
                :label="item.brhType"
                :value="item.code"
              >
              </el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="机构名称:">
            <el-input
              :disabled="title === '编辑'"
              v-model="formData.branch.brhName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="机构简称:">
            <el-input v-model="formData.branch.brhNickname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="6">
          <el-form-item label="联系人:">
            <el-input v-model="formData.branch.contName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系人电话:">
            <el-input v-model="formData.branch.contPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="40">
        <el-col :span="12"> </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="描述:">
            <el-input v-model="formData.branch.brhDesc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="地址:">
            <el-input v-model="formData.branch.addr"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')" size="mini"
          >确定</el-button
        >
        <el-button size="mini" @click="onReset">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      title: "",
      formData: {
        branch: {
          brhType: "",
          brhTypeName:"",
          brhname: "",
          brhNickname: "",
          contName: "",
          contPhone: "",
          addr: "",
          brhDesc: "",
        },
      },
      // brhTypes: [
      //   { code: "00", brhType: "集团本级" },
      //   { code: "01", brhType: "一级子公司" },
      //   { code: "02", brhType: "二级子公司" },
      //   { code: "03", brhType: "三级子公司" },
      // ],
    };
  },
  computed: {
  },
  mounted() {
    this.title = this.$route.query.title;
    this.formData.branch = this.$route.query.branch;
    console.log(this.formData.branch)
  },
  methods: {
    // 重置
    onReset() {
      // 将表单清空
      this.$refs["formData"].resetFields();
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
</style>