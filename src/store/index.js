import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      id: ''
    }

  },
  mutations: {
    login (state, data) {
      state.user.name = data.account
      state.user.id = data._id
    },
    logout (state) {
      state.user.name = ''
      state.user.id = ''
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
