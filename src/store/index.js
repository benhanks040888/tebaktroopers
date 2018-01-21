import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import sound from './modules/sound'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    sound
  }
})
