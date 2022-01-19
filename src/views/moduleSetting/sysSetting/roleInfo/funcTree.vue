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
      <!-- <el-button @click="getCheckedNodes">通过 node 获取</el-button>
      <el-button @click="getCheckedKeys">通过 key 获取</el-button> -->
      <el-button @click="setCheckedNodes">通过 node 设置</el-button>
      <!-- <el-button @click="setCheckedKeys">通过 key 设置</el-button> -->
      <el-button @click="resetChecked">清空</el-button>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      const checkedNodes = this.convertKey(this.checkNode, {
        funcId: "extData",
      });
      //勾选node
      this.$refs.tree.setCheckedNodes(checkedNodes);
      //展开有选中项的node
      
      this.expandNode = this.getRoleFuncID(this.checkNode, 1);
    },
    // setCheckedKeys() {
    //   this.expandNode = this.getRoleFuncID(this.checkNode);
    //   this.$refs.tree.setCheckedKeys(this.expandNode);
    // },
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

  data() {
    return {
      // 替换tree props的默认key
      treeProps: {
        label: "text",
      },
      treeData: [
        {
          type: "node",
          text: "主平台",
          extData: 1,
          children: [
            {
              type: "node",
              text: "系统配置",
              extData: 101,
              children: [
                {
                  type: "node",
                  text: "机构信息维护",
                  extData: 10101,
                  children: [
                    {
                      type: "leaf",
                      text: "增加下级机构",
                      extData: 1010101,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改机构",
                      extData: 1010102,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "启用",
                      extData: 1010103,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "停用",
                      extData: 1010104,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "角色信息维护",
                  extData: 10102,
                  children: [
                    {
                      type: "leaf",
                      text: "增加角色",
                      extData: 1010201,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改角色",
                      extData: 1010202,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "启用",
                      extData: 1010203,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "注销",
                      extData: 1010204,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "操作员管理",
                  extData: 10104,
                  children: [
                    {
                      type: "leaf",
                      text: "删除用户",
                      extData: 1010405,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "增加用户",
                      extData: 1010401,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改用户",
                      extData: 1010402,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "启用",
                      extData: 1010403,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "注销",
                      extData: 1010404,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
              ],
              nodeKind: 2,
              belong: null,
            },
          ],
          nodeKind: 1,
          belong: null,
        },
        {
          type: "node",
          text: "资产平台",
          extData: 2,
          children: [
            {
              type: "node",
              text: "报表统计",
              extData: 206,
              children: [
                {
                  type: "node",
                  text: "区域统计地图",
                  extData: 20601,
                  children: [],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "区域租赁统计表",
                  extData: 20602,
                  children: [
                    {
                      type: "leaf",
                      text: "导出",
                      extData: 2060201,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "商铺合同统计表",
                  extData: 20603,
                  children: [
                    {
                      type: "leaf",
                      text: "合同详情",
                      extData: 2060301,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "导出",
                      extData: 2060302,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "年度汇总统计导出",
                      extData: 2060303,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
              ],
              nodeKind: 2,
              belong: null,
            },
            {
              type: "node",
              text: "系统配置",
              extData: 207,
              children: [
                {
                  type: "node",
                  text: "系统参数配置",
                  extData: 20701,
                  children: [],
                  nodeKind: 3,
                  belong: null,
                },
              ],
              nodeKind: 2,
              belong: null,
            },
            {
              type: "node",
              text: "资产管理 ",
              extData: 210,
              children: [
                {
                  type: "node",
                  text: "资产区域维护",
                  extData: 21001,
                  children: [
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2100101,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2100102,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除",
                      extData: 2100103,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "资产管理",
                  extData: 21002,
                  children: [
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2100201,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2100202,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除",
                      extData: 2100203,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "资产注销",
                      extData: 2100204,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "查看详情",
                      extData: 2100205,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "导出",
                      extData: 2100206,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "资产处置",
                  extData: 21003,
                  children: [
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2100301,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2100302,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除",
                      extData: 2100303,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "导出",
                      extData: 2100304,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "对外投资",
                  extData: 21004,
                  children: [
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2100401,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2100402,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除",
                      extData: 2100403,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "导出",
                      extData: 2100404,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "零星工程",
                  extData: 21005,
                  children: [
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2100501,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2100502,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除",
                      extData: 2100503,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "导出",
                      extData: 2100504,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
              ],
              nodeKind: 2,
              belong: null,
            },
            {
              type: "node",
              text: "报废资产 ",
              extData: 220,
              children: [
                {
                  type: "node",
                  text: "资产类别维护",
                  extData: 22001,
                  children: [
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2200101,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2200102,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除",
                      extData: 2200103,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "资产登记",
                  extData: 22002,
                  children: [
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2200201,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2200202,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除",
                      extData: 2200203,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "资产处置",
                  extData: 22003,
                  children: [
                    {
                      type: "leaf",
                      text: "处置",
                      extData: 2200301,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "导出",
                      extData: 2200302,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "资产处置信息",
                  extData: 22004,
                  children: [
                    {
                      type: "leaf",
                      text: "处置确认",
                      extData: 2200401,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "导出",
                      extData: 2200402,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除处置信息",
                      extData: 2200404,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
              ],
              nodeKind: 2,
              belong: null,
            },
            {
              type: "node",
              text: "商铺管理",
              extData: 201,
              children: [
                {
                  type: "node",
                  text: "商铺区域维护",
                  extData: 20101,
                  children: [
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2010101,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2010102,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除",
                      extData: 2010103,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "商铺档案管理",
                  extData: 20102,
                  children: [
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2010201,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "注销",
                      extData: 2010202,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "当前合同详情",
                      extData: 2010203,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "历史合同详情",
                      extData: 2010204,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "导出",
                      extData: 2010205,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "资产出租审批表",
                      extData: 2010206,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "待租商铺发布",
                  extData: 20103,
                  children: [
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2010301,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2010302,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除",
                      extData: 2010303,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "招租登记查询",
                  extData: 20104,
                  children: [
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2010401,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除",
                      extData: 2010402,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "导出",
                      extData: 2010403,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
              ],
              nodeKind: 2,
              belong: null,
            },
            {
              type: "node",
              text: "合同管理",
              extData: 202,
              children: [
                {
                  type: "node",
                  text: "承租人信息维护",
                  extData: 20201,
                  children: [
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2020101,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2020102,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除",
                      extData: 2020103,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "导出",
                      extData: 2020104,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "历史合同详情",
                      extData: 2020105,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "合同费率维护",
                  extData: 20202,
                  children: [
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2020201,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2020202,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "启用",
                      extData: 2020203,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "停用",
                      extData: 2020204,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除",
                      extData: 2020205,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "合同档案管理",
                  extData: 20203,
                  children: [
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2020301,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2020302,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "合同中止",
                      extData: 2020303,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除",
                      extData: 2020304,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "导出",
                      extData: 2020305,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "合同详情",
                      extData: 2020306,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "入住联系单下载",
                      extData: 2020307,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "合同下载",
                      extData: 2020308,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "承诺书下载",
                      extData: 2020309,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "合同到期提醒",
                  extData: 20204,
                  children: [
                    {
                      type: "leaf",
                      text: "到期处理",
                      extData: 2020401,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "合同验收",
                      extData: 2020402,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "导出",
                      extData: 2020403,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "合同详情",
                      extData: 2020404,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "商铺腾空验收移交书",
                      extData: 2020405,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "账单缴费管理",
                  extData: 20205,
                  children: [
                    {
                      type: "leaf",
                      text: "已缴费",
                      extData: 2020501,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2020502,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "查看账单详情",
                      extData: 2020503,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "账单导出",
                      extData: 2020504,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
              ],
              nodeKind: 2,
              belong: null,
            },
            {
              type: "node",
              text: "资产管理",
              extData: 205,
              children: [
                {
                  type: "node",
                  text: "车辆信息管理",
                  extData: 20503,
                  children: [
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2050301,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2050302,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "列入待处置库",
                      extData: 2050303,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "保险处理",
                      extData: 2050304,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "保养处理",
                      extData: 2050305,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "年检处理",
                      extData: 2050306,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "导出",
                      extData: 2050307,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "通用资产管理",
                  extData: 20504,
                  children: [
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2050401,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2050402,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "列入待处置库",
                      extData: 2050403,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "绑定员工",
                      extData: 2050404,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "释放员工",
                      extData: 2050405,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "资产卡片下载",
                      extData: 2050406,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "资产卡片下载全部",
                      extData: 2050407,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "导入模板下载",
                      extData: 2050408,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "通用资产导入",
                      extData: 2050409,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "资产处置备选库",
                  extData: 20505,
                  children: [
                    {
                      type: "leaf",
                      text: "制单",
                      extData: 2050501,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "释放",
                      extData: 2050502,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "资产处置审批单",
                  extData: 20506,
                  children: [
                    {
                      type: "leaf",
                      text: "完成处置",
                      extData: 2050601,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除",
                      extData: 2050602,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "资产处置审批单",
                      extData: 2050603,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "部门信息维护",
                  extData: 20501,
                  children: [
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2050101,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2050102,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "启用",
                      extData: 2050103,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "停用",
                      extData: 2050104,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "删除",
                      extData: 2050105,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
                {
                  type: "node",
                  text: "不动资产管理",
                  extData: 20502,
                  children: [
                    {
                      type: "leaf",
                      text: "修改",
                      extData: 2050202,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "导出",
                      extData: 2050203,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "列入待处置库",
                      extData: 2050204,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                    {
                      type: "leaf",
                      text: "新增",
                      extData: 2050201,
                      children: null,
                      nodeKind: 0,
                      belong: null,
                    },
                  ],
                  nodeKind: 3,
                  belong: null,
                },
              ],
              nodeKind: 2,
              belong: null,
            },
          ],
          nodeKind: 1,
          belong: null,
        },
      ],
      checkNode: [
        {
          roleId: 102,
          funcId: 1010101,
          funcName: "增加下级机构",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 1010102,
          funcName: "修改机构",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050101,
          funcName: "新增",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050102,
          funcName: "修改",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050103,
          funcName: "启用",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050104,
          funcName: "停用",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050105,
          funcName: "删除",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050201,
          funcName: "新增",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050202,
          funcName: "修改",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050203,
          funcName: "导出",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050204,
          funcName: "列入待处置库",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050301,
          funcName: "新增",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050302,
          funcName: "修改",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050303,
          funcName: "列入待处置库",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050304,
          funcName: "保险处理",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050305,
          funcName: "保养处理",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050306,
          funcName: "年检处理",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050307,
          funcName: "导出",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050401,
          funcName: "新增",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050402,
          funcName: "修改",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050403,
          funcName: "列入待处置库",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050404,
          funcName: "绑定员工",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050405,
          funcName: "释放员工",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050406,
          funcName: "资产卡片下载",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050407,
          funcName: "资产卡片下载全部",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050408,
          funcName: "导入模板下载",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050409,
          funcName: "通用资产导入",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050501,
          funcName: "制单",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050502,
          funcName: "释放",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050601,
          funcName: "完成处置",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050602,
          funcName: "删除",
          funcType: "B",
        },
        {
          roleId: 102,
          funcId: 2050603,
          funcName: "资产处置审批单",
          funcType: "B",
        },
      ],
      expandNode: [],
    };
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