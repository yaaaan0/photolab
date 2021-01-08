import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      account: '',
      name: '',
      email: '',
      phoneNumber: '',
      orders: []
    }

  },
  mutations: {
    login (state, data) {
      state.user.id = data._id
      state.user.account = data.account
      state.user.name = data.name
      state.user.email = data.email
      state.user.phoneNumber = data.phoneNumber
      state.user.orders = data.orders
    },
    logout (state) {
      state.user.id = ''
      state.user.account = ''
      state.user.name = ''
      state.user.email = ''
      state.user.phoneNumber = ''
      state.user.orders = ''
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
