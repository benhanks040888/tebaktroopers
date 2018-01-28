<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-6">
        <div class="highscore">
          <div v-if="isLoading">
            <Loader />
          </div>
          <div v-else>
            <transition appear name="fade" mode="out-in">
              <h2 class="page-heading">High Scores</h2>
            </transition>
            <transition appear name="fade" mode="out-in">
              <div v-if="highScores.length > 0">
                <div v-for="(score, index) in highScores" class="leaderboard-item" :class="{ 'first-place' : index == 0 }">
                  <span class="leaderboard-item-icon" v-if="index == 0">
                    <font-awesome-icon :icon="['fal', 'trophy-alt']" fixed-width/>
                  </span>
                  <span class="leaderboard-item-number">
                    {{ index+1 }}
                  </span>
                  <span class="leaderboard-item-avatar">
                    <Avatar :user="score.name" />
                  </span>
                  <span class="leaderboard-item-score">{{ score.score }}</span>
                </div>
              </div>
              <div v-if="highScores.length == 0">
                <p>There are no high scores yet. You could be the first one to chart here!</p>
              </div>
            </transition>
          </div>

          <div class="mt-4 text-center">
            <router-link to="/" class="btn btn-outline-mrm"><font-awesome-icon :icon="['fal', 'chevron-left']" fixed-width /> Back to Main Menu</router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Avatar from './Avatar'
import Loader from './Loader'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'highscore',
  data () {
    return {
      isLoading: true
    }
  },
  components: {
    Avatar,
    Loader,
    FontAwesomeIcon
  },
  computed: {
    ...mapGetters([
      'highScores'
    ])
  },
  mounted () {
    this.getHighScores(() => {
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions([
      'getHighScores'
    ])
  }
}
</script>

<style lang="scss">
.page-heading {
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 3px;
  font-size: 28px;
  text-align: center;
}

.leaderboard-item {
  position: relative;
  border-radius: 4px;
  padding: 10px 15px;
  background: #fff;
  box-shadow:
    0 4px 8px 0 rgba(0,0,0,0.12),
    0 2px 4px 0 rgba(0,0,0,0.08);
  text-align: left;
  margin-bottom: .5em;
  display: flex;
  align-items: center;
  font-weight: bold;

  &.first-place {
    background: #54216f;
    color: #fff;

    .user-avatar img {
      animation: bounce 2s ease-in-out infinite forwards;
    }

    .leaderboard-item-score {
      font-size: 1.5em;
      width: auto;
    }
  }

  &-number {
    margin: 0 10px;
    font-weight: bold;
    line-height: 1;
    min-width: 20px;
    text-align: right;
  }

  &-avatar {
    display: flex;
    align-items: center;

    img {
      margin-right: 5px;
    }
  }

  &-score {
    margin-left: auto;
    background: #54216f;
    font-weight: bold;
    color: #fff;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 50px;
    line-height: 30px;
  }

  &-icon {
    position: absolute;
    left: 10px;
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  10%, 30% {
    transform: translateY(-4px);
  }
  20%, 40% {
    transform: translateY(0);
  }
}
</style>
