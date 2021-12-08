<template>
    <div>
        <div class="main">
            <div class="uploadBox">
                <div class="cropper-con">
                  <div class="title">
                     <h2>上传头像</h2> 
                  </div>
                    <vue-cropper
                        ref="cropper"
                        :img="option.img"
                        :outputSize="option.outputSize"
                        :outputType="option.outputType"
                        :info="option.info"
                        :canScale="option.canScale"
                        :autoCrop="option.autoCrop"
                        :autoCropWidth="option.autoCropWidth"
                        :autoCropHeight="option.autoCropHeight"
                        :fixed="option.fixed"
                        :fixedNumber="option.fixedNumber"
                        :full="option.full"
                        :fixedBox="option.fixedBox"
                        :canMove="option.canMove"
                        :canMoveBox="option.canMoveBox"
                        :original="option.original"
                        :centerBox="option.centerBox"
                        :height="option.height"
                        :infoTrue="option.infoTrue"
                        :maxImgSize="option.maxImgSize"
                        :enlarge="option.enlarge"
                        :mode="option.mode"
                        @realTime="realTime"
                        @imgLoad="imgLoad">
                    </vue-cropper>
                </div>
            </div>

            <div class="previewBox">
                <img  :src="avatar" alt="">
            </div>
        </div>
            <div class="btn">
            <input id="upload" type="file" @change="selectImg">
            <label for="upload" class="btn-item">上传图片</label>
        </div>
    </div>
</template>

<script>

export default {
  name: "CropperImage",
  data() {
    return {
      previews: {},
      // 设置一个默认头像图片-纯白色
      avatar: require('@/assets/white.png'),
      option:{
        img: '',             //裁剪图片的地址
        outputSize: 1,       //裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'jpeg',  //裁剪生成图片的格式（jpeg || png || webp）
        info: true,          //图片大小信息
        canScale: true,      //图片是否允许滚轮缩放
        autoCrop: true,      //是否默认生成截图框
        autoCropWidth: 150,  //默认生成截图框宽度
        autoCropHeight: 150, //默认生成截图框高度
        fixed: true,         //是否开启截图框宽高固定比例
        fixedNumber: [1, 1], //截图框的宽高比例
        full: false,         //false按原比例裁切图片，不失真
        fixedBox: true,      //固定截图框大小，不允许改变
        canMove: true,      //上传图片是否可以移动
        canMoveBox: false,    //截图框能否拖动
        original: false,     //上传图片按照原始比例渲染
        centerBox: false,    //截图框是否被限制在图片里面
        height: true,        //是否按照设备的dpr 输出等比例图片
        infoTrue: false,     //true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000,    //限制图片最大宽度和高度
        enlarge: 1,          //图片根据截图框输出比例倍数
        mode: 'auto auto'  //图片默认渲染方式
      }
    };
  },
  methods: {
    //初始化函数
    imgLoad (msg) {
        console.log('载入成功...')
    },
    //实时预览函数
    realTime (data) {
        console.log(data)
      this.previews = data;
      this.$refs.cropper.getCropData(async (data) => {
        this.avatar = data
      })
    },
    //选择图片
    selectImg (e) {
      let file = e.target.files[0]
      if(!file){
          return false
      }
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型要求：jpeg、jpg、png")
        return false
      }
      //转化为blob
      let reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.option.img = data
      }
      //转化为base64
      reader.readAsDataURL(file)
    },
    //上传图片
    uploadImg (type) {
      let _this = this;
        //获取截图的blob数据
        this.$refs.cropper.getCropBlob(async (data) => {
          let formData = new FormData();
          formData.append('file',data,"DX.jpg")
          console.log('data：',data)
          // 上传到服务端
          // doSomething
        })
    },
  },
}
</script>

<style scoped lang="scss">
.title{
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 10px;
    #upload{
        display: none;
    }
    .btn-item{
        display: flex;
        justify-content: center;
        flex-direction: row;
        cursor: pointer;
        width: 100px;
        font-size: 12px;
        border-radius: 7px;
        padding: 3px;
        margin-bottom: 10px;
        background-color: #aaa;
        color: #fff;
        border: 1px solid rgba(0,0,0,0.1);
        &:hover{
            background-color: #ccc;
        }
    }
}
.main{
    display: flex;
    height: 100%;
    width: 100%;
    .previewBox{
        // width: 300px;
        flex: 1;
        display: flex;
        img{
        margin-top: 70px;
        margin-bottom: 30px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        }
    }
    .uploadBox{
        flex: 1;
        display: flex;
        margin-left: 50px;
        .cropper-con{
            width: 170px;
            height: 170px;
            margin-right: 50px;
        }
    }
}
</style>