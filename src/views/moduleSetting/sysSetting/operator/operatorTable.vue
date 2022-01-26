<template>
  <div class="dashboard-container">
    <el-form :model="query" inline>
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark">
            <div class="grid-text">查询条件</div>
          </div></el-col
        >
      </el-row>
      <!-- 条件查询 -->
      <el-row class="row-bg" :gutter="20">
        <el-col :span="6">
          <el-form-item label="所属机构:">
            <el-select
              v-model="selectedBranch"
              placeholder="请选择"
              ref="selectReport"
            >
              <el-option
                :value="selectedBranch"
                :label="selectedBranch"
                style="height: auto"
              >
                <el-tree
                  :data="brhTree"
                  :props="treeProps"
                  :render-after-expand="true"
                  :expand-on-click-node="false"
                  @node-click="handleNodeClick"
                ></el-tree>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="操作员编号:">
            <el-input v-model.trim="query.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="操作员姓名:">
            <el-input v-model.trim="query.role"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 查询按钮 -->
      <el-row class="row-bg" :gutter="20">
        <el-col :span="24">
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
            @click="onEdit"
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
          <el-button
            icon="el-icon-circle-plus-outline"
            type="danger"
            @click="onDeleteRole"
            >删除用户</el-button
          >
          <el-button
            icon="el-icon-circle-plus-outline"
            type="warning"
            @click="onPwdReset"
            >密码重置</el-button
          >
          <el-button icon="el-icon-refresh" @click="reload"
            >重置查询条件</el-button
          >
        </el-col>
      </el-row>
      <el-form-item> </el-form-item>
    </el-form>

    <!--显示主要数据table-->
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      height="500px"
      border
      highlight-current-row
      @row-click="onhandleRowClick"
      @row-dblclick="onEditOperator"
      :header-cell-style="rowClass"
      :cell-style="rowClass"
    >
      <el-table-column label="序号" type="index" width="50"> </el-table-column>

      <el-table-column label="操作员编号" sortable="" width="150">
        <template slot-scope="scope">{{ scope.row.oprId }}</template>
      </el-table-column>

      <el-table-column label="姓名" width="150">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>

      <el-table-column label="机构名称" width="auto">
        <template slot-scope="scope">{{ scope.row.brhIdName }}</template>
      </el-table-column>

      <el-table-column label="状态" width="100">
        <template slot-scope="scope">{{
          scope.row.status | operatorStatusFormat
        }}</template>
      </el-table-column>

      <el-table-column label="电话" width="150">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>

      <el-table-column label="登录成功时间" width="180">
        <template slot-scope="scope">{{
          scope.row.succLogDt | datetitimeFormat("yyyy-mm-dd HH:mm:ss")
        }}</template>
      </el-table-column>

      <el-table-column label="成功登录IP" width="150">
        <template slot-scope="scope">{{ scope.row.succLogIp }}</template>
      </el-table-column>

      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">{{
          scope.row.crtTime | datetitimeFormat("yyyy-mm-dd HH:mm:ss")
        }}</template>
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
  </div>
</template>

<script>
import operatorData from "./operator.json";
import branchInfo from "./branchInfo.json";
export default {
  name: "operatorTable",
  components: {},
  data() {
    return {
      tableData: operatorData.rows,
      selectedBranch: "",
      selectedOperator: {},
      brhTree: branchInfo.arrayList,
      treeProps: {
        //配置选项:此处定义el-tree的label和children为指定属性,如果不定义取默认，即label和children
        value: "brhId",
        children: "children",
        label: "text",
      },

      query: {}, // 查询条件
      page: {
        // 分页对象
        current: 1, // 当前页码
        size: 20, // 每页显示多少条
        total: 67, // 总记录数
      },
    };
  },
  methods: {
    handleNodeClick(node) {
      console.log(node);
      this.selectedBranch = node.text;
      if (node.id != 0) {
      }
      this.$refs.selectReport.blur();
    },
    onhandleRowClick(row, column, event) {
      //获取当前operator,
      this.selectedOperator = row;
    },
    onEditOperator() {},
    onActivateRole() {},
    onDeactivateRole() {},
    onDeleteRole() {},
    onPwdReset() {},
    // val 是切换之后的每页显示多少条
    handleSizeChange(val) {
      this.page.size = val;
      this.fetchData();
    },
    // 当页码改变后触发到此方法，val 是当前点击（或输入）的那个页码，
    handleCurrentChange(val) {
      this.page.current = val;
      this.fetchData();
    },
    fetchData() {
      api
        .getPersonInfo(this.query, this.page.current, this.page.size)
        .then((response) => {
          this.tableData = response.data.rows;
        });
    },
    // 条件查询
    queryData() {
      // 将页码变为1，第1页
      this.page.pagesize = 20;
      this.page.current = 1;
      this.fetchData();
    },
    // 重置
    reload() {
      this.query = {};
      this.fetchData();
    },
    // 打开新增窗口
    openAdd() {
      //跳转到新增页面, 携带title参数
      this.$router.push({
        path: "/setting-module/sys-setting/operator-edit-add",
        query: {
          title: "新增数据",
          operator: {},
        },
      });
    },
    onEdit() {
      //跳转到新增页面, 携带title参数
      this.$router.push({
        path: "/setting-module/sys-setting/operator-edit-add",
        query: {
          title: "修改数据",
          operator: this.selectedOperator,
        },
      });
    },
    handleEdit(idNo) {
      // 通过id查询详情
      this.query.idNo = idNo;
      // console.log('query',this.query.idNo)
      api.getPersonInfoById(this.query).then((response) => {
        if (response.status === 200) {
          // 将查询的详情传递
          //console.log(response.data)
          //跳转到新增页面, 携带title参数, formdata
          this.$router.push({
            path: "/contract-module/tabledata-edit",
            query: {
              title: "编辑数据",
              formData: response.data.rows[0],
            },
          });
        }
      });
    },

    handleDelete(id) {},
    rowClass() {
      //表格数据居中显示
      return "text-align:center";
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 0px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
::v-deep .el-input {
  width: 120%;
}
.pagination {
  float: right;
  margin-top: 20px;
}
.grid-text {
  color: rgb(255, 255, 255);
  margin-left: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 20px;
}
.row-bg {
  background-color: #ffffff;
  margin: 0;
}
</style>
