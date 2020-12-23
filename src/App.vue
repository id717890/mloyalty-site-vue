<template>
  <!-- <router-view /> -->
  <Lyaout />
  <!-- <Lyaout v-if="code" />
  <div v-else>
    Не задан код приложения
  </div> -->
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Lyaout from './components/Layout/Default'
import appTypes from '@/store/app/types'
export default {
  components: {
    Lyaout
  },
  computed: {
    ...mapState({
      code: state => state.app.code
    })
  },
  methods: {
    ...mapMutations('app', [appTypes.SET_TYPE_BROWSER, appTypes.SET_APP_CODE]),
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
    }
  },
  mounted() {
    const isMobile = window?.xprops?.isMobile
    const code = window?.xprops?.code
    const counter = window?.xprops?.counter
    if (isMobile) {
      console.log('IS MOBILE', window.xprops.isMobile)
      this[appTypes.SET_TYPE_BROWSER](isMobile)
    }
    if (code) {
      console.log('APP CODE', code)
      this[appTypes.SET_APP_CODE](code)
    }
    console.log('INIT COUNTER ', counter)
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

    window.xprops.onProps(function(props) {
      console.log(props.counter)
    })
    setInterval(() => {
      // console.log('WIDGET window.xprops', window?.xprops?.onProps)
      // console.log('WIDGET - XCHILD', window.xchild)
      // window.xprops.onProps(props => {
      //   console.log(props.counter)
      // })
      // Always 0
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
