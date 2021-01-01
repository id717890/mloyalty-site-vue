<template>
  <div class="d-flex flex-column h100">
    <div class="wrapper-alert" v-if="alert">
      <div class="black-alert">
        <v-icon>mdi-check</v-icon> Изменения сохранены
      </div>
    </div>
    <div class="pb flex-grow-1">
      <div class="row">
        <div class="col-12 pt-0">
          <div class="section ">1. Выберите дизайн</div>
          <design-carousel
            style="margin-left: -33px; margin-right: -33px"
            class="design-carousel"
            @change-certificate="changeCertificate"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12 pt-0 pb-1">
          <div class="section">2. Номинал</div>
          <div class="d-flex flex-row flex-wrap">
            <par
              :readonly="false"
              @input="selectedPar = null"
              v-model="customPar"
              :active="customPar !== null"
            />
            <par
              @change-par="changePar"
              v-for="(par, index) in options.pars"
              :value="par"
              :key="index"
              :active="par == selectedPar"
            />
          </div>
        </div>
        <div class="col-12 pt-0">
          <div class="section">3. Поздравление</div>
          <MlTextarea
            :rows="3"
            v-model="form.congratulation"
            placeholder="Не забудьте написать несколько приятных слов получателю сертификата"
          />

          <div
            class="d-flex flex-row align-center justify-content-between pt-3"
          >
            <a href="#" @click.prevent="openPreview">
              <img src="~@/assets/img/eye.png" alt="" />
              <span class="ml-text-14-20-500 ml-2">Предпросмотр</span>
            </a>
            <a
              href="#"
              v-if="isUpdate"
              @click.prevent="removeCertificate"
              class="ml-text-14-20-500 ml-text-red"
              >Удалить из корзины</a
            >
          </div>
        </div>
        <div class="col-12 mb-5" v-if="isUpdate && currentCertificate">
          <MlNumeric2 max="10" v-model="form.count" @input="changeCount" />
        </div>
      </div>
    </div>
    <div class="controlls" v-if="!isUpdate" ref="controlls">
      <button
        :disabled="isAllowContinue"
        @click.prevent="nextPage"
        class="ml-black-btn"
        style="width: 100%"
      >
        {{ titleNextBtn }}
      </button>
    </div>
    <div class="controlls" v-if="isUpdate" ref="controlls">
      <button @click.prevent="save" class="ml-black-btn" style="width: 100%">
        Сохранить изменения
      </button>
    </div>
  </div>
</template>

<script>
import designCarousel from '@/components/Panel/DesignCarousel'
import par from '@/components/Panel/Par'
import MlTextarea from '@/components/UI/MlTextarea'
import MlNumeric2 from '@/components/UI/MlNumeric2'
import MlNumeric from '@/components/UI/MlNumeric'
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'
import MixinObserveElement from '@/helpers/mixins/observeElement'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import certificateTypes from '@/store/certificate/types'
import basketTypes from '@/store/basket/types'
import { debounce, cloneDeep } from 'lodash'

export default {
  mixins: [MixinChangePanelPage, MixinObserveElement],
  components: {
    designCarousel,
    par,
    MlTextarea,
    MlNumeric2
  },
  data: () => ({
    alert: false,
    selectedPar: null,
    customPar: null,
    form: {
      id: null,
      certificate: null,
      congratulation: null,
      count: null
    }
  }),
  computed: {
    ...mapState({
      options: state => state.certificate.options,
      currentCertificate: state => state.basket.currentCertificate
    }),
    ...mapGetters(['verificationCode/isVerified', 'basket/allPositions']),
    observedElement() {
      return this.$refs.controlls
    },
    isUpdate() {
      return this.currentCertificate ? true : false
    },
    isAllowContinue() {
      const price = this.customPar ?? this.selectedPar
      return !this.form.certificate || !price
    },
    titleNextBtn() {
      const count = this['basket/allPositions']?.count
      return count > 0 ? 'Добавить в корзину' : 'Продолжить'
    }
  },
  created() {
    const DEBOUNCE_TIMEOUT = process.env.VUE_APP_DEBOUNCE_TIMEOUT ?? 2000
    this.debounced = {
      storeCertificate: debounce(this.storeCertificate, DEBOUNCE_TIMEOUT)
    }
  },
  mounted() {
    if (this.isUpdate) {
      this.loadCertificateFromStore()
    }
  },
  methods: {
    ...mapMutations('basket', [
      basketTypes.ADD_CERTIFICATE,
      basketTypes.UPDATE_CERTIFICATE,
      basketTypes.CALL_CONFIRM_MODAL
    ]),
    makeBasketItem() {
      let item = this.form
      item.price = this.customPar ?? this.selectedPar ?? null
      return item
    },
    openPreview() {
      this.$router.push('/preview-mobile')
    },
    save() {
      let data = this.makeBasketItem()
      this[basketTypes.UPDATE_CERTIFICATE](data)
      this.alert = true
      setTimeout(() => {
        this.$router.push('/basket')
      }, 1500)
    },
    changeCount(newValue) {
      this.form.count = newValue
      const data = this.makeBasketItem()
      this[basketTypes.UPDATE_CERTIFICATE](data)
    },
    removeCertificate() {
      this[basketTypes.CALL_CONFIRM_MODAL](this.currentCertificate)
    },
    loadCertificateFromStore() {
      this.form.id = this.currentCertificate.id
      this.form.congratulation = this.currentCertificate.congratulation
      this.form.certificate = this.currentCertificate.certificate
      this.form.count = this.currentCertificate.count
      const price = this.currentCertificate.price
      if (price) {
        if (this.options.pars.includes(price)) {
          this.selectedPar = price
        } else {
          this.customPar = price
        }
      }
    },
    changeCertificate(value) {
      this.form.certificate = value
    },
    storeCertificate() {
      let certificate = this.form
      certificate.price = this.customPar ?? this.selectedPar ?? null
      certificate.count = 1
      this[basketTypes.ADD_CERTIFICATE](certificate)
    },
    changePar(value) {
      this.selectedPar = value
      this.customPar = null
    },
    nextPage() {
      this.storeCertificate()
      if (this['verificationCode/isVerified']) {
        this.$router.push('/confirming')
      } else {
        this.$router.push('/sending')
      }
    }
  }
}
</script>
