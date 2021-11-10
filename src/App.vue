<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './home/index.vue'
export default {
  name: 'App',
  components:{
    'home':Home
  }
}
</script>
