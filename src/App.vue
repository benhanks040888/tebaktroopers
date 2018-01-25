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
  }
}
</script>

<style lang="scss">
html {
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  min-height: 100vh;
}

body {
  font-family: 'Nunito Sans', sans-serif;
  color: #323334;
  background-color: transparent;
}

#app {
  max-width: 600px;
  margin: 30px auto;
}

.btn-mrm {
  color: #fff;

  &,
  &.disabled,
  &:disabled {
    background-color: #54216f;
    border-color: #54216f;
  }

  &:hover,
  &.active {
    color: #fff;
    background-color: #8e44ad;
    border-color: #8e44ad;
  }
}

.btn-link-mrm {
  font-weight: 400;
  color: #54216f;
  background-color: transparent;
  position: relative;
  padding-left: 0;
  padding-right: 0;

  &:after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 1px;
    transition: all ease .3s;
    background-color: currentColor;
  }

  &:hover {
    color: #54216f;

    &:after {
      width: 100%;
    }
  }
}

.btn-outline-mrm {
  color: #54216f;
  background-color: transparent;
  border-color: #54216f;

  &:hover {
    color: #fff;
    background-color: #54216f;
    border-color: #54216f;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
