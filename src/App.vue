<template>
  <div id="app">
    <div class="logo">
      <img src="./assets/logo.svg" alt="TebakTroopers">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  color: #323334;
}

#app {
  max-width: 600px;
  margin-top: 50px;
  text-align: center;
}
</style>
