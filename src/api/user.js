import request from '@/utils/request'
import qs from 'qs'


const baseUrl = '/ZSADConsole_war_exploded'
export function login({username,password,validateCode}) {
  var formData = new FormData(); // Currently empty
  formData.append('oprid', username);
  formData.append('password', password);
  formData.append('validateCode', validateCode);
  return request({ // Promise
    url: baseUrl + '/system2/login2',
    method: 'post',
    data: formData
  })
}

export function getCaptcha() {
  console.log("getCaptcha")
  return request({
    url: baseUrl + '/system/validateCode',
    method: 'get',
  })
}

export function logout() {
  console.log("logout")
  return request({
    url: baseUrl + '/system/loginout',
    method: 'post',
  })
}

export function getInfo(oprid) {
  var formData = new FormData(); // Currently empty
  formData.append('oprid', oprid);
  return request({
    url: baseUrl + '/system/getopr',
    method: 'post',
    data: formData
  })
}


export function changePassword(userKey, oldSecret, newSecret) {
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

