<template>
  <div class="user-avatar">
    <img :src="`https://robohash.org/${user}?set=set4&size=25x25`" />
    <span>{{ user }}</span>
  </div>
</template>

<script>
export default {
  props: {
    user: {}
  }
}
</script>

<style lang="scss" scoped>
</style>
