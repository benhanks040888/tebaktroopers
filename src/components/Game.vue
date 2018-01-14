<template>
  <div class="game">
    <h1>{{ user }}, do you know this trooper's name?</h1>
    
    <transition appear name="fade">
      <img :src="logoUrl">
    </transition>
    
    <transition-group name="fade" tag="div" class="options">
      <button type="button" class="btn btn-outline-primary" @click="onOptionClicked(option.id)" v-for="option in currentQuestion.options" :key="option.id">{{option.name}}</button>
    </transition-group>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Game',
  data () {
    return {
      currentQuestion: {
        image: '',
        id: '',
        options: []
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!vm.user) {
        next('/')
      }

      next()
    })
  },
  methods: {
    onOptionClicked (id) {
      if (id === this.currentQuestion.id) {
        console.log('You are correct!')
      } else {
        console.log('Bzzt! You are wrong!')
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    logoUrl () {
      if (!this.currentQuestion.image) {
        return undefined
      }

      return '../static/assets/images/' + this.currentQuestion.image
    }
  },
  mounted () {
    this.currentQuestion.image = 'logo.png'
    this.currentQuestion.id = '1'
    this.currentQuestion.options = [
      {
        'id': '1',
        'name': 'A'
      },
      {
        'id': '2',
        'name': 'B'
      },
      {
        'id': '3',
        'name': 'C'
      },
      {
        'id': '4',
        'name': 'D'
      }
    ]
  }
}
</script>

<style>
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