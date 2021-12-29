<template>
  <div class="Echarts">
    <div id="main" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script>
export default {
  name: "ChartA2",
  components: {},
  data() {
    return {};
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    myEcharts() {
      var myChart = this.$echarts.init(document.getElementById("main"));
      //配置图表

      var option = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  series: [
    {
      name: 'Pressure',
      type: 'gauge',
      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}'
      },
      data: [
        {
          value: 50,
          name: 'SCORE'
        }
      ]
    }
  ]
};
      myChart.setOption(option);
    },
  },
  mounted() {
    this.myEcharts();
  },
};
</script>