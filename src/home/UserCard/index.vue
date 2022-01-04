<template>
  <div class="userCard" :class="type == 'success' ? 'selected' : ''">
    <span><i class="el-icon-location"></i>{{ client }}</span>
    <div class="checkTag">
      <span><i class="el-icon-s-custom"></i>{{ level }} </span>
      <el-tag :type="type"
        ><i
          :class="type == 'success' ? elIconCheck : ''"
          style="cursor: pointer"
          >{{ autority }}</i
        ></el-tag
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  components: {},
  props: {
    id: {
      // e.g.1
      type: String,
      default: "",
    },
    client: {
      // e.g.舟山市规划建筑设计院有限公司
      type: String,
      default: "",
    },
    level: {
      // e.g.本级
      type: String,
      default: "",
    },
    type: {
      // e.g.success
      type: String,
      default: "",
    },
    autority: {
      // e.g.开发
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 样式替换变量
      elIconCheck: "el-icon-check",
    };
  },
  filters: {},
  computed: {},
  created() {},
  watch: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.selected {
  color: #409eff;
  font-weight: 700;
}
.checkTag {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 5px;
  margin-bottom: 5px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

