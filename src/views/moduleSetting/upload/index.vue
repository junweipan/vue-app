<template>
  <div class="dashboard">
      <h1>upload</h1>
      <div class="uploads">
      <drag-upload></drag-upload>  
      <normal-upload></normal-upload>
      </div>
  </div>
</template>

<script>
import DragUpload from './dragUpload.vue'
import NormalUpload from './normalUpload.vue'
export default {
  props: {},
  components: {
      'drag-upload': DragUpload,
      'normal-upload':NormalUpload,
  },
  data() {
    return {

    };
  },
  computed: {
    
  },
  watch: {
  },
  methods: {

  },
};
</script>

<style scope>
.dashboard {
    margin:50px
}
.uploads{
  display: flex;
  justify-content: space-evenly;
}
</style>