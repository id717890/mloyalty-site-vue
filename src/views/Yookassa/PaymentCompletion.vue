<template>
  <div class="h100 d-flex align-items-center">
    <MlLoading text="Обработка платежа" />
  </div>
</template>

<script>
import axios from 'axios'
import MlLoading from '@/components/UI/MlLoading'
import yookassaTypes from '@/store/yookassa/types'
import appTypes from '@/store/app/types'
import { mapMutations } from 'vuex'

export default {
  components: {
    MlLoading
  },
  methods: {
    ...mapMutations('yookassa', [yookassaTypes.SET_YOOKASSA_PAYMENT]),
    ...mapMutations('app', [appTypes.SET_APP_CODE]),
    readAppCode() {
      const { code } = this.$route.query
      if (code) {
        this[appTypes.SET_APP_CODE](code)
      }
    },
    getPaymentStatus() {
      const { payment_id } = this.$route.query
      console.log(payment_id)
      if (payment_id) {
        const data = {
          payment_id
        }
        axios
          .get('https://widget.mltest.site/yookassa/api/payment/', {
            params: {
              id: payment_id
            }
          })
          .then(response => {
            if (response.status === 200) {
              let { data } = response
              // data.status = 'waiting_for_capture'
              this[yookassaTypes.SET_YOOKASSA_PAYMENT](data)
            }
            this.$router.push('/payment-result')
          })
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.readAppCode()
      this.getPaymentStatus()
    }, 2000)
  }
}
</script>
