<template>
  <div class="game">
    <div v-if="!gameFinished">
      <div class="user-avatar">
        <img :src="`https://robohash.org/${user}?set=set4&size=25x25`" /> <strong>{{ user }}</strong>
      </div>
      <p>Score: <strong><span class="highlight">{{ answerCount }}</span>/{{ totalQuestions }}</strong></p>

      <div class="photo mb-2">
        <transition appear name="fade" mode="out-in">
          <img :key="currentQuestion.id" :src="logoUrl">
        </transition>
      </div>

      <!-- <transition-group name="fade" tag="div" class="options"> -->
      <div class="options">
        <button type="button" class="btn btn-outline-primary" @click="onAnswer(option.id)" v-for="option in options" :key="option.id">{{option.name}}</button>
      </div>
      <!-- </transition-group> -->
    </div>

    <div v-if="gameFinished">
      <h1>Game ends!</h1>
      <p><strong>{{ user }}</strong>, you get <span class="highlight">{{ answerCount }}</span>/{{ totalQuestions }}</strong></p>

      <div class="score">
        {{ answerCount }}
      </div>

      <router-link to="highscore" class="btn btn-link">See High Scores</router-link>

      <hr>

      <button type="button" class="btn btn-outline-primary" @click="initializeGame">Play Again</button>


    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import utils from '../utils'

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

      return utils.isProduction
            ? 'https://res.cloudinary.com/hendrasusanto/image/upload/w_200,h_200,c_thumb,g_face/' + 'tebaktroopers/' + this.currentQuestion.image
            : 'static/troopers/' + this.currentQuestion.image
    }
  },
  created () {
    console.log(utils)
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
        this.playSound('correct')
        this.increaseAnswerCount()

        if (this.answerCount === this.totalQuestions) {
          this.endGame()
        } else {
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

<style>
.highlight {
  color: #41B883;
}

.photo {
  height: 200px;
}

.photo img {
  height: 100%;
}

.score {
  color: #fff;
  background: #47A13F;
  margin: 1em auto;
  border-radius: 100%;
  width: 80px;
  height: 80px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
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
