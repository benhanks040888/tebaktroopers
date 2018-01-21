<template>
  <div class="main-menu">
    <h1>TebakTroopers</h1>
    <p>Gotta tebak 'em all!</p>

    <div class="form-group">
      <input type="text" v-model="name" class="form-control" placeholder="Input your name" @change="setUser(name)">
    </div>

    <router-link to="game" class="btn btn-primary btn-block" :class="{ disabled: !user }">Start</router-link>
    <router-link to="highscore" class="btn btn-primary btn-link mt-2">See High Scores</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainMenu',
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    name: {
      get () {
        return this.user
      },
      set (newName) {
        this.setUser(newName)
      }
    }
  },
  methods: {
    ...mapActions([
      'setUser'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
