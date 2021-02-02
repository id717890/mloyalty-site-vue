<template>
  <div class="h100 d-flex flex-column align-center justify-content-center">
    <!-- {{ payment }} -->
    <img src="~@/assets/img/cart1.png" alt="" class="ml-8 mb-4" width="300" />
    <section v-if="isSucceeded">
      <div class="text-success" style="font-weight: 600;">
        Поздравляем с удачной покупкой!
      </div>
      <div class="text-success" style="">
        Прямо сейчас мы отправим Вам <br />
        ссылку на скачивание сертификата
      </div>
    </section>
    <section v-if="isPending">
      <div class="text-success" style="font-weight: 600;">Платеж создан.</div>
      <div class="text-success" style="">
        Мы пришлем Вам уведомление, когда платеж будет обработан.
      </div>
    </section>
    <section v-if="isWaitingForCapture">
      <div class="text-success" style="font-weight: 600;">Платеж оплачен.</div>
      <div class="text-success" style="">
        Деньги авторизованы и ожидают списания.
      </div>
    </section>
    <section v-if="isCanceled">
      <div class="text-error" style="font-weight: 600;">
        <v-icon color="red">mdi-alert-circle</v-icon>
        Произошла ошибка.
      </div>
      <div class="text-success" style="">
        <!-- TODO здесь выводить текст ошибки -->
      </div>
    </section>
    <a href="#" @click.prevent="newCertificate" class="ml-black-btn mt-8">
      <v-icon>mdi-plus</v-icon>
      Новый сертификат
    </a>
  </div>
</template>

<script>
const PAYMENT_SUCCEEDED = 'succeeded'
const PAYMENT_PENDING = 'pending'
const PAYMENT_WAITING_FOR_CAPTURE = 'waiting_for_capture'
const PAYMENT_CANCELED = 'canceled'

import { mapMutations, mapState } from 'vuex'
import basketTypes from '@/store/basket/types'
import verificationTypes from '@/store/verificationCode/types'

export default {
  computed: {
    ...mapState({
      payment: state => state.yookassa.payment
    }),
    isCanceled() {
      return this.payment?.status === PAYMENT_CANCELED
    },
    isSucceeded() {
      return this.payment?.status === PAYMENT_SUCCEEDED
    },
    isWaitingForCapture() {
      return this.payment?.status === PAYMENT_WAITING_FOR_CAPTURE
    },
    isPending() {
      return this.payment?.status === PAYMENT_PENDING
    }
  },
  methods: {
    ...mapMutations('basket', [basketTypes.SET_BASKET]),
    ...mapMutations('verificationCode', [verificationTypes.SET_CONTACTS]),
    newCertificate() {
      this.$store.commit('basket/SET_PREVIEW', null)
      this.$router.push('/')
    }
  },
  mounted() {
    this[basketTypes.SET_BASKET](null)
    this[verificationTypes.SET_CONTACTS]({
      email: null,
      phone: null,
      sendingMethod: null
    })
  }
}
</script>
