<template>
  <div class="mloyalty-panel-layout">
    <panel-header />
    <div class="flex-grow-1 mloyalty-panel-body">
      <transition name="panel-fade" mode="out-in">
        <component :is="component"></component>
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
import { mapMutations, mapState } from 'vuex'
import firstCertificate from './Pages/FirstCertificate'
import basket from './Pages/Basket'
import sending from './Pages/Sending'
import confirming from './Pages/Confirming'

export default {
  components: {
    panelHeader,
    panelFooter,
    firstCertificate,
    basket,
    sending,
    confirming
  },
  computed: {
    ...mapState({
      component: state => state.panel.page
    })
  },
  methods: {
    ...mapMutations('panel', [panelTypes.CURRENT_PAGE_SET]),
    next() {}
  },
  mounted() {
    this[panelTypes.CURRENT_PAGE_SET](SENDING_PAGE)
  }
}
</script>
