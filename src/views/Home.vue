<template>
  <div class="row h100">
    <div class="col-12 d-flex flex-column justify-content-center align-center">
      <div class="d-flex flex-row">
        <div class="d-flex flex-column">
          <h2>Что мне нужно?</h2>
          <img
            src="~@/assets/img/empty-cart.png"
            alt=""
            class="empty-cart-img mb-4"
          />
        </div>
        <div class="d-flex flex-column pl-10">
          <a href="#" class="ml-black-btn mb-6" @click.prevent="togglePanel">
            Купить сертификат
          </a>
          <router-link class="ml-black-btn mb-6" to="/preview">
            Получить сертификат
          </router-link>
          <a href="#" class="ml-black-btn" @click.prevent="balance">
            Узнать баланс сертификата
          </a>
        </div>
      </div>
      <div>
        <div class="pt-16">
          <h5 class="text1">Номер сертификата. Код подтверждения. Пин код.</h5>
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
          <div style="height: 10px">
            <h5 style="color: green" v-show="successCode">Код установлен.</h5>
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

export default {
  name: 'Home',
  components: {
    MlInputCode
  },
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

    togglePanel() {
      this[panelTypes.TOGGLE_PANEL](!this.showPanel)
    },
    take() {
      console.log('take')
    },
    balance() {
      console.log('balance')
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
          this.number1OfCode = null
          this.number2OfCode = null
          this.number3OfCode = null
          this.number4OfCode = null
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
