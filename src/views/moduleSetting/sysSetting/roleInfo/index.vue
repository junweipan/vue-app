<template>
    <div>
        <role-table></role-table>
    </div>
</template>


<script>
import RoleTable from './roleTable.vue'
export default {
  name: "roleInfo",
  components: {
      'role-table':RoleTable
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
