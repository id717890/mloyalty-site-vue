<template>
  <v-app>
    <v-main>
      <div class="row py-0 px-4 h100">
        <div
          class="col-lg-4 offset-lg-4 col-sm-12 pa-0 d-flex flex-column  h100"
        >
          <!-- <div class="col-12 py-0"> -->
          <div class="mloyalty-layout">
            <!-- <panel-header :preview="isPreview" /> -->
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
            <!-- <panel-footer v-if="isShowFooterHeader && !isPreview" /> -->
            <!-- Кнопка бургера -->
            <v-btn
              v-if="showBtnBurger"
              @click.stop="togglePanelBurger"
              :style="{ bottom: paddingBottomForBasketAndBurger }"
              class="mloyalty-circle-burger"
              fab
              width="48"
              height="48"
              small
              elevation="0"
              color="#F0F0F0"
              ref="burger-btn"
            >
              <img src="@/assets/img/default/burger.png" alt="" />
            </v-btn>
            <basket-btn
              v-if="showBtnBasket"
              :class="{ 'right-for-sending': isSendingPage }"
              :style="{
                bottom: paddingBottomForBasketAndBurger
              }"
            />
            <modal-confirm-remove-certificate v-if="modalConfirmRemove" />
          </div>
        </div>
      </div>
      <v-navigation-drawer
        class="elevation-0 mloyalty-burger-panel"
        hide-overlay
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
import { mapState, mapMutations, mapActions } from 'vuex'
import panelTypes from '../../store/panel/types'
import certificateTypes from '@/store/certificate/types'
import basketTypes from '@/store/basket/types'
import MlLoading from '@/components/UI/MlLoading'
import ModalConfirmRemoveCertificate from '@/components/Panel/ModalConfirm'
import burgerLayout from '@/components/Burger/_Layout'
import panelBurgerTypes from '@/store/panelBurger/types'
import BasketBtn from '@/components/BasketBtn'
export default {
  components: {
    MlLoading,
    ModalConfirmRemoveCertificate,
    burgerLayout,
    BasketBtn
  },
  computed: {
    ...mapState({
      loading: state => state.app.loading,
      modalConfirmRemove: state => state.basket.modalConfirmRemove.show,
      showPanelBurger: state => state.panelBurger.show,
      config: state => state.app.config,
      offsetBottom: state => state.app.offsetBottom
    }),
    /**Смещение для кнопки корзины если страницы ввода контактов, т.к. кнопку бургера скрываем */
    isSendingPage() {
      return this.$route.path === '/sending'
    },
    paddingBottomForBasketAndBurger() {
      const defaultValue = 18
      // let offset = defaultValue
      // if (this.offsetBottom > 0) {
      const offset = defaultValue + Number(this.offsetBottom) - 10
      // }
      // if (this.$route.path === '/' || this.$route.path === '/sending')
      //   value = 94
      // if (this.$route.path === '/confirming') value = 125
      return `${offset}px`
    },
    showBtnBasket() {
      let isShow = true
      if (
        this.$route.path === '/basket' ||
        this.$route.path === '/success' ||
        this.$route.path === '/preview-mobile'
      )
        isShow = false
      return isShow
    },
    showBtnBurger() {
      let isShow = true
      if (
        this.$route.path === '/basket' ||
        this.$route.path === '/success' ||
        this.$route.path === '/sending' ||
        this.$route.path === '/preview-mobile'
      )
        isShow = false
      return isShow
    },
    isBalance() {
      return false
    },
    isPreview() {
      return this.$route.path === '/preview-mobile'
    }
  },
  watch: {
    showPanelBurger(newValue) {
      window?.xprops?.onHideClose(newValue)
    }
  },
  methods: {
    ...mapMutations('panel', [
      panelTypes.CURRENT_PAGE_SET,
      panelTypes.TOGGLE_PANEL
    ]),
    ...mapActions('certificate', [certificateTypes.GET_CERTIFICATE_OPTIONS]),
    ...mapMutations('panelBurger', [panelBurgerTypes.TOGGLE_PANEL_BURGER]),
    togglePanelBurger() {
      this[panelBurgerTypes.TOGGLE_PANEL_BURGER]()
    }
  },
  mounted() {
    this[certificateTypes.GET_CERTIFICATE_OPTIONS]()
  }
}
</script>
