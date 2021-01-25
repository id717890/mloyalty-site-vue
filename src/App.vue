<template>
  <router-view />
</template>

<script>
export default {
  methods: {
    initMarquiz(w, d, s, o) {
      // if (!window.__marquiz) window.__marquiz = []
      // window.marquiz = function() {
      //   window.Marquiz
      //     ? Marquiz.add(arguments)
      //     : window.__marquiz.push(arguments)
      // }
      // var j = d.createElement(s)
      // j.async = true
      // j.src = '//script.marquiz.ru/v2.js'
      // j.onload = function() {
      //   if (document.readyState !== 'loading') Marquiz.init(o)
      //   else
      //     document.addEventListener('DOMContentLoaded', function() {
      //       Marquiz.init(o)
      //     })
      // }
      // d.head.insertBefore(j, d.head.firstElementChild)
    }
  },
  mounted() {
    // if (window.xprops.testProp) {
    //   console.log(window.xprops.testProp)
    // }
    this.initMarquiz(window, document, 'script', {
      host: '//quiz.marquiz.ru',
      id: '5fda3289c9b57700443842f2',
      autoOpen: false,
      autoOpenFreq: 'once',
      openOnExit: false,
      disableOnMobile: false
    })
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
