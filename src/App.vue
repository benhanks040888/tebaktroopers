<template>
  <div id="app">
    <Logo :class="{'small': thisRouteName !== 'MainMenu'}" />
    <router-view/>
  </div>
</template>

<script>
import Logo from './components/Logo'
import store from './store'

export default {
  name: 'app',
  components: {
    Logo
  },
  computed: {
    thisRouteName () {
      return store.state.route.name
    }
  },
  created () {
    console.log(store.state.route)
  }
}
</script>

<style lang="scss">
body {
  font-family: 'Lato', sans-serif;
  color: #323334;
}

#app {
  max-width: 600px;
  margin: 50px auto;
}
</style>
