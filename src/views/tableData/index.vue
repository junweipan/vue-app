<template>
  <div class="dashboard-container">
    <h1>数据测试首页</h1>
    <!-- <div>
      <button type="button" @click="fetchData()">click</button>
    </div> -->
  
        <!-- 条件查询 -->
        <el-form :inline="true" :model="query" size="mini">
            <el-form-item label="员工姓名：">
                <el-input v-model.trim="query.name" ></el-input>
            </el-form-item>
            <el-form-item label="户籍:">
                <el-select v-model="query.reg" filterable style="width: 85px">
                    <el-option 
                        v-for="item in regOptions" :key="item.code" 
                        :label="item.name" :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
                <el-button icon="el-icon-refresh"  @click="reload">重置</el-button>
                <el-button icon="el-icon-circle-plus-outline" type="primary" @click="openAdd" >新增</el-button>
                <el-button icon="el-icon-circle-plus-outline" type="warning" disabled>更新</el-button>
                <el-button icon="el-icon-circle-plus-outline" type="danger" @click="multiDelete" >批量删除</el-button>
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
        @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
        fixed>
      </el-table-column>

        <el-table-column align="center" label="操作" width="150" fixed>
                <template slot-scope="scope">
                    <el-button type="success" @click="handleEdit(scope.row.idNo)" size="mini">编辑</el-button>
                    <el-button type="danger"  @click="handleDelete(scope.row.idNo)"  size="mini">删除</el-button>
                </template>
        </el-table-column>

        <el-table-column
          label="身份证号码"
          width="170"
          fixed>
          <template slot-scope="scope">{{ scope.row.idNo }}</template>
        </el-table-column>

        <el-table-column
          prop="name"
          label="姓名"
          width="auto">
        </el-table-column>

        <el-table-column
          label="性别"
          width="50">
          <template slot-scope="scope">{{ scope.row.sex | sexFormat}}</template>
        </el-table-column>

        <el-table-column
          label="工作岗位"
          width="auto"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.post }}</template>
        </el-table-column>

        <el-table-column
          label="联系电话"
          width="110">
          <template slot-scope="scope">{{ scope.row.telno }}</template>
        </el-table-column>

        <el-table-column
          label="开户行"
          width="120">
          <template slot-scope="scope">{{ scope.row.bankName | bankFormat}}</template>
        </el-table-column>

        <el-table-column
          label="银行卡号"
          width="170">
          <template slot-scope="scope">{{ scope.row.bankCardNumber }}</template>
        </el-table-column>

        <el-table-column
          label="学历"
          width="100">
          <template slot-scope="scope">{{ scope.row.edu | eduFormat }}</template>
        </el-table-column>

        <el-table-column
          label="毕业学校"
          width="auto"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.graduatedSchool }}</template>
        </el-table-column>

        <el-table-column
          label="户籍"
          width="auto">
          <template slot-scope="scope">{{ scope.row.reg | regFormat}}</template>
        </el-table-column>

        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          label="备注"
          width="auto"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.remark }}</template>
        </el-table-column>

        <el-table-column
          label="创建日期"
          width="auto"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.createDate }}</template>
        </el-table-column>

        <el-table-column
          label="创建者"
          width="auto"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.createOpr }}</template>
        </el-table-column>

        <el-table-column
          label="更新日期"
          width="auto"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.updateDate }}</template>
        </el-table-column>

        <el-table-column
          label="更新者"
          width="auto"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.updateOpr }}</template>
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
            :total="page.total">
        </el-pagination>
       </div> -->
    <edit :title="edit.title" :visible="edit.visible" :formData="edit.formData" :remoteClose="remoteClose"/>
  </div>
</template>

<script>
import api from '@/api/personInfoMock'
import Edit from './edit'
const regOptions = [
    {code: 0, name: '农'},
    {code: 1, name: '非农'}
]
export default {
  name: 'tableData',
  components: { 
        Edit // Edit: Edit
    },
  data() {
    return {
      user: 'admin',
      tableData: [],
      multipleSelection: [],
      query: {}, // 查询条件
      regOptions,// 户籍下拉列表

    page: { // 分页对象
    current: 1, // 当前页码
    size: 20, // 每页显示多少条
    total: 2710 // 总记录数
    },
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
    // this.fetchData()
  },
  watch: {
    $route(to, from) {
      // react to route changes...
      this.user = this.$route.query.user
    },
    "query.reg": {
      handler:function(){this.fetchData()},
      immediate: true
    }
  },
  methods: {
  // val 是切换之后的每页显示多少条
      handleSizeChange(val) {
          this.page.size = val
          this.fetchData()
      },
    // 当页码改变后触发到此方法，val 是当前点击（或输入）的那个页码，
      handleCurrentChange(val) {
          this.page.current = val
          this.fetchData()
      },
    fetchData() {
      api.getPersonInfo(this.query, this.page.current, this.page.size).then(response => {
      this.tableData = response.data.rows
      })
    },
    // fetchData() {
    //         api.getList(this.query, this.page.current, this.page.size).then(response => {
    //             // console.log('response', response)
    //             // 列表数据
    //             this.list = response.data.records
    //             this.page.total = response.data.total
    //         })
    //     },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
       // 条件查询
        queryData() {
            // 将页码变为1，第1页
            this.page.pagesize = 20
            this.page.current = 1
            this.fetchData()
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
        // 批量删除
        multiDelete(){
         console.log(this.multipleSelection.length)
         if(this.multipleSelection.length === 0){
          this.$message({
                    type: 'error',
                    message: "未选择删除对象"
                })
          return
         }
          this.$confirm('确认删除所有记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
            }).then(() => {
                // 发送删除请求
                // api.deleteById(id).then(response => {
                // 处理响应结果提示
                var nameList = ""
                this.multipleSelection.forEach(element => {
                  nameList = nameList + " " +element.name
                });
                const message = "已删除" + nameList +"等人员信息"

                this.$message({
                    type: 'success',
                    message: message
                })
                // })
                // 刷新列表数据
                this.fetchData()
            }).catch(() => {
              console.log('error');
                // 取消删除，不用理会        
            });
        },
         handleEdit(idNo) {
           // 通过id查询详情
           this.query.idNo = idNo
          // console.log('query',this.query.idNo)
           api.getPersonInfoById(this.query).then(response => {
               if(response.status === 200 ){
                   // 将查询的详情传递
                   //console.log(response.data)
                   this.edit.formData = response.data.rows[0]
                   this.edit.title = '编辑'
                   this.edit.visible = true
               }
          })
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
