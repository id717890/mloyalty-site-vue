<template>
  <div class="mloyalty-panel-layout">
    <panel-header :preview="isPreview" />
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
    <panel-footer v-if="!isPreview" />
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
  CONFIRMING_PAGE,
  PREVIEW_PAGE
} from '../../helpers/const/widgetPage'
import { mapActions, mapMutations, mapState } from 'vuex'
import firstCertificate from './Pages/NewCertificate'
import basket from './Pages/Basket'
import sending from './Pages/Sending'
import confirming from './Pages/Confirming'
import preview from './Pages/Preview'
import MlLoading from '@/components/UI/MlLoading'
import certificateTypes from '@/store/certificate/types'
import basketTypes from '@/store/basket/types'

export default {
  components: {
    panelHeader,
    panelFooter,
    firstCertificate,
    basket,
    sending,
    confirming,
    preview,
    MlLoading
  },
  computed: {
    ...mapState({
      component: state => state.panel.page,
      loading: state => state.app.loading
    }),
    isPreview() {
      return this.component === PREVIEW_PAGE
    }
  },
  watch: {
    component(value) {
      if (value !== START_PAGE) this[basketTypes.SET_CURRENT_CERTIFICATE](null)
    }
  },
  methods: {
    ...mapMutations('panel', [panelTypes.CURRENT_PAGE_SET]),
    ...mapActions('certificate', [certificateTypes.GET_CERTIFICATE_OPTIONS]),
    ...mapMutations('basket', [basketTypes.SET_CURRENT_CERTIFICATE]),
    next() {}
  },
  mounted() {
    this[certificateTypes.GET_CERTIFICATE_OPTIONS]()

    this[panelTypes.CURRENT_PAGE_SET](START_PAGE)
  }
}
</script>
