<template>
    <el-dialog :title="title" :visible.sync="visible" width="500px"
    :before-close="handleClose">
    </el-dialog>
</template>
<script>
import api from '@/api/category'

export default {
    props: {
        title: { // 弹窗的标题
            type: String,
            default: ''
        },
        visible: { // 弹出窗口，true弹出
            type: Boolean,
            default: false
        },
        // formData: { // 提交表单数据
        //     type: Object, 
        //     default: {}
        // },
        
        remoteClose: Function // 用于关闭窗口
    },
    data() {
        return {
        }
    },

    methods: {
       handleClose() {
            this.remoteClose()
        },
    }
}
</script>