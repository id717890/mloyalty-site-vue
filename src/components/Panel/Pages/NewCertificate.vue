<template>
  <div class="d-flex flex-column h100">
    <div class="pb flex-grow-1">
      <div class="row">
        <div class="section">1. Выберите дизайн</div>
        <design-carousel
          :items="options.certificates"
          :current="this.form.certificate"
          class="design-carousel"
          @change-certificate="changeCertificate"
        />
      </div>
      <div class="row">
        <div class="col-12">
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
        <div class="col-12">
          <div class="section">3. Поздравление</div>
          <MlTextarea
            v-model="form.congratulation"
            placeholder="Ваше поздравление (необязательно)"
          />

          <div class="d-flex flex-row align-center">
            <a href="#">
              <img src="~@/assets/img/eye.png" alt="" />
              <span class="preview-eye">Предпросмотр</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="controlls">
      <button
        :disabled="isAllowContinue"
        @click.prevent="nextPage"
        class="ml-black-btn"
        style="width: 100%"
      >
        Продолжить
      </button>
    </div>
  </div>
</template>

<script>
import { SENDING_PAGE } from '@/helpers/const/widgetPage'
import designCarousel from '../DesignCarousel'
import par from '../Par'
import MlTextarea from '@/components/UI/MlTextarea'
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'
import { mapActions, mapMutations, mapState } from 'vuex'
import certificateTypes from '@/store/certificate/types'
import basketTypes from '@/store/basket/types'
import { debounce } from 'lodash'

export default {
  mixins: [MixinChangePanelPage],
  components: {
    designCarousel,
    par,
    MlTextarea
  },
  data: () => ({
    selectedPar: null,
    customPar: null,
    form: {
      certificate: null,
      congratulation: null
    }
  }),
  computed: {
    ...mapState({
      options: state => state.certificate.options,
      selectedCertificate: state => state.certificate.selectedCertificate
    }),
    isAllowContinue() {
      const price = this.customPar ?? this.selectedPar
      return !this.form.certificate || !this.form.congratulation || !price
    }
  },
  watch: {
    customPar() {
      // this.debounced.storeCertificate()
    },
    'form.congratulation'() {
      // this.debounced.storeCertificate()
    }
  },
  mounted() {
    // this.loadCertificateFromStore()
    // this.debounced.storeCertificate()
  },
  created() {
    const DEBOUNCE_TIMEOUT = process.env.VUE_APP_DEBOUNCE_TIMEOUT ?? 2000
    this.debounced = {
      storeCertificate: debounce(this.storeCertificate, DEBOUNCE_TIMEOUT)
    }
  },
  methods: {
    ...mapMutations('basket', [basketTypes.ADD_CERTIFICATE]),
    ...mapMutations('certificate', [certificateTypes.STORE_CURRENT_CERIFICATE]),
    loadCertificateFromStore() {
      if (this.selectedCertificate) {
        this.form.congratulation = this.selectedCertificate.congratulation
        this.form.certificate = this.selectedCertificate.certificate
        const par = this.selectedCertificate.par
        if (par) {
          if (this.options.pars.includes(par)) {
            this.selectedPar = par
          } else {
            this.customPar = par
          }
        }
      }
    },
    changeCertificate(value) {
      this.form.certificate = value
      // this.debounced.storeCertificate()
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
      this.changePanelPage(SENDING_PAGE)
      // this[panelTypes.CURRENT_PAGE_SET](SENDING_PAGE)
    }
  }
}
</script>
