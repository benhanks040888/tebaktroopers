<template>
  <div class="container">
    <div class="game">
      <div v-if="!gameFinished">
        <div class="scoreboard">
          <Avatar :user="user" />
          <div class="score-container">Score: <strong class="score">{{ answerCount }}</strong></div>
        </div>

        <div class="photo">
          <transition appear name="fade" mode="out-in">
            <img class="img-fluid" :key="currentQuestion.id" :src="photoUrl">
          </transition>
        </div>

        <div class="options">
          <button type="button" class="btn btn-outline-mrm" @click="onAnswer(option.id)" v-for="option in options" :key="option.id">{{option.name}}</button>
        </div>
      </div>

      <result-page v-if="gameFinished"></result-page>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import utils from '../utils'

import Avatar from './Avatar'
import ResultPage from './ResultPage'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'game',
  components: {
    Avatar,
    ResultPage,
    FontAwesomeIcon
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!vm.user) {
        next('/')
      }

      next()
    })
  },
  computed: {
    ...mapGetters([
      'user',
      'questions',
      'answerCount',
      'totalQuestions',
      'currentQuestion',
      'options',
      'didWin',
      'gameFinished'
    ]),
    photoUrl () {
      if (!this.currentQuestion.image) {
        return undefined
      }

      return utils.isProduction
            ? 'https://res.cloudinary.com/hendrasusanto/image/upload/w_300,h_300,c_thumb,g_face/' + 'troopers/' + this.currentQuestion.image
            : 'static/troopers/' + this.currentQuestion.image
    },
    insult () {
      let insults = [
        'Kok lu gak tau nama gua sih?',
        'Gua kira kita temen...',
        '...',
        'Sedih banget...',
        'Cukup tau aja.'
      ]
      let randomNumber = Math.floor(Math.random() * insults.length)
      console.log(randomNumber)
      return insults[randomNumber]
    }
  },
  created () {
    this.initializeQuestions(() => {
      this.initializeGame()
    })
  },
  methods: {
    ...mapActions([
      'initializeQuestions',
      'initializeGame',
      'setCurrentQuestion',
      'increaseAnswerCount',
      'setOptions',
      'finishGame',
      'saveScore',
      'playSound'
    ]),
    onAnswer (id) {
      if (id === this.currentQuestion.id) {
        this.increaseAnswerCount()

        if (this.answerCount === this.totalQuestions) {
          this.playSound('win')
          this.endGame()
        } else {
          this.playSound('correct')
          this.setCurrentQuestion(this.questions[this.answerCount])
          this.setOptions()
        }
      } else {
        this.playSound('wrong')
        this.endGame()
      }
    },
    endGame () {
      this.saveScore()
      this.finishGame()
    }
  }
}
</script>

<style lang="scss">
.game {
  position: relative;
}

.scoreboard {
  border-bottom: 1px solid #eee;
  display: flex;
  padding-bottom: 15px;
  justify-content: space-between;

  @media (min-width: 576px) {
    position: absolute;
    top: 0;
    right: 0;
    border-bottom: none;
    flex-direction: column;
    align-items: center;
  }
}

.score-container {
  @media (min-width: 576px) {
    background: #54216f;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px 15px;
    margin-top: 5px;

    .score {
      color: #fff;
      font-size: 28px;
    }
  }
}

.score {
  color: #54216f;
}

.photo {
  height: 300px;
  margin-bottom: 16px;
  text-align: center;

  img {
    height: 100%;
  }

  &.no-margin {
    margin-bottom: 0;
  }

  &.full {
    width: 100%;
    height: auto;

    img {
      width: 100%;
      height: auto;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: .5em;
}
</style>
