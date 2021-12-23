<template>
  <div class="dashboard-container">
    <h1>功能管理</h1>
        <!-- 条件查询 -->
        <el-form :inline="true" :model="query" size="mini">

            <el-form-item label="模块:">
                <el-select v-model.trim="query.module" filterable style="width: 85px">
                    <el-option 
                        v-for="item in moduleOptions" :key="item.code" 
                        :label="item.name" :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="一级分组">
                <el-input v-model.trim="query.level1" ></el-input>
            </el-form-item>

            <el-form-item label="二级分组">
                <el-input v-model.trim="query.level1" ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
                <el-button icon="el-icon-refresh"  @click="reload">重置</el-button>
                <el-button icon="el-icon-circle-plus-outline" type="primary" @click="openAdd" >新增</el-button>
                <el-button icon="el-icon-circle-plus-outline" type="warning" disabled>更新</el-button>
            </el-form-item>
        </el-form>
        
        
        <!--显示主要数据table-->
        <el-table
        ref="singleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="600"
        border
        highlight-current-row
        @current-change="handleCurrentChange"
        @cell-dblclick="handleEdit"
        >
   

       <el-table-column
        label="序号"
        type="index"
        width="100">
      </el-table-column>

        <el-table-column
          label="编号"
          width="auto">
          <template slot-scope="scope">{{ scope.row.funId }}</template>
        </el-table-column>


        <el-table-column
          label="父级功能"
          width="auto">
          <template slot-scope="scope">{{ scope.row.bak}}</template>
        </el-table-column>

        <el-table-column
          label="功能类型"
          width="auto"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.funType | funTypeFormat}}</template>
        </el-table-column>

        <el-table-column
          label="功能名称"
          width="auto">
          <template slot-scope="scope">{{ scope.row.funName }}</template>
        </el-table-column>

        <el-table-column
          label="url地址"
          width="auto">
          <template slot-scope="scope">{{ scope.row.url }}</template>
        </el-table-column>

        <el-table-column
          label="功能图标"
          width="auto">
          <template slot-scope="scope">{{ scope.row.iconName }}</template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="auto">
                <template slot-scope="scope">
                    <el-button type="success" @click="handleEdit(scope.row.funId)" size="mini">编辑</el-button>
                    <el-button type="danger"  @click="handleDelete(scope.row.funId)"  size="mini">删除</el-button>
                </template>
        </el-table-column>

      </el-table>

       <!-- 分页组件 -->
       <!-- <div class="pagination">
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="[10, 20, 50]"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
        </el-pagination>
       </div> -->

    <edit :title="edit.title" :visible="edit.visible" :formData="edit.formData" :remoteClose="remoteClose"/>
  </div>
</template>

<script>
import api from '@/api/defaultModule'
import Edit from './edit'
const moduleOptions = [
    {code: 0, name: '默认模块'},
    {code: 1, name: '新增模块'}
]
export default {
  name: 'FunManager',
  components: { 
        Edit // Edit: Edit
    },
  data() {
    return {
      // user: 'admin',
      tableData: [],
      query: {}, // 查询条件
      moduleOptions,// 户籍下拉列表
      edit: {
        title: '',
        visible: false,
        formData: {}
      }

    }
  },
  filters:{
    
  },
  computed:{
  },
  created() {
    this.fetchData()
  },
  //watch: {
    //$route(to, from) {
      // react to route changes...
    //   this.user = this.$route.query.user
    // },
    // "query.reg": {
    //   handler:function(){this.fetchData()},
    //   immediate: true
    // }
  //},
  methods: {
        handleCurrentChange(val) {
          this.currentRow = val;
          console.log(this.currentRow)
        },
        fetchData() {
          api.getfun(this.query).then(response => {
          this.tableData = response.data
          })
        },
       // 条件查询
        queryData() {
            // 将页码变为1，第1页
            // this.fetchData()
        },
        // 重置
        reload() {
            this.query = {}
            this.fetchData()
        },
        // 子组件会触发此事件方法来关闭窗口
        remoteClose() {
            this.edit.formData = {}
            this.edit.visible = false
            this.query = {}
            this.fetchData()
        },
        // 打开新增窗口
        openAdd() {
            this.edit.visible = true
            this.edit.title = '新增'
        },
         handleEdit(funId) {
           console.log('dbclick', funId)
           this.edit.formData = this.tableData.find((item)=>{
             return item.funId === funId
           })
           console.log("formData item:", this.edit.formData)
          this.edit.title = '编辑'
          this.edit.visible = true
          //  api.getPersonInfoById(this.query).then(response => {
          //      if(response.status === 200 ){
          //          // 将查询的详情传递
          //          //console.log(response.data)
          //          this.edit.formData = response.data.rows[0]
          //          this.edit.title = '编辑'
          //          this.edit.visible = true
          //      }
          // })
        },

        handleDelete(id) {
           this.$confirm('确认删除这条记录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 发送删除请求
                // api.deleteById(id).then(response => {
                //     // 处理响应结果提示
                //     this.$message({
                //         type: response.code === 20000 ? 'success': 'error',
                //         message: response.message
                //     })
                    this.$message({
                        type:  'success',
                        message: id + "已删除"
                    })
                // })
                console.log(id,'已删除')
                // 刷新列表数据
                this.fetchData()
            }).catch(() => {
                // 取消删除，不用理会        
            });
        },

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.pagination{
  float:right;
  margin-top: 20px;
}
</style>
