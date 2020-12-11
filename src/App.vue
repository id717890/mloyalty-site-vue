<template>
  <router-view />
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      console.log('ROUTE PARAMS', this.$route.params)
      console.log('ROUTE QUERY', this.$route.query)
    }, 3000)
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
