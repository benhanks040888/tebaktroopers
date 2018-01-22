<template>
  <div class="highscore">
    <h1>High Scores</h1>
    <div v-if="isLoading">
      <h3>Loading...</h3>
    </div>
    <div v-else>
      <table class="table text-left" v-if="highScores.length > 0">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(score, index) in highScores" :class="{ 'table-primary' : index == 0 }">
            <td>#{{ index+1 }}</td>
            <td><img :src="`https://robohash.org/${score.name}?set=set4&size=20x20`" /> {{ score.name || '' }}</td>
            <td>{{ score.score }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="highScores.length == 0">
        <h3>There are no high scores yet. You could be the first one to chart here!</h3>
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
