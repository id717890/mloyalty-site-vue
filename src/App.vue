<template>
  <router-view />
</template>

<script>
export default {
  methods: {
    initMarquiz(w, d, s, o) {
      if (!window.__marquiz) window.__marquiz = []
      window.marquiz = function() {
        window.Marquiz
          ? Marquiz.add(arguments)
          : window.__marquiz.push(arguments)
      }
      var j = d.createElement(s)
      j.async = true
      j.src = '//script.marquiz.ru/v2.js'
      j.onload = function() {
        if (document.readyState !== 'loading') Marquiz.init(o)
        else
          document.addEventListener('DOMContentLoaded', function() {
            Marquiz.init(o)
          })
      }
      d.head.insertBefore(j, d.head.firstElementChild)
    },
    initPanel() {
      ;(function(w, i, d, g, e, t) {
        t = i.createElement(d)
        t.async = 1
        t.src = g
        t.onload = function() {
          if (document.readyState !== 'loading') {
            MloyaltyWidget.init(e)
          } else {
            document.addEventListener('DOMContentLoaded', function() {
              MloyaltyWidget.init(e)
            })
          }
        }
        i.head.insertBefore(t, i.head.firstElementChild)
      })(
        window,
        document,
        'script',
        'https://mloyalty-widget.s3-eu-west-1.amazonaws.com/0.6.0/mloyalty-widget.bundle.min.js',
        { code: '*', debug: true, metadata: { id: 1, name: 'SiteWidget' } }
      )
    }
  },
  mounted() {
    this.initMarquiz(window, document, 'script', {
      host: '//quiz.marquiz.ru',
      id: '5fda3289c9b57700443842f2',
      autoOpen: false,
      autoOpenFreq: 'once',
      openOnExit: false,
      disableOnMobile: false
    })
    // this.initPanel()
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
