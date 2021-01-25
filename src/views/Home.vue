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
              <div class="row">
                <div class="col-lg-4 col-sm-12 px-1">
                  <a
                    href="#"
                    class="ml-silver-btn"
                    @click.prevent="newCertificate"
                    style="font-size: 14px;"
                  >
                    Купить
                  </a>
                  <a
                    href="#"
                    data-mloyalty-side-panel-trigger="mloyalty-side-panel-widget"
                    data-mloyalty-code="111"
                    >Виджет 111</a
                  >
                </div>
                <div class="col-lg-4 col-sm-12 px-1">
                  <router-link
                    class="ml-silver-btn"
                    to="/preview"
                    style="font-size: 14px;"
                  >
                    Получить
                  </router-link>
                </div>
                <div class="col-lg-4 col-sm-12 px-1">
                  <a
                    href="#"
                    class="ml-silver-btn"
                    style="font-size: 14px;"
                    @click.prevent="balance"
                  >
                    Узнать баланс
                  </a>
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
import HelloWorld from '@/components/HelloWorld.vue'
import { mapMutations, mapState } from 'vuex'
import panelTypes from '@/store/panel/types'
import verificationTypes from '@/store/verificationCode/types'
import { BALANCE_PAGE, START_PAGE } from '@/helpers/const/widgetPage'
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'

export default {
  name: 'Home',
  components: {},
  mixins: [MixinChangePanelPage],
  data: () => ({}),
  computed: {
    ...mapState({
      showPanelBalance: state => state.panel.showPanelBalance
    })
  },
  methods: {
    ...mapMutations('panel', [
      panelTypes.TOGGLE_PANEL,
      panelTypes.TOGGLE_PANEL_BALANCE
    ]),
    ...mapMutations('verificationCode', [verificationTypes.SET_TEST_CODE]),
    togglePanelBalance() {
      console.log(this.showPanelBalance)
      this[panelTypes.TOGGLE_PANEL_BALANCE](!this.showPanelBalance)
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
    }
  }
}
</script>
