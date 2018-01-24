<template>
  <div class="loader">
    <font-awesome-icon :icon="['fal', 'spinner']" spin fixed-width />
    <span>{{ text }}</span>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    text: {
      type: String,
      default: 'Loading...'
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  font-family: 'Lato', serif;
  position: relative;
  font-size: 24px;
  animation: blink 2s ease-in-out infinite forwards;
  text-align: center;
}

@keyframes blink {
  0%, 100% {
    opacity: 0;
  }
  40%, 60% {
    opacity: 1;
  }
}
</style>
