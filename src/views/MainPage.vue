<template>
  <v-app>
    <!-- <v-app-bar app></v-app-bar> -->
    <v-main>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-btn color="pink" dark @click.stop="togglePanel">
            Toggle
          </v-btn>
        </v-row>
      </v-container>

      <v-navigation-drawer
        style="overflow: visible"
        :width="config.panelWidth"
        :value="showPanel"
        app
        stateless
        temporary
        right
      >
        <v-btn
          fab
          small
          color="#E6E6E6"
          class="close-panel-btn"
          @click.stop="togglePanel"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <panel-layout />
        <modal-confirm-remove-certificate v-if="modalConfirmRemove" />
      </v-navigation-drawer>

      <v-navigation-drawer
        :width="config.panelWidth"
        :value="showPanelBurger"
        app
        temporary
        right
      >
        <burger-layout />
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script>
import appTypes from '../store/app/types'
import panelLayout from '../components/Panel/_Layout'
import burgerLayout from '../components/Burger/_Layout'
import { mapActions, mapMutations, mapState } from 'vuex'
import panelTypes from '@/store/panel/types'
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'
import { START_PAGE } from '@/helpers/const/widgetPage'
import ModalConfirmRemoveCertificate from '@/components/Panel/ModalConfirm'
export default {
  mixins: [MixinChangePanelPage],
  components: {
    panelLayout,
    burgerLayout,
    ModalConfirmRemoveCertificate
  },
  computed: {
    ...mapState({
      showPanel: state => state.panel.show,
      showPanelBurger: state => state.panelBurger.show,
      modalConfirmRemove: state => state.basket.modalConfirmRemove.show,
      config: state => state.app.config
    })
  },
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' }
      ]
    }
  },
  methods: {
    ...mapMutations('panel', [panelTypes.TOGGLE_PANEL]),

    togglePanel() {
      this[panelTypes.TOGGLE_PANEL](!this.showPanel)
    }
  },
  mounted() {}
}
</script>

<style></style>
