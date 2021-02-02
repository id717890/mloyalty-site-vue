<template>
  <div class="pa-3">
    <!-- {{ payment }} -->
    <div id="payment-form"></div>
    <section v-if="yookassaErrorInit">
      <v-alert color="red" dark>
        <v-icon>mdi-alert-circle</v-icon>
        Ошибка при инициализации ЮКассы
      </v-alert>
    </section>
    <div class="ml-back-btn-opacity" ref="panel" style="opacity: 0">
      <button
        class="w100 ml-black-btn m-auto"
        style="max-width: 460px"
        @click="$router.push('/confirming')"
      >
        <v-icon>mdi-arrow-left</v-icon>
        Назад
      </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
export default {
  data: () => ({
    yookassaErrorInit: false
  }),
  computed: {
    ...mapState({
      payment: state => state.yookassa.payment,
      appCode: state => state.app.code
    })
  },
  methods: {
    async loadYookassaScript() {
      let yookassaScript = document.createElement('script')
      yookassaScript.setAttribute(
        'src',
        'https://yookassa.ru/checkout-widget/v1/checkout-widget.js'
      )
      document.head.appendChild(yookassaScript)
      return Promise.resolve()
    },
    loadYookassa() {
      const widget_url = process.env.VUE_APP_WIDGET_URL
      const error_callback = this.yookassaErrors
      const payment_id = this.payment?.id
      const token = this.payment?.confirmation_token
      const code = this.appCode
      const url = `${widget_url}/yookassa-completion-payment/?code=${code}&payment_id=${payment_id}`
      if (
        !widget_url ||
        !error_callback ||
        !payment_id ||
        !token ||
        !code ||
        !url
      ) {
        this.yookassaErrorInit = true
        console.log('Yookassa Error Init')
        return
      }
      const checkout = new window.YooMoneyCheckoutWidget({
        confirmation_token: token,
        return_url: url,
        embedded_3ds: true,
        error_callback
      })
      checkout.render('payment-form')
    },
    yookassaErrors(errors) {
      //TODO реализовать обработку ошибок, когда появится серверная часть
      console.log(errors)
    },
    showBackBtn() {
      const el = this.$refs.panel
      if (el && el?.style) {
        setTimeout(() => {
          el.style.opacity = 1
        }, 3000)
      }
    }
  },
  async mounted() {
    await this.loadYookassaScript()
    setTimeout(() => {
      this.loadYookassa()
    }, 1000)
    this.showBackBtn()
    // console.log(this)
    // this.$loadScript(
    //   'https://yookassa.ru/checkout-widget/v1/checkout-widget.js'
    // ).then(x => {
    //   console.log('SUC', x)
    // })
  }
}
</script>
