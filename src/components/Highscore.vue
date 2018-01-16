<template>
  <div class="highscore">
    <h1>High Scores</h1>
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
          <td>{{ score.name || '' }}</td>
          <td>{{ score.score }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <h3>Loading...</h3>
    </div>
    <router-link to="/" class="btn btn-primary">Back to Main Menu</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'highscore',
  computed: {
    ...mapGetters([
      'highScores'
    ])
  },
  mounted () {
    this.getHighScores()
  },
  methods: {
    ...mapActions([
      'getHighScores'
    ])
  }
}
</script>
