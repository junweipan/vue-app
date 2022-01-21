<template>
    <div>
        <branch-table></branch-table>
    </div>
</template>


<script>
import BranchTable from './branchTable.vue'
export default {
  name: "branchInfo",
  components: {
      'branch-table':BranchTable
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
