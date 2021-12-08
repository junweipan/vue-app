import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  var qs_data = qs.stringify({
    ...data
    })
  return request({
    url: 'https://localhost/login/check',
    // url: '/vue-admin-template/user/login',
    method: 'post',
    data: qs_data
  })
}

export function getCaptcha() {
  return request({
    url: 'https://localhost/captcha/get',
    // url: '/vue-admin-template/user/login',
    method: 'get',
  })
}

