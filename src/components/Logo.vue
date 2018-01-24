<template>
  <div class="logo"
    :class="[
      size ? size : ''
    ]"
    >
    <img src="../assets/logo.svg" alt="TebakTroopers">
  </div>
</template>

<script>
  export default {
    props: {
      size: String
    }
  }
</script>

<style lang="scss" scoped>
.logo {
  width: 400px;
  max-width: 100%;
  margin: 0 auto 24px;
  padding: 0 15px;

  &.small {
    width: 280px;
  }

  img {
    width: 100%;
  }
}
</style>
