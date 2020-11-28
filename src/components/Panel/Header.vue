<template>
  <div class="mloyalty-panel-header">
    <img class="logo" src="~@/assets/img/default/header-logo.png" alt="" />
    <a href="#" class="how-its-work">
      Дарить легко
    </a>
    <a href="#" class="how-its-work">
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
// import panelTypes from '@/store/panel/types'
import panelBurgerTypes from '@/store/panelBurger/types'

export default {
  computed: {},
  methods: {
    // ...mapMutations('panel', [panelTypes.TOGGLE_PANEL]),
    ...mapMutations('panelBurger', [panelBurgerTypes.TOGGLE_PANEL_BURGER]),
    togglePanelBurger() {
      this[panelBurgerTypes.TOGGLE_PANEL_BURGER]()
    }
  }
}
</script>

<style></style>
