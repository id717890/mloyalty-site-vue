<template>
  <div class="row">
    <div class="col-12">
      <div class="ml-basket-item">
        <div class="image">
          <v-img
            :aspect-ratio="16 / 11"
            class="ml-img-rounded"
            :src="require('@/assets/img/example/design1.png')"
          ></v-img>
        </div>
        <div class="content">
          <div class="first">
            {{ shortText(certificate.congratulation) }}
          </div>
          <div class="second">
            <MlNumeric
              ref="numeric"
              v-model="certificate.count"
              @input="change"
            >
            </MlNumeric>
          </div>
        </div>
        <div class="d-flex align-center">
          <img
            @click.stop=""
            class="btn-go-detail"
            src="~@/assets/img/arrow-right.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MlNumeric from '@/components/UI/MlNumeric'
import { mapMutations } from 'vuex'
import basketTypes from '@/store/basket/types'
export default {
  name: 'TheBasketItem',

  props: {
    certificate: {
      type: Object,
      require: true
    }
  },
  components: {
    MlNumeric
  },
  methods: {
    ...mapMutations('basket', [basketTypes.UPDATE_CERTIFICATE]),
    change(v) {
      // this.certificate.count = v
      this[basketTypes.UPDATE_CERTIFICATE](this.certificate)
    },
    shortText(str) {
      if (str && str.length > 50) {
        return `${str.substring(0, 50)}...`
      }
      return str
    }
  }
}
</script>
