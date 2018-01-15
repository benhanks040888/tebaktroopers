import api from '../../api/app'
import * as types from '../mutation-types'

const state = {
  questions: []
}

const getters = {
  questions: state => state.questions
}

const actions = {
  initializeQuestions ({ commit }, callback) {
    api.get('static/people.json', response => {
      let questions = response.data
      console.log(questions)

      commit(types.SET_QUESTIONS, { questions })
      callback()
    })
  }
}

const mutations = {
  [types.SET_QUESTIONS] (state, { questions }) {
    state.questions = questions
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
