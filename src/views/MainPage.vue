<template>
  <v-app>
    <!-- <v-navigation-drawer v-model="drawer" app color="#f5f5f5">
      <v-list shaped>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon v-text="'mdi-home'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Main page </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/orders">
          <v-list-item-icon>
            <v-icon v-text="'mdi-cart'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/contact">
          <v-list-item-icon>
            <v-icon v-text="'mdi-account-box-outline'"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Contacts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar flat color="#f5f5f5">
        <v-toolbar-title>MLOYALTY</v-toolbar-title>

        <v-toolbar-items class="ml-6">
          <v-btn text to="/" class="sm-btn-menu">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar> -->
    <v-main>
      <!-- <v-btn color="pink" dark @click.stop="togglePanel">
            Toggle
          </v-btn> -->
      <router-view name="main"></router-view>

      <v-navigation-drawer
        style="overflow: visible; height: 100%"
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
          color="#F0F0F0"
          class="ml-close-panel-btn hidden-sm-and-down"
          @click.stop="togglePanel"
          v-if="!showPanelBurger"
        >
          <v-icon color="#4D4D4D">mdi-close</v-icon>
        </v-btn>
        <panel-layout />
        <modal-confirm-remove-certificate v-if="modalConfirmRemove" />
      </v-navigation-drawer>

      <v-navigation-drawer
        :width="config.panelWidth"
        :value="showPanelBurger"
        app
        stateless
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
      this.changePanelPage(null)
    }
  },
  mounted() {
    this[panelTypes.TOGGLE_PANEL](false)
  }
}
</script>
