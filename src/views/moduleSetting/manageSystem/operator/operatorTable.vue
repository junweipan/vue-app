<template>
  <div class="dashboard-container">
    <div class="grid-content bg-purple-dark">
      <div class="grid-text">查询条件</div>
    </div>

    <el-form :model="query" inline size="mini">
      <!-- 条件查询 -->
      <div>
        <el-form-item label="所属操作员:">
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
        <el-form-item label="操作员编号:">
          <el-input v-model.trim="query.role"></el-input>
        </el-form-item>
        <el-form-item label="操作员姓名:">
          <el-input v-model.trim="query.role"></el-input>
        </el-form-item>
      </div>

      <!-- 查询按钮 -->
      <div style="margin-bottom:-20px">
        <el-button
          size="mini"
          icon="el-icon-search"
          type="primary"
          @click="queryData"
          >查询</el-button
        >
        <el-button
          size="mini"
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="onAddOperator"
          >新增操作员</el-button
        >
        <el-button
          size="mini"
          icon="el-icon-circle-plus-outline"
          type="warning"
          @click="onEditOperator"
          >修改操作员</el-button
        >
        <el-button
          size="mini"
          icon="el-icon-circle-plus-outline"
          type="success"
          @click="onActivateOperator"
          >启用</el-button
        >
        <el-button
          size="mini"
          icon="el-icon-circle-plus-outline"
          type="danger"
          @click="onDeactivateOperator"
          >注销</el-button
        >
        <el-button
          size="mini"
          icon="el-icon-circle-plus-outline"
          type="danger"
          @click="onDeleteOperator"
          >删除用户</el-button
        >
        <el-button
          size="mini"
          icon="el-icon-circle-plus-outline"
          type="warning"
          @click="onPwdReset"
          >密码重置</el-button
        >
        <el-tooltip
          class="item"
          effect="dark"
          content="重置查询条件"
          placement="bottom-start"
        >
          <el-button
            size="mini"
            icon="el-icon-refresh"
            @click="reload"
          ></el-button>
        </el-tooltip>
      </div>
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
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column label="序号" type="index" width="50"> </el-table-column>

      <el-table-column label="操作员编号" sortable="" width="150">
        <template slot-scope="scope">{{ scope.row.oprId }}</template>
      </el-table-column>

      <el-table-column label="姓名" width="150">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>

      <el-table-column label="操作员名称" width="auto">
        <template slot-scope="scope">{{ scope.row.brhIdName }}</template>
      </el-table-column>

      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="tagChange(scope.row.status)">{{
            scope.row.status | operatorStatusFormat
          }}</el-tag></template
        >
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
    <!-- 确认对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确认删除该操作员?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onDeleteConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import operatorData from "./operator.json";
import branchInfo from "./branchInfo.json";
import roleList from "./roleList.json";
export default {
  name: "operatorTable",
  components: {},
  data() {
    return {
      tableData: operatorData.rows,
      selectedBranch: "",
      selectedOperator: null,
      brhTree: branchInfo.arrayList,
      treeProps: {
        //配置选项:此处定义el-tree的label和children为指定属性,如果不定义取默认，即label和children
        value: "brhId",
        children: "children",
        label: "text",
      },
      dialogVisible: false,
      transferData: [],
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
    generateData(){
      const data = [];
      roleList.allRole.forEach((item, index) => {
        data.push({
          label: item.desc,
          key: index,
          code: item.value,
        });
      });
      return data;
    },
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
    // 打开新增Operator窗口
    onAddOperator() {
      this.transferData = []
      this.$router.push({
        path: "/setting-module/system/operator-edit-add",
        query: {
          title: "新增数据",
          operator: {},
          role: this.transferData
        },
      });
    },
    // 打开修改Operator窗口
    onEditOperator() {
      if (!this.selectedOperator) {
        this.$alert("请先选择一个操作员", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      // call API 获得该operator的role
      this.transferData = this.generateData()
      this.$router.push({
        path: "/setting-module/system/operator-edit-add",
        query: {
          title: "修改数据",
          operator: this.selectedOperator,
          role: this.transferData
        },
      });
    },
    onActivateOperator() {
      if (!this.selectedOperator) {
        this.$alert("请先选择一个操作员", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      if (this.selectedOperator.status == "0") {
        this.$alert("该操作员已启用. 不能重复启用", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      this.selectedOperator.status = "0";
      this.$message({
        message: "成功启用该操作员",
        type: "success",
      });
    },
    onDeactivateOperator() {
      if (!this.selectedOperator) {
        this.$alert("请先选择一个操作员", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      if (this.selectedOperator.status == "1") {
        this.$alert("该操作员已停用. 不能重复停用", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      this.selectedOperator.status = "1";
      this.$message({
        message: "成功停用该操作员",
        type: "success",
      });
    },
    onDeleteOperator() {
      if (!this.selectedOperator) {
        this.$alert("请先选择一个操作员", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      //弹出删除确认框
      this.dialogVisible = true;
    },
    onDeleteConfirm() {
      this.dialogVisible = false;
      // Call API
      this.$message({
        message: "成功删除该操作员",
        type: "success",
      });
    },
    //重置密码为登录名
    onPwdReset() {},
    tagChange(status) {
      switch (status) {
        case "0":
          return "success";
        case "1":
          return "danger";
        case "2":
          return "info";
        default:
          return "info";
      }
    },
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
      // api
      //   .getPersonInfo(this.query, this.page.current, this.page.size)
      //   .then((response) => {
      //     this.tableData = response.data.rows;
      //   });
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
    handleDelete(id) {},
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 0px;
  display: flex;
  flex-direction: column;
}
// ::v-deep .el-input {
//   width: 100%;
// }
.pagination {
  align-self: flex-end;
  margin-top: 20px;
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
