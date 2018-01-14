import * as types from '../mutation-types'

const state = {
  user: null
}

const getters = {
  user: state => state.user
}

const actions = {
  setUser ({ commit }, user) {
    commit(types.SET_USER, { user })
  }
}

const mutations = {
  [types.SET_USER] (state, { user }) {
    state.user = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
