import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

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
    oprName: '',
    brhName: '',
    avatar: '',
    roles: null,
    currentRoleId:'',
    currentRoleName: '',
    currentRoleType: '',

    // 默认当前用户
    currentUser: {
      id: '1',
      client: '舟山市规划建筑设计院有限公司',
      level: '本级',
      type: 'success',
      autority: '开发人员'
    },
    // mock user info db
    usersdb: [{
      id: '1',
      client: '舟山市规划建筑设计院有限公司',
      level: '本级',
      type: 'success',
      autority: '开发人员'
    }, {
      id: '2',
      client: 'XXXX有限公司',
      level: '一级',
      type: 'info',
      autority: '普通用户'
    }]
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
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_OPR_NAME: (state, oprName) => {
    state.oprName = oprName
  },
  SET_BRH_NAME: (state, brhName) => {
    state.brhName = brhName
  },
  SET_CURRENT_ROLE_ID: (state, currentRoleId) => {
    state.currentRoleId = currentRoleId
  },
  SET_CURRENT_ROLE_NAME: (state, currentRoleName) => {
    state.currentRoleName = currentRoleName
  },
  SET_CURRENT_ROLE_TYPE: (state, currentRoleType) => {
    state.currentRoleType = currentRoleType
  },
  SET_CURRENTUSER: (state, currentUser) => {
    state.currentUser = currentUser
  },
  SET_USERSDB: (state, usersdb) => {
    state.usersdb = usersdb
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}
const actions = {
  switchCurrentUser({ commit, state }, userId) {
    const user = state.usersdb.find((user) => {
      return user.id == userId
    })
    commit('SET_CURRENTUSER', user)
  },

  login({ commit }, userCredential) {
    return new Promise((resolve, reject) => {
      login(userCredential).then(response => {
        //套了多层data, 后续需要优化
        const { data } = response.data
        const { roleId, oprName, roleInfoList, roleName, roleType, brhName } = data

        //存入 store
        commit('SET_OPR_NAME', oprName)
        commit('SET_ROLES', roleInfoList)
        commit('SET_CURRENT_ROLE_ID', roleId)
        commit('SET_CURRENT_ROLE_NAME', roleName)
        commit('SET_CURRENT_ROLE_TYPE', roleType)
        commit('SET_BRH_NAME', brhName)

        // 存入cookie
        setToken(fakeToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // const { data } = response

        // if (!data) {
        //   return reject('Verification failed, please Login again.')
        // }

        // const { oprName, roleInfoList, roleName, roleType, brhName } = data

        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        resolve(state.roles)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
      console.log('logout')
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
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

