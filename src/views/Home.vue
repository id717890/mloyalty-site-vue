<template>
  <div class="row">
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
          <img src="@/assets/img/cart1.png" width="390" alt="" />
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
          <div class="block-with-num">
            <div class="num">1</div>
            <div class="ml-title-18-24">
              Введите любые цифры. Они нужны для теста, и будут номером
              сертификата, кодом подтверждения и пин-кодом
            </div>
            <div class="pt-3 d-flex">
              <MlInputCode
                ref="code1"
                v-model="number1OfCode"
                class="mr-2"
                @input="proccessNumber1"
              />
              <MlInputCode
                ref="code2"
                v-model="number2OfCode"
                @input="proccessNumber2"
                class="mr-2"
              />
              <MlInputCode
                ref="code3"
                v-model="number3OfCode"
                @input="proccessNumber3"
                class="mr-2"
              />
              <MlInputCode
                ref="code4"
                v-model="number4OfCode"
                @input="proccessNumber4"
                class="mr-2"
              />
              <div
                v-if="successCode"
                class="d-flex justify-content-center align-items-center pl-4"
              >
                <img src="@/assets/img/done.png" alt="" />
                <h5 class="ml-title-14-20">
                  Код установлен.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="block-with-num">
            <div class="num">2</div>
            <div class="ml-title-18-24">
              Выберите, что вы хотите сделать?
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
                    Купить сертификат
                  </a>
                </div>
                <div class="col-lg-4 col-sm-12 px-1">
                  <router-link
                    class="ml-silver-btn"
                    to="/preview"
                    style="font-size: 14px;"
                  >
                    Получить сертификат
                  </router-link>
                </div>
                <div class="col-lg-4 col-sm-12 px-1">
                  <a
                    href="#"
                    class="ml-silver-btn"
                    style="font-size: 14px;"
                    @click.prevent="balance"
                  >
                    Узнать баланс сертификата
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import { mapMutations } from 'vuex'
import panelTypes from '@/store/panel/types'
import verificationTypes from '@/store/verificationCode/types'
import MlInputCode from '@/components/UI/MlInputCode'
import { BALANCE_PAGE, START_PAGE } from '@/helpers/const/widgetPage'
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'

export default {
  name: 'Home',
  components: {
    MlInputCode
  },
  mixins: [MixinChangePanelPage],
  data: () => ({
    number1OfCode: null,
    number2OfCode: null,
    number3OfCode: null,
    number4OfCode: null,
    successCode: false
  }),
  methods: {
    ...mapMutations('panel', [panelTypes.TOGGLE_PANEL]),
    ...mapMutations('verificationCode', [verificationTypes.SET_TEST_CODE]),
    openQuiz() {
      Marquiz.showModal('5fda3289c9b57700443842f2')
    },
    togglePanel() {
      this[panelTypes.TOGGLE_PANEL](!this.showPanel)
    },
    newCertificate() {
      this[panelTypes.TOGGLE_PANEL](true)
      this.changePanelPage(START_PAGE)
    },
    take() {
      console.log('take')
    },
    balance() {
      this[panelTypes.TOGGLE_PANEL](true)
      this.changePanelPage(BALANCE_PAGE)
    },
    proccessNumber1() {
      if (this.number1OfCode) {
        this.$refs.code2.$el.focus()
      }
    },
    proccessNumber2() {
      if (this.number2OfCode) {
        this.$refs.code3.$el.focus()
      }
    },
    proccessNumber3() {
      if (this.number3OfCode) {
        this.$refs.code4.$el.focus()
      }
    },
    proccessNumber4() {
      this.$refs.code4.$el.blur()
      if (this.number4OfCode) {
        const code1 = this.number1OfCode
        const code2 = this.number2OfCode
        const code3 = this.number3OfCode
        const code4 = this.number4OfCode
        if (code1 && code2 && code3 && code4) {
          const code = Number(`${code1}${code2}${code3}${code4}`)
          this[verificationTypes.SET_TEST_CODE](code)
          // this.number1OfCode = null
          // this.number2OfCode = null
          // this.number3OfCode = null
          // this.number4OfCode = null
          this.successCode = true
          setTimeout(() => {
            this.successCode = false
          }, 2000)
        }
      }
    }
  }
}
</script>
