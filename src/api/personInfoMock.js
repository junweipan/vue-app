import service from '@/utils/request'
import qs from 'qs'

const baseUrl = 'http://localhost:8080'
export default {

    // 分页条件查询分类列表 
    getPersonInfo(query, current = 1, size = 20) {
        var qs_data = qs.stringify({
             ...query,
             "pagesize":size,
             "curpage":current
         })
        return service({ // Promise
            url: baseUrl + '/dev-api/getMockPersonInfo',
            // url: '/getMockPersonInfo', //  /dev-api/test
            method: 'post',
            data: qs_data
        })
    },
    getPersonInfoById(query) {
        var qs_data = qs.stringify({
             ...query,
         })
        return service({ // Promise
            url: baseUrl + '/dev-api/getMockPersonInfoById',
            // url: '/getMockPersonInfo', //  /dev-api/test
            method: 'post',
            data: qs_data
        })
    },
}