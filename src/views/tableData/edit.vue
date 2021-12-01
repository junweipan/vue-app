<template>
    <el-dialog :title="title" :visible.sync="visible" width="500px"
    :before-close="handleClose">
        <el-form :rules="rules" ref="formData" :model="formData" label-width="100px" 
            label-position="right" style="width: 400px" status-icon>
            
            <el-form-item label="身份证号码" prop="idNo">
                <el-input :disabled="title === '编辑'" v-model="formData.idNo"></el-input>
            </el-form-item>

            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="formData.sex" > 
                    <el-radio label="0">女</el-radio>
                    <el-radio label="1">男</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="工作岗位" prop="post">
                <el-input v-model="formData.post"></el-input>
            </el-form-item>

            <el-form-item label="联系电话" prop="telno">
                <el-input v-model="formData.telno"></el-input>
            </el-form-item>

            <el-form-item label="开户行" prop="bankName">
                <el-select v-model="formData.bankName" filterable placeholder="请选择">
                <el-option
                v-for="item in bankTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="银行卡号" prop="bankCardNumber">
                <el-input v-model="formData.bankCardNumber"></el-input>
            </el-form-item>

            <el-form-item label="学历" prop="edu">
                <el-select v-model="formData.edu" filterable placeholder="请选择">
                <el-option
                v-for="item in eduTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="毕业学校" prop="graduatedSchool">
                <el-input v-model="formData.graduatedSchool"></el-input>
            </el-form-item>

             <el-form-item label="户籍" prop="reg">
                <el-radio-group v-model="formData.reg" >
                    <el-radio label="0">农</el-radio>
                    <el-radio label="1">非农</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="地址" prop="address">
                <el-input v-model="formData.address"></el-input>
            </el-form-item>

             <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" v-model="formData.remark"></el-input>
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
            bankTypeList : [
                {value:"11",label:"浙商银行"},
                {value:"12",label:"杭州银行"},
                {value:"13",label:"浙江民泰商业银行"},
                {value:"14",label:"浙江省农村信用社联合社"},
                {value:"15",label:"浙江稠州商业银行"},
                {value:"16",label:"台州银行"},
                {value:"17",label:"绍兴银行"},
                {value:"1", label:"中国银行"},
                {value:"2", label:"农业银行"},
                {value:"3", label:"建设银行"},
                {value:"4", label:"工商银行"},
                {value:"5", label:"邮政储蓄银行"},
                {value:"6", label:"交通银行"},
                {value:"7", label:"浦发银行"},
                {value:"8", label:"中信银行"},
                {value:"9", label:"民生银行"},
                {value:"10",label:"华夏银行"}],
                eduTypeList :
                 [{value:"0", label:"初中及以下"}, 
                 {value:"1", label:"高中"}, 
                 {value:"2", label:"专科"}, 
                 {value:"3", label:"本科"}, 
                 {value:"4", label:"硕士"}, 
                 {value:"5", label:"博士及以上"}],
            rules: {
                name: [ // prop值
                    {required: true, message: '请输入分类名称', trigger: 'blur'},
                ],
                status: [
                    {required: true, message: '请选择状态', trigger: 'change'},
                ],
                sort: [
                    {required: true, message: '请输入排序号', trigger: 'blur'},
                ]
            }
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