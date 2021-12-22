import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getUserInfo } from '@/utils/auth'
import { resetRouter } from '@/router'



const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    // mock user info db
    userInfo:{
      users: [{
        id:'1',
        client: '舟山市规划建筑设计院有限公司',
        level: '本级',
        type:'success',
        autority:'开发人员'
      }, {
        id:'2',
        client: 'XXXX有限公司',
        level: '一级',
        type:'info',
        autority:'普通用户'
      },
      {
        id:'3',
        client: 'YYYY有限公司',
        level: '二级',
        type:'info',
        autority:'开发人员'
      }]
    }
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
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  //  用户登录后获得其路由表
  // getRoutes() {
  //   return new Promise((resolve, reject) => {
  //     getRoutes().then(response => {
  //       const { data } = response
  //       // format routes
  //       var formatRoutes = {}

  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
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
      // 整体打包个人信息,用于前端展示和修改
      const userInfo = JSON.parse(UserInfo)
      // console.log('UserInfo',UserInfo)
      // console.log('userKey',userKey)
      // console.log('headUrl',headUrl)
      commit('SET_NAME', userKey)
      commit('SET_AVATAR', headUrl)
      commit('SET_USERINFO',userInfo)
      resolve(userInfo)
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

