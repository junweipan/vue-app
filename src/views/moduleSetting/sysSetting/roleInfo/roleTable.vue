<template>
  <div class="dashboard-container">
<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark">
    <div class="grid-text">查询条件</div> 
    </div></el-col>
</el-row>
    <!-- 条件查询 -->
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
          >修改角色</el-button
        >
        <el-button
          icon="el-icon-circle-plus-outline"
          type="success"
          >启用</el-button
        >
        <el-button
          icon="el-icon-circle-plus-outline"
          type="danger"
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column
      label="序号"
      type="index"
      width="50">
    </el-table-column>

      <el-table-column label="角色名称" width="auto">
        <template slot-scope="scope">{{ scope.row.roleName }}</template>
         </el-table-column>

      <el-table-column label="角色状态" width="auto">
        <template slot-scope="scope">{{ scope.row.roleState | roleStatusFormat}}</template>
      </el-table-column>

      <el-table-column label="角色类型" width="110">
        <template slot-scope="scope">{{ scope.row.roleType | roleTypeFormat }}</template>
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
import roleData from './role.json'

export default {
  name: "roleTable",
  components: {
    // edit: Edit, // Edit: Edit
  },
  data() {
    return { 
      tableData: roleData.rows,
      // multipleSelection: [],
      query: {}, // 查询条件
      page: {
        // 分页对象
        current: 1, // 当前页码
        size: 20, // 每页显示多少条
        total: 50, // 总记录数
      },
      // edit: {
      //   title: "",
      //   visible: false,
      //   formData: {},
      // },
    };
  },
  filters: {},
  computed: {},
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
    // fetchData() {
    //   api
    //     .getPersonInfo(this.query, this.page.current, this.page.size)
    //     .then((response) => {
    //       this.tableData = response.data.rows;
    //     });
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    // 子组件会触发此事件方法来关闭窗口
    remoteClose() {
      this.edit.formData = {};
      this.edit.visible = false;
      this.query = {};
      this.fetchData();
    },
    // 打开新增窗口
    openAdd() {
      //跳转到新增页面, 携带title参数
      this.$router.push({
        path: "/contract-module/tabledata-edit",
        query: {
          title: "新增数据",
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

    handleDelete(id) {
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送删除请求
          // api.deleteById(id).then(response => {
          //     // 处理响应结果提示
          //     this.$message({
          //         type: response.code === 20000 ? 'success': 'error',
          //         message: response.message
          //     })
          this.$message({
            type: "success",
            message: id + "已删除",
          });
          // })
          console.log(id, "已删除");
          // 刷新列表数据
          this.fetchData();
        })
        .catch(() => {
          // 取消删除，不用理会
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 5px;
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
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
