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
      @click.stop="togglePanel"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import panelTypes from '@/store/panel/types'

export default {
  computed: {
    ...mapState({
      showPanel: state => state.panel.show
    })
  },
  methods: {
    ...mapMutations('panel', [panelTypes.TOGGLE_PANEL]),
    togglePanel() {
      this[panelTypes.TOGGLE_PANEL](!this.showPanel)
    }
  }
}
</script>

<style></style>
