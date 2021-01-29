<template>
  <!-- <router-view /> -->
  <Lyaout />
  <!-- <Lyaout v-if="code" /> -->
  <!-- <div v-else> -->
  <!-- Не задан код приложения -->
  <!-- </div> -->
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
    ...mapMutations('app', [appTypes.SET_TYPE_BROWSER, appTypes.SET_APP_CODE])
  },
  mounted() {
    // const isMobile = window?.xprops?.isMobile
    const code = window?.xprops?.code
    window?.xprops?.onProps(newProps => {
      console.log('onProps event', newProps)
    })
    // const counter = window?.xprops?.counter
    // console.log('IS MOBILE', isMobile)
    // if (isMobile) {
    //   this[appTypes.SET_TYPE_BROWSER](isMobile)
    // }
    if (code) {
      console.log('APP CODE', code)
      this[appTypes.SET_APP_CODE](code)
    }
    // console.log('INIT COUNTER ', counter)
    // setTimeout(() => {
    //   console.log('ROUTE PARAMS', this.$route.params)
    //   console.log('ROUTE QUERY', this.$route.query)
    // }, 3000)

    // setInterval(() => {
    //   // console.log('WIDGET window.xprops', window?.xprops?.onProps)
    //   // console.log('WIDGET - XCHILD', window.xchild)
    //   console.log('WIDGET counter', window.xprops.counter)
    //   // Always 0
    // }, 3000)
  }
}
</script>
