<template>
  <div>
    <el-image-viewer
      v-if="showViewer"
      :on-close="onClose"
      :url-list="imgList" />
  </div>
</template>
<script>
export default {
  name: "Index",
  components: {
    "el-image-viewer": () =>
      import("element-ui/packages/image/src/image-viewer"),
  },
  props: {
    showViewer: {
      type: Boolean,
      default: false,
    },
    imgList: {
      type: Array,
      default: ()=>{return ["/defaultProfile.png"]},
    },
    remoteClose: Function // 用于关闭窗口
  },
  data() {
    return {
    };
  },
  methods: {
      onClose(){
          this.remoteClose();
      }
  },
};
</script>
