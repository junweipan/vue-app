<template>
    <el-dialog
       :append-to-body="true"
        title="详情"
        :visible.sync="visible"
        width="30%"
        :before-close="handleClose">
        <span>{{title}}</span>
        <span>{{message}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
      </el-dialog>
</template>
<script>

export default {
    props: {
        date: { // 弹窗的时间
            type: String,
            default: ''
        },
        title: { // 弹窗的标题
            type: String,
            default: ''
        },
        message: { // 弹窗的内容
            type: String,
            default: ''
        },
        visible: { // 弹出窗口，true弹出
            type: Boolean,
            default: false
        },       
        handleDialogVisible: Function // 用于关闭窗口
    },
    data() {
        return {
        }
    },

    methods: {
       handleClose() {
            this.handleDialogVisible()
        },
    }
}
</script>