<template>
  <div class="mloyalty-panel-header">
    <img class="logo" src="~@/assets/img/default/header-logo.png" alt="" />
    <a href="#" class="how-its-work">
      Дарить легко
    </a>
    <a href="#" class="how-its-work" @click.prevent="goHowItsWork">
      Как это работает
    </a>
    <img
      src="~@/assets/img/default/burger.png"
      class="burger"
      alt=""
      @click.stop="togglePanelBurger"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import panelBurgerTypes from '@/store/panelBurger/types'
import MixinChagePage from '@/helpers/mixins/burger/changePage'
import { HOW_ITS__WORK } from '@/helpers/const/widgetPage'

export default {
  mixins: [MixinChagePage],
  computed: {},
  methods: {
    ...mapMutations('panelBurger', [panelBurgerTypes.TOGGLE_PANEL_BURGER]),
    togglePanelBurger() {
      this[panelBurgerTypes.TOGGLE_PANEL_BURGER]()
    },
    goHowItsWork() {
      this.changePanelBurgerPage(HOW_ITS__WORK)
      this.togglePanelBurger()
    }
  }
}
</script>
