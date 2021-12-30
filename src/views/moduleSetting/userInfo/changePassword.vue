<template>
    <el-dialog :append-to-body="true" title="修改密码" :visible.sync="visible" width="500px"
    :before-close="handleClose">
        <el-form label-width="100px" 
            label-position="right" style="width:400px;" status-icon>
            
            <el-form-item label="原先旧密码" prop="oldSecret">
                <el-input v-model="oldSecret"></el-input>
            </el-form-item>

            <el-form-item label="新密码" prop="newSecret">
                <el-input v-model="newSecret"></el-input>
            </el-form-item>

            <el-form-item label="新密码确认" prop="newSecretComfirm">
                <el-input v-model="newSecretComfirm"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('formData')" size="mini">确定</el-button>
                <el-button size="mini" @click="handleClose">取消</el-button>
            </el-form-item>
            </el-form>
    </el-dialog>
</template>


<script>
import { mapGetters } from 'vuex'
import { changePassword } from '@/api/user'
export default {
    name:'ChangePassword',
    props: {
        visible: { // 弹出窗口，true弹出
            type: Boolean,
            default: false
        },
        remoteClose: Function // 用于关闭窗口
    },
    data() {
        return {
            oldSecret:'',
            newSecret:'',
            newSecretComfirm:''
        }
    },
    computed: {
        ...mapGetters([
        'name'
        ])
    },
    methods: {
        // 关闭窗口
        handleClose() {
            this.oldSecret = '',
            this.newSecret = '',
            this.newSecretComfirm = '',
            // 注意不可以通过  this.visible = false来关闭，因为它是父组件的属性
            this.remoteClose()
        },

        // 提交表单数据
        submitForm(formName) {
            this.handleClose()
            // 校验通过，提交表单数据
            this.submitData()
        },

        async submitData() {
            if(this.newSecretComfirm !== this.newSecret){
                this.$message({
                    message: '两次密码输入不一致',
                    type: 'error'
                })
                return
            }
            let response = null
            response = await changePassword(this.name, this.oldSecret, this.newSecret)
            console.log(response)
            if(response.status === 200) {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                })
                // 关闭窗口
                this.handleClose()
            }else {
                this.$message({
                    message: '修改失败,原密码错误',
                    type: 'error'
                })
            }
        }
    }
}
</script>

<style scope>

.el-dialog__body{
      padding-top: 0;
  }

.el-dialog__title{
      padding-top: 0;
  }

.el-dialog__header{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center;     /* 垂直居中 */
    height: 100px;
}
  
</style>