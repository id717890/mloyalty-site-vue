<template>
  <div class="h100 d-flex align-items-center">
    <MlLoading />
  </div>
</template>

<script>
import axios from 'axios'
import MlLoading from '@/components/UI/MlLoading'
import yookassaTypes from '@/store/yookassa/types'
import { mapMutations } from 'vuex'

const PAYMENT_SUCCEEDED = 'succeeded'
const PAYMENT_PENDING = 'pending'
const PAYMENT_WAITING_FOR_CAPTURE = 'waiting_for_capture'
const PAYMENT_CANCELED = 'canceled'

export default {
  components: {
    MlLoading
  },
  methods: {
    ...mapMutations('yookassa', [yookassaTypes.SET_YOOKASSA_PAYMENT]),
    readAppCode() {
      const { code } = this.$route.query
      console.log(code)
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
              payment_id: payment_id
            }
          })
          .then(response => {
            if (response.status === 200) {
              this[yookassaTypes.SET_YOOKASSA_PAYMENT](response.data)
              const paymentStatus = response?.data?.status

              alert(paymentStatus)

              // switch(paymentStatus) {
              //   case PAYMENT_PENDING:
              //     alert()
              //   break;

              // }
              console.log(response.data)
            }
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
