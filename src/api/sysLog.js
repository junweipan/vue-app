import service from '@/utils/request'
import qs from 'qs'
const baseUrl = 'https://localhost'
export default {

    // 分页条件查询分类列表 
    getSysLog(query, current = 1, size = 20) {
        var qs_data = qs.stringify({
             ...query,
             "limit":size,
             "page":current,
             "needPage":true
         })
        return service({ // Promise
            url: baseUrl + '/log/query',
            // url: '/getMockPersonInfo', //  /dev-api/test
            method: 'post',
            data: qs_data
        })
    }
}