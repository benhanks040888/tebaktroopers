<template>
  <div class="main-screen">
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <rule-card />
        </div>
        <div class="col-sm">
          <div class="py-3">
            <div class="form-group">
              <input type="text" v-model="name" class="form-control" placeholder="What's your name?" @change="setUser(name)">
            </div>

            <router-link to="game" class="btn btn-mrm btn-block" :class="{ disabled: !user }">Start</router-link>

            <div class="text-center mt-3">
              <router-link to="highscore" class="btn btn-link-mrm">
                <font-awesome-icon :icon="['fal', 'trophy-alt']" fixed-width /> See High Scores
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RuleCard from './RuleCard'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'MainMenu',
  data () {
    return {
    }
  },
  components: {
    RuleCard,
    FontAwesomeIcon
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
<style lang="scss">
.main-screen {
  margin-top: 3em;
}
.btn {
  transition: all ease .4s;
}
</style>
