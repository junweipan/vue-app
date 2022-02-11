import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const Operator = "operator"
export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeOperator() {
  return Cookies.remove(Operator)
}
export function getOperator() {
  return Cookies.get(Operator)
}

export function setOperator(opr) {
  return Cookies.set(Operator, opr)
}



