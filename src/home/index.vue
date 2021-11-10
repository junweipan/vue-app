<template>
    <div>
        <nav-header></nav-header>
        <router-view></router-view>
    </div>
</template>


<script>
import NavHeader from './navHeader.vue'

  export default {
      name: 'Home',
      components:{
          'nav-header':NavHeader
      }
  }
</script>