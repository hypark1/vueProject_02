import Vue from 'vue'
import Vuex from 'vuex'

import xhttp from './xhttp'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
    drawer: null,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://api-dev.redpp.co.kr' : 'http://api.aiinfeed.com'
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_SCRIM (state, payload) {
      state.barColor = payload
    }
  },
  actions: {

  },
  modules: {
    xhttp,
    user,
  }
})
