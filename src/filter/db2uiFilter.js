import Vue from 'vue'

const sexTypeList = ['请选择', '女', '男'];
const eduTypeList = ['请选择', '初中及以下', '高中', '专科', '本科', '硕士', '博士及以上'];
const regTypeList = ['请选择', '农', '非农'];
const bankTypeList = {
  "11":"浙商银行",
  "12":"杭州银行",
  "13":"浙江民泰商业银行",
  "14":"浙江省农村信用社联合社",
  "15":"浙江稠州商业银行",
  "16":"台州银行",
  "17":"绍兴银行",
  "1":"中国银行",
  "2":"农业银行",
  "3":"建设银行",
  "4":"工商银行",
  "5":"邮政储蓄银行",
  "6":"交通银行",
  "7":"浦发银行",
  "8":"中信银行",
  "9":"民生银行",
  "10":"华夏银行"}

// sex 0-女 1-男
Vue.filter('sexFormat', function (value) {
  return sexTypeList[parseInt(value)+1]
})

// edu
Vue.filter('eduFormat', function (value) {
    return eduTypeList[parseInt(value)+1]
  })


// reg
Vue.filter('regFormat', function (value) {
    return regTypeList[parseInt(value)+1]
  })


// bank
Vue.filter('bankFormat', function (value) {
    return bankTypeList[parseInt(value)+1]
  })
