<template>
  <v-btn
    @click.stop="togglePanelBurger"
    fab
    class="mloyalty-circle-burger"
    width="48"
    height="48"
    small
    elevation="0"
    color="#F0F0F0"
  >
    <img src="@/assets/img/default/burger.png" alt="" />
  </v-btn>
</template>

<script>
import panelBurgerTypes from '@/store/panelBurger/types'
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations('panelBurger', [panelBurgerTypes.TOGGLE_PANEL_BURGER]),
    togglePanelBurger() {
      this[panelBurgerTypes.TOGGLE_PANEL_BURGER]()
    }
  }
}
</script>

<style></style>
