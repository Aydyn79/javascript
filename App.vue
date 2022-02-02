<template>
  <div id="nav">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('loadShowcase'),
    this.$store.dispatch('loadCart')
    // this.$store.dispatch('addToCart'),
    // this.$store.dispatch('removeFromCart')
  }
};
</script>

<style lang="css">
</style>
