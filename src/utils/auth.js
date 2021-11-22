import Cookies from 'js-cookie'
import { Base64 } from 'js-base64'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getUserInfo() {
  return Cookies.get('UserInfo')
}

export function setToken(token) {
  var UserInfo = JSON.parse(Base64.decode(token.split('.')[1])).jwtUser;
  Cookies.set(TokenKey, token)
  // 存入浏览器后变成json类型
  Cookies.set('UserInfo', UserInfo)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


