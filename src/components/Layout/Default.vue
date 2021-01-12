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
              <!-- <transition name="panel-fade" mode="out-in"> -->
              <div v-if="loading" class="h100 d-flex justify-center">
                <div class="pb flex-grow-1 d-flex justify-center align-center">
                  <MlLoading />
                </div>
              </div>
              <router-view v-else></router-view>
              <!-- <component v-else :is="component"></component> -->
              <!-- </transition> -->
            </div>
            <!-- <panel-footer v-if="isShowFooterHeader && !isPreview" /> -->
            <!-- Кнопка бургера -->
            <burger-btn
              v-if="showBtnBurger"
              ref="burger-btn"
              :style="{ bottom: paddingBottomForBasketAndBurger }"
            />
            <basket-btn
              ref="basket-btn"
              v-if="showBtnBasket"
              :class="{
                'right-for-sending': isSendingPage
              }"
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
import BasketBtn from '@/components/BasketBtn'
import BurgerBtn from '@/components/BurgerBtn'
export default {
  components: {
    MlLoading,
    ModalConfirmRemoveCertificate,
    burgerLayout,
    BasketBtn,
    BurgerBtn
  },
  data: () => ({
    btnInit: false
  }),
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
    isHomePage() {
      return this.$route.path === '/'
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
      this.changeOpacityBtns()
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

    changeOpacityBtns() {
      // if (this.$route.path === '/' && this.btnInit === false) {
      setTimeout(() => {
        const basket = this.$refs['basket-btn']?.$el?.style
        const burger = this.$refs['burger-btn']?.$el?.style
        if (burger) {
          this.$refs['burger-btn'].$el.style.opacity = 1
        }
        if (basket) {
          this.$refs['basket-btn'].$el.style.opacity = 1
        }
        // console.log(this.$refs['burger-btn'].$el.style)
        // this.$refs['burger-btn'].$el.classList.remove('opactity-none')
        // this.$refs['basket-btn'].$el.classList.remove('opactity-none')
        // this.btnInit = true
      }, 1000)
      // }
    }
  },
  mounted() {
    this[certificateTypes.GET_CERTIFICATE_OPTIONS]()
  }
}
</script>
