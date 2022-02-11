import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const Operator = "operator"
const RoleID = 'roleId'
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


export function removeRoleID() {
  return Cookies.remove(RoleID)
}
export function getRoleID() {
  return Cookies.get(RoleID)
}

export function setRoleID(roleId) {
  return Cookies.set(RoleID, roleId)
}



