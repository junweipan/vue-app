<template>
  <div style="padding: 30px">
    <div>
      文件列表
      <ul class="imglist">
        <li v-for="item in fileList" :key="item.id" class="imgitem">
          <span class="ltext">{{ item.fileName }}</span>
          <span class="rbut">
            <el-button type="text" @click="preview(item)">预览</el-button>
          </span>
        </li>
      </ul>
    </div>

    <el-dialog
      title="文件预览"
      :visible.sync="dialogVisible"
      width="50%"
      :fullscreen="isFull"
      :custom-class="isFull ? 'preview-dialog' : ''"
      :before-close="handleClose"
    >
      <span class="btn">
        <el-button type="primary" @click="print">pdf打印</el-button>
        <el-button type="primary" @click="printImg">转图片打印</el-button>
      </span>

      <!-- 加载全部页面的PDF是一个for循环,不能指定用来打印的ref -->
      <div v-if="!isFull" ref="printContent">
        <Pdf v-for="i in numPages" :key="i" :src="src" :page="i" />
      </div>
      <!-- 这种写法默认只加载第一页,pdf隐藏,打印用的 -->
      <Pdf :src="src" ref="myPdf" v-show="isShow" />
      <!-- iframe打印 -->
      <iframe
        v-if="isFull"
        :src="url"
        frameborder="0"
        style="width: 100%; height: 100%"
      ></iframe>
    </el-dialog>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import printJS from "print-js";
import Pdf from "vue-pdf";

export default {
  components: {
    Pdf,
  },
  data() {
    return {
      fileList: [
        {
          id: 2,
          fileName: "应收账款-public/static/test1.pdf",
          fileUrl: "/static/test1.pdf",
        },
        {
          id: 3,
          fileName: "测试PDF-public/test1.pdf",
          fileUrl: `${window.location.origin}/test1.pdf`,
        },
      ],
      numPages: undefined,
      dialogVisible: false,
      src: "",
      isShow: false,
      url: "",
      isFull: false,
    };
  },
  created() {},
  methods: {
    // 预览
    preview(item) {
      this.src = Pdf.createLoadingTask(item.fileUrl);
      this.src.promise.then((pdf) => {
        this.numPages = pdf.numPages;
      });

      this.isFull = false;
      this.dialogVisible = true;
    },
    // 关闭弹框
    handleClose() {
      this.src = "";
      this.dialogVisible = false;
    },
    // 打印
    print() {
      console.log(this.$refs.myPdf);
      this.$refs.myPdf && this.$refs.myPdf.print();
    },
    // 转图片之后打印
    printImg() {
      html2canvas(this.$refs.printContent, {
        backgroundColor: null,
        useCORS: true,
        windowHeight: document.body.scrollHeight,
      }).then((canvas) => {
        const url = canvas.toDataURL();
        printJS({
          printable: url,
          type: "image",
          documentTitle: this.printName,
        });
        // console.log(url)
      });
    },
  },
};
</script>
<style lang="scss">
.btn{
  float:right;
}
.imglist {
  width: 500px;
  padding-top: 20px;
  .imgitem {
    height: 35px;
    overflow: hidden;
  }
  .ltext {
    line-height: 35px;
  }
  .rbut {
    float: right;
  }
}
.preview-dialog {
  .el-dialog__body {
    height: 100%;
  }
}
.magnifer-dialog {
  .el-dialog__header {
    height: 30px;
  }
  .el-dialog__body {
    overflow: hidden;
  }
  .magnifer {
    width: 125%;
    margin-left: -90px;
    margin-top: -80px;
  }
}
</style>
