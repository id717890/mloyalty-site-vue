import app from './app/store'
import panel from './panel/store'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    panel
  }
})
