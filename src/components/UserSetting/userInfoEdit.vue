<template>
    <el-dialog :append-to-body="true" title="用户信息" :visible.sync="visible" width="500px"
    :before-close="handleClose">
        <cropper-image></cropper-image>
        <!-- <el-form ref="infoData" :model="infoData" label-width="100px" 
            label-position="right" style="width:400px;" status-icon>
            
            <el-form-item label="身份证号码" prop="certNo">
                <el-input v-model="infoData.certNo"></el-input>
            </el-form-item>

            <el-form-item label="姓名" prop="realName">
                <el-input v-model="infoData.realName"></el-input>
            </el-form-item>

            <el-form-item label="昵称" prop="nickName">
                <el-input v-model="infoData.nickName"></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="infoData.gender" > 
                    <el-radio label="0">女</el-radio>
                    <el-radio label="1">男</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
                <el-input v-model="infoData.email"></el-input>
            </el-form-item>

            <el-form-item label="联系电话" prop="phone">
                <el-input v-model="infoData.phone"></el-input>
            </el-form-item>

            <el-form-item label="地址" prop="address">
                <el-input v-model="infoData.address"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('formData')" size="mini">确定</el-button>
                <el-button size="mini" @click="handleClose">取消</el-button>
            </el-form-item>
            </el-form> -->
    </el-dialog>
</template>
<script>

import cropperImage from '@/components/CropperImage/index'

export default {
    props: {
        visible: { // 弹出窗口，true弹出
            type: Boolean,
            default: false
        },
        // infoData: { // 提交表单数据
        //     type: Object, 
        //     default: {}
        // },
        remoteClose: Function // 用于关闭窗口
    },
    components:{
        cropperImage
    },
    data() {
        return {
            imageUrl: ''
        }
    },

    methods: {
        // 关闭窗口
        handleClose() {
            // 将表单清空
            this.$refs['infoData'].resetFields()
            // 注意不可以通过  this.visible = false来关闭，因为它是父组件的属性
            this.remoteClose()
        },

        // 提交表单数据
        submitForm(formName) {
            console.log('提交对象',this.formData)
            this.handleClose()
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         // 校验通过，提交表单数据
            //         this.submitData()
            //     } else {
            //         // console.log('error submit!!');
            //         return false;
            //     }
            // })
        },

        async submitData() {
            let response = null
            if(this.formData.id) {
                // 编辑
                response = await api.update(this.formData)
            }else {
                // 新增
                response = await api.add(this.formData)
            }
            
            if(response.code === 20000) {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                })
                // 关闭窗口
                this.handleClose()
            }else {
                this.$message({
                    message: '保存失败',
                    type: 'error'
                })
            }
        },

        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
        beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
}
</script>

<style scope>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-dialog__body{
      padding-top: 0;
  }
</style>