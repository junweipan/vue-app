<template>
  <div class="dashboard-container">
    <el-tree
      :data="treeData"
      :props="treeProps"
      show-checkbox
      node-key="extData"
      ref="tree"
      :default-expanded-keys="expandNode"
      highlight-current
    >
    </el-tree>

    <div class="buttons">
      <el-button @click="setCheckedNodes">测试: 通过 node 设置</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
  </div>
</template>


<script>
import emptyTree from './emptyTree.json'
import checkTree from './checkTree.json'
export default {
  data() {
    return {
      // 替换tree props的默认key
      treeProps: {
        label: "text",
      },
      treeData: emptyTree.arrayList,
      checkNode: checkTree.jsonArray[0].functions,
      expandNode: [],
    };
  },
  methods: {
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      const checkedNodes = this.convertKey(this.checkNode, {
        //在空树结构中, funcId对应的字段是extData
        funcId: "extData",
      });
      //勾选node
      this.$refs.tree.setCheckedNodes(checkedNodes);
      //展开有选中项的node
      this.expandNode = this.getRoleFuncID(this.checkNode, 1);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    // 换object中的key名字: { funcId:1, name:"小明"} -> { extData:1, text:"小明"}
    convertKey(arr, keyMap) {
      let tempString = JSON.stringify(arr);
      for (var key in keyMap) {
        var reg = `/"${key}":/g`;
        tempString = tempString.replace(eval(reg), '"' + keyMap[key] + '":');
      }
      return JSON.parse(tempString);
    },
    // tree node展开到具体层级1-01-01-01 主平台(顶级)-系统配置(一级)-机构信息维护(二级)-增加下级机构(三级-button)
    getRoleFuncID(arr, level = 1) {
      // 默认只展开到二级功能, level默认为1, 取值范围: 0,1,2
      let roleFuncIDSet = new Set()
      if (level == 0) {
        arr.forEach((element) => {
            roleFuncIDSet.add(Math.floor(element.funcId / 1000000))
        });
        return [...roleFuncIDSet];
      } 
      if (level == 1) {
          arr.forEach((element) => {
            roleFuncIDSet.add(Math.floor(element.funcId / 10000))
        });
        return [...roleFuncIDSet];
      } 
       if (level == 2) {
          arr.forEach((element) => {
            roleFuncIDSet.add(Math.floor(element.funcId / 100))
        });
        return [...roleFuncIDSet];
      } 
    },
  },

};
</script>


<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.pagination {
  float: right;
  margin-top: 20px;
}
</style>