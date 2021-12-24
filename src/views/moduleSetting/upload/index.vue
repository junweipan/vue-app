<template>
  <div class="dashboard-container">
      <h1>upload</h1>

      <drag-upload></drag-upload>  
      <normal-upload></normal-upload>
      <module-pdf></module-pdf>
  </div>
</template>

<script>
import DragUpload from './dragUpload.vue'
import NormalUpload from './normalUpload.vue'
import ModulePdf from './modulePdf.vue'
export default {
  props: {},
  components: {
      'drag-upload': DragUpload,
      'normal-upload':NormalUpload,
      'module-pdf': ModulePdf
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
.dashboard-container {
    margin:50px
}

</style>