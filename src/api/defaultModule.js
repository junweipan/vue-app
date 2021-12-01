import service from '@/utils/request'
import qs from 'qs'

export default {

    // 条件查询fun列表 
    getfun(query) {
        var qs_data = qs.stringify({
             ...query
         })
        return service({ // Promise
            url:'https://localhost/fun/query',
            method: 'post',
            data: qs_data
        })
    }
}