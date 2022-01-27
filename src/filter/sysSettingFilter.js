import Vue from 'vue'


// role filter
const roleStatus = { "0": '正常', "1": '注销' }
const roleType = {
    "01": "汇总",
    "02": "本级",
}

Vue.filter('roleStatusFormat', function (value) {
    return roleStatus[value]
})


Vue.filter('roleTypeFormat', function (value) {
    return roleType[value]
})


//Branch filter
const branchStatus = { "0": '停用', "1": '启用' }
const branchType = {
    "00": "集体本级",
    "01": "一级子公司",
    "02": "二级子公司",
    "03": "三级子公司",
}
const upBranchId = {
    "0001": "0001-舟山海城建设投资集团有限公司",
    "0012": "0012-舟山海城置业有限公司",
    "0013": "0013-舟山海城建设有限公司",
    "0015": "0015-舟山海城投资有限公司",
}

Vue.filter('branchStatusFormat', function (value) {
    return branchStatus[value]
})

Vue.filter('branchTypeFormat', function (value) {
    return branchType[value]
})

Vue.filter('upBranchIdFormat', function (value) {
    return upBranchId[value]
})


// operator filter
const operatorStatus = { "0": '正常', "1": '注销',"2":'初始化' }

Vue.filter('operatorStatusFormat', function (value) {
    return `${operatorStatus[value]}`
})


Vue.filter('datetitimeFormat', function(input, pattern = ''){
    let datetime = new Date(input);
    // 获取年月日
    let year = datetime.getFullYear();
    let month = (datetime.getMonth() + 1).toString().padStart(2, '0');
    let day = datetime.getDate().toString().padStart(2, '0');
    // 获取时分秒
    let hh = datetime.getHours().toString().padStart(2, '0');
    let mm = datetime.getMinutes().toString().padStart(2, '0');
    let ss = datetime.getSeconds().toString().padStart(2, '0');
    // 如果传递进来的字符串类型，转为小写之后，等于yyyy-mm-dd,就返回年-月-日
    // 否则返回 年-月-日 时:分:秒
    if(pattern.toLowerCase() === 'yyyy-mm-dd'){
        return `${year}-${month}-${day}`;
    }else{
        // ES6语法
        return  `${year}-${month}-${day} ${hh}:${mm}:${ss}`
    }
})