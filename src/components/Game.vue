<template>
  <div class="game">
    <div v-if="!gameFinished">
      <p><strong>{{ user }}</strong></p>
      <p>Score: <strong><span class="highlight">{{ answerCount }}</span>/{{ totalQuestions }}</strong></p>

      <transition appear name="fade">
        <img :src="logoUrl" class="photo mb-2">
      </transition>

      <!-- <transition-group name="fade" tag="div" class="options"> -->
      <div class="options">
        <button type="button" class="btn btn-outline-primary" @click="onAnswer(option.id)" v-for="option in options" :key="option.id">{{option.name}}</button>
      </div>
      <!-- </transition-group> -->
    </div>

    <div v-if="gameFinished">
      <h1>Game ends!</h1>
      <p><strong>{{ user }}</strong>, you get <span class="highlight">{{ answerCount }}</span>/{{ totalQuestions }}</strong></p>

      <button type="button" class="btn btn-outline-primary" @click="initializeGame" >Restart Game</button>

      <router-link to="highscore" class="btn btn-primary">See High Scores</router-link>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'game',
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
      'gameFinished'
    ]),
    logoUrl () {
      if (!this.currentQuestion.image) {
        return undefined
      }

      return 'static/people/' + this.currentQuestion.image
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
      'saveScore'
    ]),
    onAnswer (id) {
      if (id === this.currentQuestion.id) {
        this.increaseAnswerCount()
        if (this.answerCount === this.totalQuestions) {
          this.endGame()
        } else {
          this.setCurrentQuestion(this.questions[this.answerCount])
          this.setOptions()
        }
      } else {
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

<style>
.highlight {
  color: #41B883;
}

.photo {
  max-width: 300px;
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
