import request from '@/utils/request'
import qs from 'qs'


const baseUrl = 'http://10.100.98.221/MainConsole'
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
    url: baseUrl+ '/system/validateCode',
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

