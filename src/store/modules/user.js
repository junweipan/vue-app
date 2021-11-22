import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getUserInfo } from '@/utils/auth'
import { resetRouter } from '@/router'



const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
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
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userKey: username.trim(), userSecret: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data) //存入 store
        setToken(data) // 存入cookie
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 根据Cookie中的token, 解析出用户姓名, 头像
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      //   const { data } = response

      //   if (!data) {
      //     return reject('Verification failed, please Login again.')
      //   }

      //   const { name, avatar } = data

      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
      // getUserInfo 返回浏览器中的Cookie对象 (json)
      var UserInfo = getUserInfo()
      const { userKey, headUrl } = JSON.parse(UserInfo)
      // console.log('UserInfo',UserInfo)
      // console.log('userKey',userKey)
      // console.log('headUrl',headUrl)
      commit('SET_NAME', userKey)
      commit('SET_AVATAR', headUrl)
      resolve(JSON.parse(UserInfo))
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

