<template>
  <div class="game">
    <h1>Game Screen</h1>
    
    <transition appear name="fade">
      <img src="../assets/logo.png">
    </transition>

    <button type="button" class="btn btn-outline-primary btn-block">Option 1</button>
    <button type="button" class="btn btn-outline-primary btn-block">Option 2</button>
    <button type="button" class="btn btn-outline-primary btn-block">Option 3</button>
    <button type="button" class="btn btn-outline-primary btn-block">Option 4</button>

  </div>
</template>

<script>
export default {
  name: 'Game',
  data () {
    return {
    }
  },
  methods: {
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
</style>