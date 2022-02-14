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
        <el-row :gutter="40">
          <el-col :span="6" style="height: 500px">
            <!-- 角色名称 -->
            <el-row :gutter="40">
              <el-form-item label="角色名称:">
                <el-input v-model="formData.role.roleName"></el-input>
              </el-form-item>
            </el-row>
            <!-- 角色类型 -->
            <el-row :gutter="40">
              <el-form-item label="角色类型:"
                ><br />
                <el-select style="width: 100%" v-model="formData.role.roleType">
                  <el-option
                    v-for="item in roleTypes"
                    :key="item.roleType"
                    :label="item.roleTypeName"
                    :value="item.roleType"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <!-- 角色描述 -->
            <el-row :gutter="40">
              <el-form-item label="角色描述:">
                <el-input v-model="formData.role.roleDesc"></el-input>
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="4" style="height: 500px">
            <!-- 占位 -->
          </el-col>
          <el-col :span="12">
            <el-form-item label="选择权限项:">
              <el-scrollbar id="scrollbar" style="height: 500px">
                <func-tree
                  ref="functree"
                  :treeNode="treeCheckedNode"
                ></func-tree>
              </el-scrollbar>
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
  </div>
</template>
<script>
import FuncTree from "./funcTree.vue";
const roleTypes = [
  { roleType: "01", roleTypeName: "汇总" },
  { roleType: "02", roleTypeName: "本级" },
];
export default {
  props: {},
  components: {
    "func-tree": FuncTree,
  },
  data() {
    return {
      title: "",
      roleTypes,
      treeCheckedNode: [],
      formData: {
        role: {
          roleName: "",
          roleState: "",
          roleType: "",
          roleDesc: "",
        },
      },
    };
  },
  mounted() {
    this.title = this.$route.query.title;
    this.formData.role = this.$route.query.role;
  },
  // 调用beforeMount hook, treeCheckedNode 数据要在template mounted 之前就准备好
  beforeMount() {
    this.treeCheckedNode = this.$route.query.checkedNode;
  },
  methods: {
    // 重置
    onReset() {
      // 将表单清空
      this.$refs["formData"].resetFields();
    },
    setCheckedNodes() {
      this.$refs.functree.setCheckedNodes();
    },
    resetChecked() {
      this.$refs.functree.resetChecked();
    },
    backHome() {
      //关闭当前标签并跳转回父组件
      const view = this.$route;
      this.$store.dispatch("tagsView/delView", view).then(() => {
        this.$router.back();
      });
    },
    // 提交表单数据
    submitForm(formName) {},

    async submitData() {},
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
#scrollbar ::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>