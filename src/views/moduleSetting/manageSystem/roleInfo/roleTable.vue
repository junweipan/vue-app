<template>
  <div class="dashboard-container">
    <div class="grid-content bg-purple-dark">
      <div class="grid-text">查询条件</div>
    </div>
    <!-- 条件查询按钮 -->
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="角色名称:">
        <el-input v-model.trim="query.role"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData"
          >查询</el-button
        >
        <el-button
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="openAdd"
          >新增角色</el-button
        >
        <el-button
          icon="el-icon-circle-plus-outline"
          type="warning"
          @click="openEdit"
          >修改角色</el-button
        >
        <el-button
          icon="el-icon-circle-plus-outline"
          type="success"
          @click="onActivateRole"
          >启用</el-button
        >
        <el-button
          icon="el-icon-circle-plus-outline"
          type="danger"
          @click="onDeactivateRole"
          >注销</el-button
        >
        <el-button icon="el-icon-refresh" @click="reload"> 重置</el-button>
      </el-form-item>
    </el-form>

    <!--显示主要数据table-->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      height="600"
      border
      highlight-current-row
      @row-click="handleSelectionChange"
      @row-dblclick="openEdit"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column label="序号" type="index" width="50"> </el-table-column>

      <el-table-column label="角色名称" width="auto">
        <template slot-scope="scope">{{ scope.row.roleName }}</template>
      </el-table-column>

      <el-table-column label="角色状态" width="120">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag :type="scope.row.roleState == '0' ? 'success' : 'danger'">{{
              scope.row.roleState | roleStatusFormat
            }}</el-tag>
          </div></template
        >
      </el-table-column>
      <el-table-column label="角色类型" width="110">
        <template slot-scope="scope">{{
          scope.row.roleType | roleTypeFormat
        }}</template>
      </el-table-column>

      <el-table-column label="角色概述">
        <template slot-scope="scope">{{ scope.row.roleDesc }}</template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="[10, 20, 50]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>
    <!-- <edit :title="edit.title" :visible="edit.visible" :formData="edit.formData" :remoteClose="remoteClose"/> -->
  </div>
</template>

<script>
// import api from "@/api/personInfoMock";
// import Edit from "./edit";
import roleData from "./role.json";
import checkTree from "./checkTree.json";
export default {
  name: "roleTable",
  components: {
    // edit: Edit, // Edit: Edit
  },
  data() {
    return {
      tableData: roleData.rows,
      selectedRole: null,
      tree3: [],
      // multipleSelection: [],
      query: {}, // 查询条件
      page: {
        // 分页对象
        current: 1, // 当前页码
        size: 20, // 每页显示多少条
        total: 50, // 总记录数
      },
    };
  },
  filters: {},
  computed: {},
  mounted() {
    this.treeNode = checkTree.jsonArray[0].functions;
  },
  created() {
    // this.fetchData()
  },
  watch: {
    // $route(to, from) {
    //   // react to route changes...
    //   this.user = this.$route.query.user;
    // },
    // "query.reg": {
    //   handler: function () {
    //     this.fetchData();
    //   },
    //   immediate: true,
    // },
  },
  methods: {
    openAdd() {
      //跳转到新增页面, 携带title参数
      this.$router.push({
        path: "/setting-module/system/role-info-edit-add",
        query: {
          title: "新增角色",
          role: {},
        },
      });
    },
    openEdit() {
      //检查是否选中某行
      if (!this.selectedRole) {
        this.$alert("请先选择一个角色", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      //跳转到新增页面, 携带title, 选中role,role的tree信息
      this.$router.push({
        path: "/setting-module/system/role-info-edit-add",
        query: {
          title: "修改角色",
          role: this.selectedRole,
          checkedNode: this.treeNode,
        },
      });
    },
    onActivateRole() {
      if (!this.selectedRole) {
        this.$alert("请先选择一个角色", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      if (this.selectedRole.roleState == "0") {
        this.$alert("该机构已启用. 不能重复启用", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      this.selectedRole.roleState = "0";
      this.$message({
        message: "成功启用该机构",
        type: "success",
      });
    },
    onDeactivateRole() {
      if (!this.selectedRole) {
        this.$alert("请先选择一个角色", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      if (this.selectedRole.roleState == "1") {
        this.$alert("该机构已注销. 不能重复注销", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      this.selectedRole.roleState = "1";
      this.$message({
        message: "成功停用该机构",
        type: "success",
      });
    },
    handleSelectionChange(val) {
      this.selectedRole = val;
    },
    reload() {},
    queryData() {},
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 0px;
  display: flex;
  flex-direction: column;
}
.pagination {
  margin-top: 20px;
  align-self: flex-end
}
.grid-text {
  color: rgb(255, 255, 255);
  margin-left: 20px;
}

.bg-purple-dark {
  background: #99a9bf;
}
.grid-content {
  border-radius: 4px;
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 10px;
}
</style>
