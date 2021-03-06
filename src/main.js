import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import './assets/scss/_app.scss'
import Vuetify from 'vuetify'
import VueYandexMetrika from 'vue-yandex-metrika'
import Auth from './plugins/auth'

Vue.use(Auth)
Vue.use(Vuetify)
Vue.use(VueYandexMetrika, {
  id: '70564408',
  router: router,
  env: process.env.NODE_ENV
})
Vue.config.productionTip = false
new Vue({
  vuetify: new Vuetify(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
