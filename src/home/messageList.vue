<template>
<div>
    <div>
      <el-dialog
       :append-to-body="true"
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
        <el-popover
            ref="popoverRef"
            placement="right"
            width="400"
            trigger="click">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                @cell-click = "hidePop">
                <el-table-column
                  prop="date"
                  label="日期"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址"
                  width="auto">
                </el-table-column>
              </el-table>
             <el-button type="text" slot="reference" style="margin-bottom: 6px">新消息</el-button>
        </el-popover>
        <el-badge :value="4" class="item" style="margin-left: -5px; margin-top: -5px">
        </el-badge>
    
    </div>
</div>

  
</template>


<script>
import Edit from './edit'
  export default {
  name: 'Message',
  components: { 
        Edit // Edit: Edit
    },
    data() {
      return {
      dialogVisible: false,
      edit: {
       title: '',
       visible: false,
      },
        visible: false,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      };
    },
    methods:{
      showPop(){
        this.visible = true
      },
      hidePop(){
        this.$refs.popoverRef.doClose();
        this.dialogVisible = true
      },
      // 子组件会触发此事件方法来关闭窗口
      remoteClose() {  
        this.edit.visible = false
        },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    
    }
  };
</script>