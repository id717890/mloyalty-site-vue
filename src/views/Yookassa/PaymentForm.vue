<template>
  <div class="pa-3">
    {{ payment }}
    <div id="payment-form"></div>
    <section v-if="yookassaErrorInit">
      <v-alert color="red" dark>
        <v-icon>mdi-alert-circle</v-icon>
        Ошибка при инициализации ЮКассы
      </v-alert>
      <a href="#" @click.prevent="$router.push('/confirming')">Назад</a>
      <router-view to="/confirming">Назад</router-view>
    </section>
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
      console.log(1)
      let yookassaScript = document.createElement('script')
      yookassaScript.setAttribute(
        'src',
        'https://yookassa.ru/checkout-widget/v1/checkout-widget.js'
      )
      document.head.appendChild(yookassaScript)
      console.log(2)
      return Promise.resolve()
    },
    loadYookassa() {
      const widget_url = process.env.VUE_APP_WIDGET_URL
      const error_callback = this.yookassaErrors
      const payment_id = this.payment?.id
      const token = this.payment?.confirmation_token
      const code = this.appCode
      const url = `${widget_url}/yookassa-completion-payment/?code=${code}&payment_id=${payment_id}`
      console.log('URL', url)
      console.log(!widget_url)
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
    yookassaErrors() {}
  },
  async mounted() {
    await this.loadYookassaScript()
    setTimeout(() => {
      this.loadYookassa()
    }, 1000)
    console.log(3)

    // console.log(this)
    // this.$loadScript(
    //   'https://yookassa.ru/checkout-widget/v1/checkout-widget.js'
    // ).then(x => {
    //   console.log('SUC', x)
    // })
  }
}
</script>
