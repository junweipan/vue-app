<template>
  <div class="dashboard-container">
    <el-form
      ref="user"
      :model="user"
      label-width="100px"
      label-position="right"
      class="userForm"
      status-icon
    >
      <el-form-item label="用户(公司名)" prop="client">
        <el-input v-model="user.client"></el-input>
      </el-form-item>

      <el-form-item label="等级" prop="level">
        <el-input v-model="user.level"></el-input>
      </el-form-item>

      <el-form-item label="职位" prop="autority">
        <el-input v-model="user.autority"></el-input>
      </el-form-item>

      <el-form-item label="备用字段1" prop="backup1">
        <el-radio-group v-model="user.backup1">
          <el-radio label="0">0</el-radio>
          <el-radio label="1">1</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="备用字段2" prop="backup2">
        <el-input v-model="user.backup2"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')" size="mini"
          >确定</el-button
        >
        <el-button type="warning" @click="onRemotePasswordOpen" size="mini"
          >修改密码</el-button
        >
        <!-- <el-button size="mini" @click="handleClose">取消</el-button> -->
      </el-form-item>
    </el-form>
    <cropper-image style="width: 50%"></cropper-image>
    <change-password
      :visible="passwordVisible"
      :remoteClose="onRemotePasswordClose"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CropperImage from "@/components/CropperImage/index";
import ChangePassword from "./changePassword.vue";

export default {
  props: {},
  components: {
    "cropper-image": CropperImage,
    "change-password": ChangePassword,
  },
  data() {
    return {
      imageUrl: "",
      user: {},
      passwordVisible: false,
    };
  },
  computed: {
    ...mapGetters([]),
  },
  watch: {
    $route() {
      this.freshUserEditInfo();
    },
  },
  created() {
    this.freshUserEditInfo();
  },
  methods: {
    onRemotePasswordOpen() {
      this.passwordVisible = true;
    },
    onRemotePasswordClose() {
      this.passwordVisible = false;
    },
    freshUserEditInfo() {
      // 修改对象是当前用户store中获取
    },
    // 提交表单数据
    submitForm(formName) {
      console.log("提交对象", this.formData);
    },
    async submitData() {
      let response = null;
      if (this.formData.id) {
        // 编辑
        response = await api.update(this.formData);
      } else {
        // 新增
        response = await api.add(this.formData);
      }

      if (response.code === 20000) {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        // 关闭窗口
        this.handleClose();
      } else {
        this.$message({
          message: "保存失败",
          type: "error",
        });
      }
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scope>
.dashboard-container {
  display: flex;
  flex-direction:row;
}
.userForm {
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 50px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
.el-dialog__body {
  padding-top: 0;
}
</style>