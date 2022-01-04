<template>
<!-- 顶级下拉菜单图标 上部分为原型图片, 下部分为文字, 类似button效果 -->
    <div>
        <el-button type="text">
            <div class="back-sky-layout-header-app-dropdown-body-item-icon">
                <img :src="imgUrl" class="iconyingyong">
            </div>
            <div>{{menuText}}</div>
        </el-button>
    </div>
</template>

<script>
export default {
    name:'IconTextButton',
    props: {
        imgUrl: { // 图片路径
            type: String,
            default: ""
        },
        menuText: { // 菜单文字
            type: String,
            default: ""
        },
    }
}
</script>

<style lang="scss" scoped>
// 顶级下拉菜单图标的样式
.back-sky-layout-header-app-dropdown-body-item-icon {
    position: relative;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin: 8px auto 6px;
    color: #fff;
    background-color: #0f60b8;
    cursor: pointer;
}
.back-sky-layout-header-app-dropdown-body-item-icon:hover {
  background-color: #0f41e7;
}
.el-button--text:hover {
    color: #0f41e7;
}

.iconyingyong {
    height: 40px;
    width: 40px;
}
</style>