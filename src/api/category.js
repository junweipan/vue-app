import request from '@/utils/request'

export default {

    // 分页条件查询分类列表 
    getList(query, current = 1, size = 20) {
        return request({ // Promise
            url: `/article/category/search`,
            method: 'post',
            data: { // {name: '前端', status: 1, current: current, size: size}
                ...query,
                current,
                size
            }
        })
    },

    add( data ) {
        return request({
            url: `/article/category`,
            method: 'post',
            data: data
        })
    },

    // 查询类别详情
    getById( id ) {
        return request({
            url: `/article/category/${id}`,
            method: 'get'
        })
    },

    // 更新
    update(data) {
        return request({
            url: `/article/category`,
            method: 'put',
            data
        })
    },

    // 删除
    deleteById(id) {
        return request({
            url: `/article/category/${id}`,
            method: 'delete'
        })
    },

    // 查询正常状态的分类
    getNormalList() {
        return request({
            url: `/article/list/category`,
            method: 'get'
        })
    },

    // 获取所有正常状态下的分类和标签
    getCategoryAndLabel() {
        return request({
            url: `/article/category/label/list`,
            method: 'get'
        })
    }
}