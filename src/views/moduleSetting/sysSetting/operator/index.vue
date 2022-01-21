<template>
    <div>
        <operator-table></operator-table>
    </div>
</template>


<script>
import OperatorTable from './operatorTable.vue'
export default {
  name: "operatorInfo",
  components: {
      'operator-table':OperatorTable
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
