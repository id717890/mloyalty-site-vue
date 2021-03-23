<template>
  <div>
    <!-- Опросы Desktop -->
    <div class="quiz-wrapper">
      <div class="quiz-block">
        <div class="ml-text-16-24-500">
          Ответьте на 10 вопросов и получите КП
        </div>
        <a href="#" class="ml-purple-btn mt-4" @click.prevent="openQuiz"
          >Узнать условия</a
        >
      </div>
    </div>
    <div class="col-lg-6 col-md-8 col-sm-12 offset-lg-3 offset-md-2 px-10">
      <div class="row">
        <div class="col-12 pa-0">
          <img src="@/assets/img/cart1.png" class="home-card" alt="" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 pt-5">
          <h1 class="ml-title-32-32-600">
            Виртуальные сертификаты и виджеты
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="block-with-num pt-5 pb-3">
            <div class="ml-title-18-24">
              Выберите, что вы хотите сделать с сертификатом?
            </div>
            <div class="pt-4">
              <div v-if="test" class="row">
                <div class="col-lg-6 col-sm-12">
                  <a
                    href="#"
                    class="ml-silver-btn"
                    @click.prevent="newCertificate"
                    style="font-size: 14px;"
                  >
                    <v-icon>mdi-cart</v-icon>
                    Купить
                  </a>
                </div>
                <div class="col-lg-6 col-sm-12">
                  <a
                    href="#"
                    class="ml-silver-btn"
                    style="font-size: 14px;"
                    @click.prevent="openCertificateOwnere"
                  >
                    <v-icon>mdi-certificate</v-icon>
                    Получить
                  </a>
                </div>
                <div class="col-lg-6 col-sm-12">
                  <a
                    href="#"
                    class="ml-silver-btn"
                    style="font-size: 14px;"
                    @click.prevent="balance"
                  >
                    <v-icon>mdi-wallet</v-icon>
                    Узнать баланс
                  </a>
                </div>
                <div class="col-lg-6 col-sm-12 ">
                  <a
                    href="#"
                    class="ml-silver-btn"
                    style="font-size: 14px;"
                    @click.prevent="basket"
                  >
                    <v-icon>mdi-basket-fill</v-icon>
                    Готовая корзина
                  </a>
                </div>
              </div>
              <div v-else class="row">
                <div class="col-lg-6 col-sm-12">
                  <button
                    type="button"
                    class="ml-silver-btn w100"
                    style="font-size: 14px;"
                    @click="openSidePanel"
                  >
                    <v-icon>mdi-cart</v-icon>
                    Купить
                  </button>
                </div>
                <div class="col-lg-6 col-sm-12">
                  <a
                    href="#"
                    class="ml-silver-btn"
                    style="font-size: 14px;"
                    @click.prevent="openCertificateOwnere"
                  >
                    <v-icon>mdi-certificate</v-icon>
                    Получить
                  </a>
                </div>
                <div class="col-lg-6 col-sm-12">
                  <button
                    type="button"
                    class="ml-silver-btn w100"
                    style="font-size: 14px;"
                    @click="openSidePanel2"
                  >
                    <v-icon>mdi-wallet</v-icon>
                    Узнать баланс
                  </button>
                </div>
                <div class="col-lg-6 col-sm-12">
                  <button
                    type="button"
                    class="ml-silver-btn w100"
                    style="font-size: 14px;"
                    @click="openSidePanelBasket"
                  >
                    <v-icon>mdi-basket-fill</v-icon>
                    Готовая корзина
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Опросы Mobile -->
      <div class="row quiz-wrapper-mobile">
        <div class="col-12 d-flex justify-content-end">
          <div class="quiz-block">
            <div class="ml-text-16-24-500">
              Ответьте на 10 вопросов и получите КП
            </div>
            <a href="#" class="ml-purple-btn mt-4" @click.prevent="openQuiz"
              >Узнать условия</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapMutations, mapState } from 'vuex'
import panelTypes from '@/store/panel/types'
import verificationTypes from '@/store/verificationCode/types'
import { START_PAGE } from '@/helpers/const/widgetPage'
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'

export default {
  name: 'Home',
  components: {},
  mixins: [MixinChangePanelPage],
  data: () => ({
    test: false
  }),
  computed: {
    ...mapState({
      showPanelBalance: state => state.panel.showPanelBalance,
      showPanelBasket: state => state.panel.showPanelBasket
    })
  },
  methods: {
    ...mapMutations('panel', [
      panelTypes.TOGGLE_PANEL,
      panelTypes.TOGGLE_PANEL_BALANCE,
      panelTypes.TOGGLE_PANEL_BASKET
    ]),
    ...mapMutations('verificationCode', [verificationTypes.SET_TEST_CODE]),
    updateProps() {
      widgetZoidComponent.updateProps({ code: 12345 })
    },
    openSidePanel() {
      MloyaltyWidget.open('Купить')
    },
    openSidePanel2() {
      MloyaltyWidget.open('Баланс')
    },
    openSidePanelBasket() {
      MloyaltyWidget.open('Готовая корзина')
    },
    openCertificateOwnere() {
      const url = this.test
        ? 'http://localhost:8081'
        : process.env.VUE_APP_WIDGET_URL
      const widgetUrl = `${url}/owner?code=Получить&id=1234567890`
      window.open(widgetUrl, '_blank')
    },
    togglePanelBalance() {
      this[panelTypes.TOGGLE_PANEL_BALANCE](!this.showPanelBalance)
    },
    togglePanelBasket() {
      this[panelTypes.TOGGLE_PANEL_BASKET](!this.showPanelBasket)
    },
    openQuiz() {
      Marquiz.showModal('5fda3289c9b57700443842f2')
    },
    // togglePanel() {
    //   this[panelTypes.TOGGLE_PANEL](!this.showPanel)
    // },
    newCertificate() {
      this[panelTypes.TOGGLE_PANEL](true)
      this.changePanelPage(START_PAGE)
    },
    balance() {
      this.togglePanelBalance()
    },
    basket() {
      this.togglePanelBasket()
    }
  }
}
</script>
