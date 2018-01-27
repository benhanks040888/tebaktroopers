<template>
  <div class="row">
    <div class="col-sm">
      <div v-if="!didWin">
        <div class="photo full no-margin">
          <transition appear name="fade">
            <img :key="currentQuestion.id" :src="photoUrl">
          </transition>
        </div>
        <div class="insult-container">
          <p>My name is <strong>{{ currentQuestion.name }}</strong>.</p>
          <div class="insult-quote">
            &ldquo;{{ insult }} <font-awesome-icon :icon="['fal', 'frown']" fixed-width />&rdquo;
            <br>— <small><em>{{ currentQuestion.name }}</em></small>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="photo full no-margin">
          <transition appear name="fade">
            <img src="https://media.giphy.com/media/xNBcChLQt7s9a/giphy.gif" alt="FTW Win!">
          </transition>
        </div>
        <div class="insult-container">
          <div class="insult-quote">
            &ldquo;Kamu HRD ya? Hebat! <font-awesome-icon :icon="['fal', 'smile']" fixed-width />&rdquo;
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-5">
      <div class="pt-2 text-center text-sm-left">
        <p><strong>{{ user }}</strong>, your score is <strong class="score">{{ answerCount }}</strong></p>
        <p><button type="button" class="btn btn-mrm" @click="initializeGame"><font-awesome-icon :icon="['fal', 'repeat']" fixed-width /> Play Again</button></p>

        <router-link to="highscore" class="btn btn-sm btn-link-mrm"><font-awesome-icon :icon="['fal', 'trophy-alt']" fixed-width /> See High Scores</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import utils from '../utils'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'result-page',
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      insults: [
        'Kok lu gak tau nama gua sih?',
        'Gua kira kita temen...',
        '...',
        'Sedih banget...',
        'Cukup tau aja.'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'answerCount',
      'currentQuestion',
      'didWin'
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
      let randomNumber = Math.floor(Math.random() * this.insults.length)
      console.log(randomNumber)
      return this.insults[randomNumber]
    }
  },
  methods: {
    ...mapActions([
      'initializeGame'
    ])
  }
}
</script>

<style lang="scss">
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

.insult-container {
  text-align: center;
  background: #eaeaea;
  padding: 10px;
}

.insult-quote {
  font-family: 'Libre Baskerville', serif;
  font-style: italic;
  font-size: 20px;
}
</style>
