<template>
  <v-app>
    <v-main>
      <div class="row pa-0 h100">
        <div
          class="col-lg-4 offset-lg-4 col-sm-12 pa-0 d-flex flex-column  h100"
        >
          <!-- <div class="col-12 py-0"> -->
          <div class="mloyalty-layout">
            <panel-header />
            <div
              class="flex-grow-1 mloyalty-panel-body"
              :class="{
                'mloyalty-no-padding-top-bottom': isBalance || isPreview
              }"
            >
              <transition name="panel-fade" mode="out-in">
                <div v-if="loading" class="h100 d-flex justify-center">
                  <div
                    class="pb flex-grow-1 d-flex justify-center align-center"
                  >
                    <MlLoading />
                  </div>
                </div>
                <router-view v-else></router-view>
                <!-- <component v-else :is="component"></component> -->
              </transition>
            </div>
            <panel-footer />
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import PanelHeader from '../PanelHeader'
import PanelFooter from '../PanelFooter'
import { mapState, mapMutations, mapActions } from 'vuex'
import panelTypes from '../../store/panel/types'
import certificateTypes from '@/store/certificate/types'
import basketTypes from '@/store/basket/types'
import MlLoading from '@/components/UI/MlLoading'

export default {
  components: {
    PanelHeader,
    PanelFooter,
    MlLoading
  },
  computed: {
    ...mapState({
      loading: state => state.app.loading
    }),
    isBalance() {
      return false
    },
    isPreview() {
      return false
    },
    ...mapState({
      component: state => state.panel.page,
      loading: state => state.app.loading
    }),
    isShowFooterHeader() {
      if (this.component === BALANCE_PAGE) return false
      return true
      // return this.component === PREVIEW_PAGE || this.component === BALANCE_PAGE
    }
  },
  watch: {
    component(value) {
      if (value !== START_PAGE) this[basketTypes.SET_CURRENT_CERTIFICATE](null)
    }
  },
  methods: {
    ...mapMutations('panel', [
      panelTypes.CURRENT_PAGE_SET,
      panelTypes.TOGGLE_PANEL
    ]),
    ...mapActions('certificate', [certificateTypes.GET_CERTIFICATE_OPTIONS]),
    ...mapMutations('basket', [basketTypes.SET_CURRENT_CERTIFICATE]),
    ...mapState({
      showPanel: state => state.panel.show
    }),
    togglePanel() {
      this[panelTypes.TOGGLE_PANEL](!this.showPanel)
    }
  },
  mounted() {
    this[certificateTypes.GET_CERTIFICATE_OPTIONS]()

    // this[panelTypes.CURRENT_PAGE_SET](START_PAGE)
  }
}
</script>
