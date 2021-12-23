<template>
    <div class="Echarts">
        <div id="linechart" style="width: 100%;height: 400px;"></div>
      </div>
</template>

<script>
export default {
  name: 'LineChart',
  components:{
  },
  data() {
    return {
    }
  },
  filters:{
    
  },
  computed:{
  },
  watch: {

  },
  methods: {
    myEcharts(){
      var myChart = this.$echarts.init(document.getElementById('linechart'));
      //配置图表

    var option = {
    title: {
        text: '近一周用户访问量'
    },
    xAxis: {
        type: 'category',
        axisTick: {
            alignWithLabel: true
        },
        data: ['周一', '周二', '周三','周四','周五','周六','周日'],
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            data: [3, 6, 9, 1, 4, 9, 8],
            type: 'line',
            label: {
                show: true,
            }
        }],
    };
      myChart.setOption(option);
    }
  },
    mounted(){
    this.myEcharts();
  },
}
</script>