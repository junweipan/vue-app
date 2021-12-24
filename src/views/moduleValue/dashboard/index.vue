<template>
    <div class="dashboard-container">
        <h1>产值管理 首页</h1>
    </div>
</template>

<script>

export default {
  name: 'Dashboard2',
 
  data() {
    return {
      routes:{}
    }
  },
  filters:{
    
  },
  computed:{
  },
  created() {
    // this.fetchData()
  },
  watch: {

  },
  methods: {
    fetchData() {
      
    }
  }
}
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
  .pagination{
    float:right;
    margin-top: 20px;
  }
</style>
