<template>
    <div class="dashboard-container">
        <div style="display: flex; flex-direction: column; ">
            
            <a href="https://echarts.apache.org/zh/index.html">
            <h2>统计图插件库: Ecahrts</h2>
            </a>
            <a href="https://echarts.apache.org/zh/option.html#title">
            <h2>API 配置文档</h2>
            </a>
        </div>

        <el-row :gutter="20">
            <el-col :span="12">
                <line-chart></line-chart>
            </el-col>
            <el-col :span="12">
                <bar-chart></bar-chart>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="12"> 
                <pie-chart></pie-chart>
            </el-col>
            <el-col :span="12">
                <dot-chart></dot-chart>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import LineChart from './linechart'
import BarChart from './barchart'
import PieChart from './piechart'
import DotChart from './dotchart'
export default {
  name: 'ChartsDemo',
  components:{
    'line-chart': LineChart,
    'bar-chart': BarChart,
    'pie-chart': PieChart,
    'dot-chart': DotChart
  },
    
}
</script>

<style>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>