<template>
  <div class="main-menu">
    <h1>TebakTroopers</h1>

    <router-link to="game" class="btn btn-primary btn-block">Start</router-link>
    <router-link to="highscore" class="btn btn-primary btn-block">High Scores</router-link>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
