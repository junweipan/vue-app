<template>
  <div class="container">
    <h1>拖拽上传</h1>
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      :on-preview="handlePreview"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>

     <photo-viewer :showViewer="showViewer" :imgList="imgList" :remoteClose="onHandlePhotoViewerClose"></photo-viewer>
  </div>
</template>

<script>
import PhotoViewer from '@/components/PhotoViewer'
export default {
  props: {},
  components: {
    'photo-viewer': PhotoViewer
  },
  data() {
    return {
      // 图片展示组件attribute
      showViewer: false,
      imgList: ["/defaultProfile.png"],
    };
  },
  computed: {},
  watch: {},
  methods: {
    beforeUpload(params) {
      console.log("beforeUpload", params);
    },
    handlePreview(file) {
      this.showViewer = true;
      console.log("点击文件", file);
    },
    onHandlePhotoViewerClose() {
      this.showViewer = false;
    },
  },
};
</script>

<style scope>
.container {
  margin-top: 50px;
}
</style>