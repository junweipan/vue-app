<template>
  <div class="dashboard-container">
    <h1>系统日志</h1>
        <!-- 条件查询 -->
        <el-form :inline="true" :model="query" size="mini">

            <el-form-item label="日志类型:">
                <el-select v-model.trim="query.logType" filterable style="width: 85px">
                    <el-option 
                        v-for="item in logTypeOptions" :key="item.code" 
                        :label="item.name" :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="操作类型:">
                <el-select v-model.trim="query.opType" filterable style="width: 85px">
                    <el-option 
                        v-for="item in opTypeOptions" :key="item.code" 
                        :label="item.name" :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="操作日期:">
                <!-- <div class="block"> -->
                  <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                <!-- </div> -->
            </el-form-item>

            <el-form-item label="操作对象">
                <el-input v-model.trim="query.opObj" ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
                <el-button icon="el-icon-refresh"  @click="reload">重置</el-button>
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
        :default-sort = "{prop: 'createTime', order: 'descending'}"
        >

       <el-table-column
        label="序号"
        type="index"
        width="100">
      </el-table-column>

        <el-table-column
          label="日志类型"
          width="auto">
          <template slot-scope="scope">{{ scope.row.logType | logTypeFormat}}</template>
        </el-table-column>


        <el-table-column
          label="操作时间"
          width="auto"
          prop="createTime"
          sortable
          >
          <template slot-scope="scope">{{ scope.row.createTime}}</template>
        </el-table-column>

        <el-table-column
          label="操作用户名称"
          width="auto"
          sortable>
          <template slot-scope="scope">{{ scope.row.userKey }}</template>
        </el-table-column>

        <el-table-column
          label="登录IP地址"
          width="auto">
          <template slot-scope="scope">{{ scope.row.ip }}</template>
        </el-table-column>

        <el-table-column
          label="操作类型"
          width="auto">
          <template slot-scope="scope">{{ scope.row.opType | opTypeFormat }}</template>
        </el-table-column>

        <el-table-column
          label="操作对象"
          width="auto">
          <template slot-scope="scope">{{ scope.row.opObj }}</template>
        </el-table-column>

        <el-table-column
          label="操作描述信息"
          width="auto">
          <template slot-scope="scope">{{ scope.row.descpript }}</template>
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
       </div>
  </div>
</template>

<script>
import api from '@/api/sysLog'

const logTypeOptions = [
  {code:"0",name:'系统日志'},
  {code:"1",name:'业务日志'}
] ;

const opTypeOptions = [
{code:0,name:"增加"},
{code:1,name:"硬删除"},
{code:2,name:"软删除"},
{code:3,name:"修改"},
{code:4,name:"查询"},
{code:5,name:"登录"},
{code:6,name:"登出"},
{code:7,name:"导入"},
{code:8,name:"导出"},
{code:9,name:"提交"},
{code:10,name:"退回"},
{code:11,name:"重置"} 
];

export default {
  name: 'SysLog',
  components: { 
    },
  data() {
    return {
      // user: 'admin',
      tableData: [],

      // 查询条件
      query: {
        logType:'',
        opType:'',
        opObj:'',
        createDateStart:'',
        createDateEnd:''
      }, 
      logTypeOptions,
      opTypeOptions,
      //新增, 编辑窗口
      edit: {
        title: '',
        visible: false,
        formData: {}
      },

      page: { // 分页对象
        current: 1, // 当前页码
        size: 20, // 每页显示多少条
        total: 2710 // 总记录数
        },

      dateRange:[],
    }
  },
  filters:{
    
  },
  computed:{
  },
  created() {
    this.fetchData()
  },
  watch: {
    dateRange: function() {
      this.query.createDateStart = this.dateRange[0] // 获取start date前10位字符 yyyy-mm-dd
      this.query.createDateEnd = this.dateRange[1] // 获取end date前10位字符 yyyy-mm-dd
    }
    //$route(to, from) {
      // react to route changes...
    //   this.user = this.$route.query.user
    // },
    // "query.reg": {
    //   handler:function(){this.fetchData()},
    //   immediate: true
    // }
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
          // console.log('query:', this.query)
          api.getSysLog(this.query,this.page.current,this.page.size).then(response => {
          this.tableData = response.data
          // console.log('tableData:',this.tableData)
          })
        },
       // 条件查询
        queryData() {
            // 将页码变为1，第1页
            this.page.current = 1
            this.page.size = 20
            this.fetchData()
        },
        clearQuery(){
          this.dateRange = ''
          this.page.current = 1
          this.page.size = 20
          this.query = {
              logType:'',
              opType:'',
              opObj:'',
              createDateStart:'',
              createDateEnd:''
            }
        },
        // 重置
        reload() {
            this.clearQuery()
            this.fetchData()
        },
        // 子组件会触发此事件方法来关闭窗口
        remoteClose() {
            this.edit.formData = {}
            this.edit.visible = false
            this.clearQuery()
            // this.fetchData()
        },
        // 打开新增窗口
        openAdd() {
            this.edit.visible = true
            this.edit.title = '新增'
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
