<template>
    <el-dialog :title="title" :visible.sync="visible" width="500px"
    :before-close="handleClose">
        <el-form ref="formData" :model="formData" label-width="100px" 
            label-position="right" style="width: 400px" status-icon>
            
            <el-form-item label="功能类型" prop="">
                <el-radio-group v-model="formData.funType" > 
                    <el-radio label="0">模块</el-radio>
                    <el-radio label="1">一级分组</el-radio>
                    <el-radio label="2">二级分组</el-radio>
                    <el-radio label="3">菜单功能</el-radio>
                    <el-radio label="4">操作功能</el-radio>
                </el-radio-group>
            </el-form-item>


            <el-form-item label="功能编号" prop="funNo">
                <el-input v-model="formData.funNo"></el-input>
            </el-form-item>

            <el-form-item label="一级分组" prop="bak">
                <el-select v-model="formData.bankName" filterable placeholder="请选择">
                <el-option
                v-for="item in levelOneList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
                </el-select>
            </el-form-item>


            <el-form-item label="二级分组" prop="bak">
                <el-select v-model="formData.bankName" filterable placeholder="请选择">
                <el-option
                v-for="item in levelTwoList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="功能图标" prop="iconName">
                <el-input v-model="formData.iconName"></el-input>
            </el-form-item>

            <el-form-item label="模块" prop="funType">
                <el-select v-model="formData.funType" filterable placeholder="请选择">
                <el-option
                v-for="item in moduleList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="功能名称" prop="funName">
                <el-input v-model="formData.funName"></el-input>
            </el-form-item>

            <el-form-item label="菜单功能" prop="funType">
                <el-select v-model="formData.funType" filterable placeholder="请选择">
                <el-option
                v-for="item in menuList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="URL地址" prop="url">
                <el-input v-model="formData.url"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('formData')" size="mini">确定</el-button>
                <el-button size="mini" @click="handleClose">取消</el-button>
            </el-form-item>
            </el-form>
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
        formData: { // 提交表单数据
            type: Object, 
            default: {}
        },
        
        remoteClose: Function // 用于关闭窗口
    },
    data() {
        return {
            moduleList : [
                {value:"0",label:"默认模块"},
                {value:"1",label:"新增模块"},
                ],
            levelOneList :
                 [],
            levelTwoList: [],
            menuList:[],
            funIco:'',
            url:'',
            funNo:''
        }
    },

    methods: {
        // 关闭窗口
        handleClose() {
            // 将表单清空
            this.$refs['formData'].resetFields()
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
        }
    }
}
</script>