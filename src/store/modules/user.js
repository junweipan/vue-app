import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { getOperator,removeOperator,setOperator, getRoleID,removeRoleID,setRoleID} from '../../utils/auth'

//后端返回data:
// oprName: 操作员名称
// roleInfoList: 操作员所有的roles
// roleName: 当前的role
// roleType: 当前role的type, 本级02或汇总01
// brhName: 操作员所属机构
const fakeToken = "vue_admin_template_token"
const getDefaultState = () => {
  return {
    token: getToken(),
    operator:{},
    currentRoleID:{},
    avatar: '',
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_OPERATOR: (state, operator) => {
    state.operator = operator
  },
  SET_CURRENT_ROLE_ID: (state, roleId) => {
    state.currentRoleID = roleId
  },
  SET_OPERATOR_ROLE: (state, roleName) => {
    state.operator.roleName = roleName
  }
}
const actions = {
  changeRole({ commit,state }, roleId){
    //刷新cookie和store中的current role ID
    commit('SET_CURRENT_ROLE_ID', roleId)
    setRoleID(roleId)
  },
  login({ commit }, userCredential) {
    return new Promise((resolve, reject) => {
      login(userCredential).then(response => {
        //套了多层data, 后续需要优化
        const {data}  = response.data
        const operator = data
        //operator中的成员
        const { oprId, roleId, oprName, roleInfoList, roleName, roleType, brhName } = operator
        //存入operator -> store
        commit('SET_OPERATOR', operator)
        commit('SET_CURRENT_ROLE_ID', operator.roleId)
        // 存入cookie
        setToken(fakeToken)
        setOperator(operator)
        setRoleID(roleId)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  
  setOperator({ commit, state }){
    commit('SET_OPERATOR', JSON.parse(getOperator()))
  },
  getInfo({ commit, state }) {
    commit('SET_OPERATOR', JSON.parse(getOperator()))
    commit('SET_CURRENT_ROLE_ID', JSON.parse(getRoleID()))
    return new Promise((resolve, reject) => {
      getInfo(state.operator.oprId).then(response => {
        // json data层级有点混乱, 需要优化
        const { data } = response.data
        const operator = data
        if (response.data.code !== 200) {
          return reject('Verification failed, please Login again.')
        }
        const { oprId, roleId, oprName, roleInfoList, roleName, roleType, brhName } = operator
        // 把operator信息存入store
        commit('SET_OPERATOR', operator)
        resolve(state.operator.roleInfoList)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then((response) => {
        console.log(response)
        removeToken() // must remove  token  first
        removeOperator()
        removeRoleID()
        commit('RESET_STATE')
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
      
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

