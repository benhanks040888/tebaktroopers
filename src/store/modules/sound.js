import { Howl } from 'howler'
import * as types from '../mutation-types'

const correct = new Howl({
  src: ['static/sounds/correct.mp3', 'static/sounds/correct.ogg'],
  volume: 0.5
})

const wrong = new Howl({
  src: ['static/sounds/wrong.mp3', 'static/sounds/wrong.ogg'],
  volume: 0.5
})

const win = new Howl({
  src: ['static/sounds/win.mp3', 'static/sounds/win.ogg'],
  volume: 0.5
})

const state = {
  sound: window.localStorage.getItem('sound') ? JSON.parse(window.localStorage.getItem('sound')) : true
}

const getters = {
  sound: state => state.sound
}

const actions = {
  playSound ({ commit, state }, type) {
    if (state.sound) {
      switch (type) {
        case 'correct':
          correct.play()
          break
        case 'wrong':
          wrong.play()
          break
        case 'win':
          win.play()
          break
      }
    }
  },

  toggleSound ({ commit }) {
    commit(types.TOGGLE_SOUND)
  }
}

const mutations = {
  [types.TOGGLE_SOUND] (state) {
    state.sound = !state.sound
    window.localStorage.setItem('sound', state.sound)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
