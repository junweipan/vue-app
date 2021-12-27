<template>
  <div>
    <div class="container">
      <h1>普通上传</h1>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="#"
        :auto-upload="false"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :file-list="fileList"
        :http-request="uploadHttpRequest"
        :on-change="fileChange"
      >

        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>

        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
          >上传到服务器</el-button
        >
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png/pdf文件，且不超过500kb
        </div>
      </el-upload>
    </div>

    <module-pdf
      :fileList="fileList"
      :dialogVisible="dialogVisible"
      :src="src"
      :isShow="isShow"
      :url="url"
      :isFull="isFull"
      :numPages="numPages"
      :remoteClose="handleClose"
    ></module-pdf>
  </div>
</template>

<script>
import ModulePdf from "@/components/PDFViewer/modulePdf.vue";
import Pdf from "vue-pdf";
export default {
  name: "NormalUpload",
  components: {
    ModulePdf,
    Pdf,
  },
  data() {
    return {
      fileList: [
        {
          id: 2,
          name: "测试PDF1",
          url: "/static/test1.pdf",
        },
        {
          id: 3,
          name: "测试PDF2",
          url: `${window.location.origin}/test1.pdf`,
        },
        {
          id: 1,
          name: "线上文件,本地跨域(测试用)",
          url: "http://localhost:9530/test1.pdf",
        },
      ],
      // 控制PDF module组件参数
      dialogVisible: false,
      src: undefined,
      isShow: false,
      url: "/test1.pdf",
      isFull: false,
      numPages: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    uploadHttpRequest(params) {
      console.log("uploadHttpRequest", params);
    },
    beforeUpload(params) {
      console.log("beforeUpload", params);
    },
    fileChange(params) {
      console.log("fileChange", params);
    },
    // 预览pdf- 用iframe 可能某些浏览器不支持
    previewIframePDF(pdfUrl) {
      // console.log('preview')
      this.src = Pdf.createLoadingTask(pdfUrl);
      this.src.promise.then((pdf) => {
        this.numPages = pdf.numPages;
      });
      this.isFull = true;
      this.dialogVisible = true;
    },
    // 如果浏览器不支持iframe, 则用以下方法替代
    previewVuePDF(pdfUrl) {
      console.log("preview", pdfUrl);
      this.src = Pdf.createLoadingTask(pdfUrl);
      this.src.promise.then((pdf) => {
        this.numPages = pdf.numPages;
      });
      this.isFull = false;
      this.dialogVisible = true;
      this, (this.isShow = true);
    },
    // 关闭pdf module弹框
    handleClose() {
      this.src = undefined;
      this.dialogVisible = false;
    },

    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log("点击文件", file);
      this.previewIframePDF(file.url);
    },
  },
};
</script>

<style scope>
.container {
  margin-top: 50px;
}
</style>