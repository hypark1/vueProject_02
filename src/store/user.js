export default {
  state: {
    currentUser: localStorage.getItem('cdpUser') != null ? JSON.parse(localStorage.getItem('cdpUser')) : null,
    loginError: null,
    processing: false
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError
  },
  mutations: {
    setUser (state, payload) {
      state.currentUser = payload
      state.processing = false
      state.loginError = null
    },
    setLogout (state) {
      state.currentUser = null
      state.processing = false
      state.loginError = null
    },
    setProcessing (state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError (state, payload) {
      state.loginError = payload
      state.currentUser = null
      state.processing = false
    },
    clearError (state) {
      state.loginError = null
    }
  },
  actions: {
    login ({ commit }, payload) {
      if (payload) {
        const item = {
          name: payload.name,
          role: payload.role,
          accessToken: payload.accessToken
        }
        localStorage.setItem('cdpUser', JSON.stringify(item))
        commit('setUser', item)
      } else {
        localStorage.removeItem('cdpUser')
        commit('setError', 'fail')
      }
    },
    logout ({ commit }) {
      localStorage.removeItem('cdpUser')
    }
  }
}
