import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import './assets/scss/_app.scss'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.config.productionTip = false
new Vue({
  vuetify: new Vuetify(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
