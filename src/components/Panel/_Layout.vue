<template>
  <div class="mloyalty-panel-layout">
    <panel-header />
    <div class="flex-grow-1 mloyalty-panel-body">
      <transition name="panel-fade" mode="out-in">
        <div v-if="loading" class="h100 d-flex justify-center">
          <div class="pb flex-grow-1 d-flex justify-center align-center">
            <MlLoading />
          </div>
        </div>
        <component v-else :is="component"></component>
      </transition>
    </div>
    <panel-footer />
  </div>
</template>

<script>
import panelHeader from './Header'
import panelFooter from './Footer'
import panelTypes from '../../store/panel/types'
import {
  START_PAGE,
  BASKET_PAGE,
  SENDING_PAGE,
  CONFIRMING_PAGE
} from '../../helpers/const/widgetPage'
import { mapActions, mapMutations, mapState } from 'vuex'
import firstCertificate from './Pages/NewCertificate'
import basket from './Pages/Basket'
import sending from './Pages/Sending'
import confirming from './Pages/Confirming'
import MlLoading from '@/components/UI/MlLoading'
import certificateTypes from '@/store/certificate/types'

export default {
  components: {
    panelHeader,
    panelFooter,
    firstCertificate,
    basket,
    sending,
    confirming,
    MlLoading
  },
  computed: {
    ...mapState({
      component: state => state.panel.page,
      loading: state => state.app.loading
    })
  },
  methods: {
    ...mapMutations('panel', [panelTypes.CURRENT_PAGE_SET]),
    ...mapActions('certificate', [certificateTypes.GET_CERTIFICATE_OPTIONS]),
    next() {}
  },
  mounted() {
    this[certificateTypes.GET_CERTIFICATE_OPTIONS]()

    this[panelTypes.CURRENT_PAGE_SET](START_PAGE)
  }
}
</script>
