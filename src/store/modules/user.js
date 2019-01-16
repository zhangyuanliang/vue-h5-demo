import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    identity: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_IDENTITY: (state, identity) => {
      state.identity = identity
    }
  },

  actions: {
    // 登录
    login({ commit }, token) {
      setToken(token)
      commit('SET_TOKEN', token)
    },
    // 登出
    logOut({ commit, state }) {
      commit('SET_TOKEN', '')
      removeToken()
    },
    setUser({ commit }, user) {
      commit('SET_NAME', user.name)
      commit('SET_IDENTITY', user.identify)
    }
  }
}

export default user