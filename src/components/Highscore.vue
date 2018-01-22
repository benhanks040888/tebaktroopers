<template>
  <div class="highscore">
    <h2>High Scores</h2>
    <div v-if="isLoading">
      <h3>Loading...</h3>
    </div>
    <div v-else>
      <div v-if="highScores.length > 0">
        <div v-for="(score, index) in highScores" class="leaderboard-item" :class="{ 'first-place' : index == 0 }">
          <span class="leaderboard-item-number">{{ index+1 }}</span>
          <span class="leaderboard-item-avatar"><img :src="`https://robohash.org/${score.name}?set=set4&size=20x20`" /> {{ score.name || '' }}</span>
          <span class="leaderboard-item-score">{{ score.score }}</span>
        </div>
      </div>
      <div v-if="highScores.length == 0">
        <p>There are no high scores yet. You could be the first one to chart here!</p>
      </div>
    </div>
    <router-link to="/" class="btn btn-primary">Back to Main Menu</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'highscore',
  data () {
    return {
      isLoading: true
    }
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
.leaderboard-item {
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
    background: rgba(#DAA720, .7);
    color: #fff;

    .leaderboard-item-score {
      background: none;
    }
  }

  &-number {
    margin: 0 10px;
    font-weight: bold;
    line-height: 1;
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
    background: #DAA720;
    font-weight: bold;
    color: #fff;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 50px;
    line-height: 30px;
  }
}
</style>
