<template>
  <div class="dashboard-container">
    <div class="grid-content bg-purple-dark">
      <div class="grid-text">查询条件</div>
    </div>
    <!-- 条件查询 -->
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="机构名称:">
        <el-input v-model.trim="query.role"></el-input>
      </el-form-item>
      <el-form-item label="机构类型:">
        <el-select v-model="query.brhType" filterable style="width: 150px">
          <el-option
            v-for="item in brhTypes"
            :key="item.code"
            :label="item.brhType"
            :value="item.brhType"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData"
          >查询</el-button
        >
        <el-button
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="onAddBranch"
          >新增下级机构</el-button
        >
        <el-button
          icon="el-icon-circle-plus-outline"
          type="warning"
          @click="onEditBranch"
          >修改机构</el-button
        >
        <el-button
          icon="el-icon-circle-plus-outline"
          type="success"
          @click="onActivateBranch"
          >启用</el-button
        >
        <el-button
          icon="el-icon-circle-plus-outline"
          type="danger"
          @click="onDeactivateBranch"
          >停用</el-button
        >
        <el-button icon="el-icon-refresh" @click="reload">重置</el-button>
      </el-form-item>
    </el-form>

    <!--显示主要数据table 选中行显示高亮highlight-current-row的样式为全局styles/common.scss中配置-->
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="extData.brhId"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      highlight-current-row
      @row-click="onhandleRowClick"
      @row-dblclick="onEditBranch"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
    >
      <el-table-column label="序号" type="index" width="50" fixed>
      </el-table-column>

      <el-table-column
        prop="extData.brhId"
        label="机构编号"
        sortable
        width="150"
      >
      </el-table-column>

      <el-table-column prop="extData.brhName" label="机构名称" width="auto">
      </el-table-column>

      <el-table-column prop="extData.brhNickname" label="机构简称" width="120">
      </el-table-column>

      <el-table-column prop="extData.upBrhId" label="上级机构名称 " width="auto"
        ><template slot-scope="scope">{{
          scope.row.extData.upBrhId | upBranchIdFormat
        }}</template>
      </el-table-column>

      <el-table-column label="机构类型" width="120">
        <template slot-scope="scope">{{
          scope.row.extData.brhType | branchTypeFormat
        }}</template>
      </el-table-column>

      <el-table-column label="状态" width="80px">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              :type="scope.row.extData.brhSta == '1' ? 'success' : 'danger'"
              >{{ scope.row.extData.brhSta | branchStatusFormat }}</el-tag
            >
          </div></template
        >
      </el-table-column>
      <el-table-column prop="extData.contName" label="联系人" width="120px">
      </el-table-column>
      <el-table-column prop="extData.contPhone" label="联系人电话" width="150">
      </el-table-column>

      <el-table-column prop="extData.brhName" label="地址"> </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handlePageCurrentChange"
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
// import api from "@/api/personInfoMock";
// import Edit from "./edit";
import branchData from "./branchInfo.json";
const brhTypes = [
  { code: "00", brhType: "集团本级" },
  { code: "01", brhType: "一级子公司" },
  { code: "02", brhType: "二级子公司" },
  { code: "03", brhType: "三级子公司" },
];
export default {
  name: "roleTable",
  components: {
    // edit: Edit, // Edit: Edit
  },
  data() {
    return {
      tableData: branchData.arrayList,
      // multipleSelection: [],
      brhTypes,
      getSelectedBranch: null,
      getSubBranch: null,
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
  mounted() {
    // this.fetchData()
    // console.log(this.tableData);
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
    onAddBranch() {
      if (!this.getSelectedBranch) {
        this.$alert("请选择一个上级机构", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});

        return;
      }
      // 跳转到新增页面, 携带title参数
      this.$router.push({
        path: "/setting-module/sys-setting/branch-info-edit-add",
        query: {
          title: "新增机构",
          branch: this.getSubBranch,
        },
      });
    },
    onEditBranch() {
      if (!this.getSelectedBranch) {
        this.$alert("请先选择一个机构", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      // 跳转到新增页面, 携带title参数
      this.$router.push({
        path: "/setting-module/sys-setting/branch-info-edit-add",
        query: {
          title: "修改机构",
          branch: this.getSelectedBranch,
        },
      });
    },
    onActivateBranch() {
      if (!this.getSelectedBranch) {
        this.$alert("请先选择一个机构", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      if (this.getSelectedBranch.brhSta == "1") {
        this.$alert("该机构已启用. 不能重复启用", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      this.getSelectedBranch.brhSta = "1";
      this.$message({
        message: "成功启用该机构",
        type: "success",
      });
    },
    onDeactivateBranch() {
      if (!this.getSelectedBranch) {
        this.$alert("请先选择一个机构", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      if (this.getSelectedBranch.brhSta == "0") {
        this.$alert("该机构已停用. 不能重复停用", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      this.getSelectedBranch.brhSta = "0";
      this.$message({
        message: "成功停用该机构",
        type: "success",
      });
    },
    // val 是切换之后的每页显示多少条
    handleSizeChange(val) {
      this.page.size = val;
      this.fetchData();
    },
    // 选中table行后触发
    onhandleRowClick(row, column, event) {
      //获取当前branch,
      this.getSelectedBranch = row.extData;
      //增加一项brhTypeName
      this.getSelectedBranch.brhTypeName = this.getBranchTypeName(
        this.getSelectedBranch.brhType
      );
      //获取下级branch
      this.getSubBranch = this.getSubBranchType(this.getSelectedBranch.brhType);
    },
    handlePageCurrentChange() {},
    fetchData() {
      // api
      //   .getPersonInfo(this.query, this.page.current, this.page.size)
      //   .then((response) => {
      //     this.tableData = response.data.rows;
      //   });
    },
    //根据当前公司类型code,获取公司类型Name
    getBranchTypeName(key) {
      for (let index = 0; index < this.brhTypes.length; index++) {
        if (index == this.brhTypes.length - 1) {
          return null;
        } else if (this.brhTypes[index].code == key) {
          return this.brhTypes[index].brhType;
        }
      }
    },
    //根据当前公司类型,获取下级子公司类型
    getSubBranchType(key) {
      for (let index = 0; index < this.brhTypes.length; index++) {
        if (index == this.brhTypes.length - 1) {
          return null;
        } else if (this.brhTypes[index].code == key) {
          return this.brhTypes[index + 1];
        }
      }
    },
    // 条件查询
    queryData() {
      // 将页码变为1，第1页
      // this.page.pagesize = 20;
      // this.page.current = 1;
      // this.fetchData();
    },
    // 重置
    reload() {
      // this.query = {};
      // this.fetchData();
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
.dashboard-container {
  margin: 0px;
  display: flex;
  flex-direction: column;
}
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
