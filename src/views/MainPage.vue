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
        :width="448"
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
        <certificate-layout />
        <!-- <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click.stop="drawer = !drawer"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list> -->
      </v-navigation-drawer>

      <v-navigation-drawer
        :width="320"
        :value="showPanelBurger"
        app
        stateless
        temporary
        right
      >
        asd
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script>
import appTypes from '../store/app/types'
import certificateLayout from '../components/Panel/_Layout'
import { mapActions, mapMutations, mapState } from 'vuex'
import panelTypes from '@/store/panel/types'
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'
import { START_PAGE } from '@/helpers/const/widgetPage'

export default {
  mixins: [MixinChangePanelPage],
  components: {
    certificateLayout
  },
  computed: {
    ...mapState({
      showPanel: state => state.panel.show,
      showPanelBurger: state => state.panelBurger.show
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
