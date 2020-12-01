<template>
  <div class="mloyalty-panel-burger-layout">
    <burger-header v-if="!isHomePage" />
    <div class="flex-grow-1 mloyalty-panel-burger-body">
      <transition name="panel-fade" mode="out-in">
        <section>
          <v-btn icon large text class="close-btn" @click="togglePanelBurger">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <div v-if="loading" class="h100 d-flex justify-center">
            <div class="pb flex-grow-1 d-flex justify-center align-center">
              <MlLoading />
            </div>
          </div>
          <component v-else :is="component"></component>
        </section>
      </transition>
    </div>
    <burger-footer v-if="!isHomePage" />
  </div>
</template>

<script>
import burgerHeader from './Header'
import burgerFooter from './Footer'
import burgerTypes from '../../store/panelBurger/types'
import { HOME_PAGE } from '../../helpers/const/widgetPage'
import { mapActions, mapMutations, mapState } from 'vuex'
import home from './Pages/Home'
import MlLoading from '@/components/UI/MlLoading'
import MixinChagePage from '@/helpers/mixins/burger/changePage'
import panelBurgerTypes from '@/store/panelBurger/types'

export default {
  components: {
    burgerHeader,
    burgerFooter,
    home,
    MlLoading
  },
  mixins: [MixinChagePage],
  computed: {
    ...mapState({
      component: state => state.panelBurger.page,
      loading: state => state.app.loading
    }),
    isHomePage() {
      return this.component === HOME_PAGE
    }
  },
  watch: {
    component(value) {}
  },
  mounted() {
    this.changePanelPage(HOME_PAGE)
  },
  methods: {
    ...mapMutations('panelBurger', [panelBurgerTypes.TOGGLE_PANEL_BURGER]),
    togglePanelBurger() {
      this[panelBurgerTypes.TOGGLE_PANEL_BURGER]()
    }
  }
}
</script>
