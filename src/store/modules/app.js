import api from '../../api/app'
import * as types from '../mutation-types'

const state = {
  questions: [],
  answerCount: 0,
  totalQuestions: 0,
  currentQuestion: {},
  gameFinished: false,
  highScores: [],
  options: []
}

const getters = {
  questions: state => state.questions,
  answerCount: state => state.answerCount,
  didWin: state => state.answerCount !== 0 && state.answerCount === state.totalQuestions,
  totalQuestions: state => state.totalQuestions,
  currentQuestion: state => state.currentQuestion,
  options: state => state.options,
  gameFinished: state => state.gameFinished,
  highScores: state => state.highScores
}

const actions = {
  initializeQuestions ({ commit }, callback) {
    api.getQuestions((error, response) => {
      if (error) {
        console.log(error)
        return
      }

      let questions = response.data

      commit(types.SET_QUESTIONS, { questions })
      callback()
    })
  },

  initializeGame ({ commit, state }) {
    const questions = api.generateIDs(api.shuffle(state.questions))
    const answerCount = 0
    const totalQuestions = questions.length
    const currentQuestion = questions[0]
    const options = api.getAnswerOptions(questions, totalQuestions, currentQuestion)

    commit(types.SET_QUESTIONS, { questions })
    commit(types.SET_TOTAL_QUESTIONS, { totalQuestions })
    commit(types.SET_ANSWER_COUNT, { answerCount })
    commit(types.SET_CURRENT_QUESTION, { currentQuestion })
    commit(types.SET_OPTIONS, { options })
    commit(types.START_GAME)
  },

  setOptions ({ commit, state }) {
    const options = api.getAnswerOptions(state.questions, state.totalQuestions, state.currentQuestion)
    commit(types.SET_OPTIONS, { options })
  },

  setCurrentQuestion ({ commit }, currentQuestion) {
    commit(types.SET_CURRENT_QUESTION, { currentQuestion })
  },

  increaseAnswerCount ({ commit }) {
    commit(types.INCREASE_ANSWER_COUNT)
  },

  finishGame ({ commit }) {
    commit(types.FINISH_GAME)
  },

  saveScore ({ commit, rootState, state }, callback) {
    api.saveHighScore({
      user: rootState.user.user,
      score: state.answerCount
    }, (error, response) => {
      if (error) {
        console.log(error)
        return
      }

      console.log(response)
      if (callback) {
        callback()
      }
    })
  },

  getHighScores ({ commit }, callback) {
    api.getHighScores((error, response) => {
      if (error) {
        console.log(error)
        return
      }

      let highScores = response.data

      commit(types.SET_HIGH_SCORES, { highScores })

      if (callback) {
        callback()
      }
    })
  }
}

const mutations = {
  [types.SET_QUESTIONS] (state, { questions }) {
    state.questions = questions
  },

  [types.SET_TOTAL_QUESTIONS] (state, { totalQuestions }) {
    state.totalQuestions = totalQuestions
  },

  [types.SET_ANSWER_COUNT] (state, { answerCount }) {
    state.answerCount = answerCount
  },

  [types.SET_CURRENT_QUESTION] (state, { currentQuestion }) {
    state.currentQuestion = currentQuestion
  },

  [types.SET_OPTIONS] (state, { options }) {
    state.options = options
  },

  [types.INCREASE_ANSWER_COUNT] (state) {
    state.answerCount++
  },

  [types.SET_HIGH_SCORES] (state, { highScores }) {
    state.highScores = highScores
  },

  [types.START_GAME] (state) {
    state.gameFinished = false
  },

  [types.FINISH_GAME] (state) {
    state.gameFinished = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
