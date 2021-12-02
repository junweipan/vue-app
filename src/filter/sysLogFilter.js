import Vue from 'vue'


// System log 

const logTypeVT = {"0":'系统日志',"1":'业务日志'} 

const opTypeVT = {
"0":"增加",
"1":"硬删除",
"2":"软删除",
"3":"修改",
"4":"查询",
"5":"登录",
"6":"登出",
"7":"导入",
"8":"导出",
"9":"提交",
"10":"'退回",
"11":"重置" }
  
const funTypeVT = {
  "0":"模块",
  "1":"一级分组",
  "2":"二级分组",
  "3":"菜单功能",
  "4":"操作功能"
}

Vue.filter('logTypeFormat', function (value) {
  return logTypeVT[parseInt(value)]
})


Vue.filter('opTypeFormat', function (value) {
    return opTypeVT[parseInt(value)]
  })

  Vue.filter('funTypeFormat', function (value) {
    return funTypeVT[parseInt(value)]
  })

