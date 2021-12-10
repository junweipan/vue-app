import request from '@/utils/request'
import qs from 'qs'


const baseUrl = 'https://localhost:443'
export function login(data) {
  var qs_data = qs.stringify({
    ...data
    })
  return request({
    url: baseUrl + '/login/check',
    // url: '/vue-admin-template/user/login',
    method: 'post',
    data: qs_data
  })
}

export function getCaptcha() {
  return request({
    url: baseUrl+ '/captcha/get',
    // url: '/vue-admin-template/user/login',
    method: 'get',
  })
}


export function changePassword(userKey,oldSecret,newSecret) {
  var qs_data = qs.stringify({
    userKey,
    oldSecret,
    newSecret
    })

  return request({
    url: baseUrl + '/user/changeSecret',
    method: 'post',
    data: qs_data
  })
}

