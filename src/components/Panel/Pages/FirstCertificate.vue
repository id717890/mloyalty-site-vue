<template>
  <div class="d-flex flex-column">
    <div class="pb flex-grow-1">
      <div class="row">
        <div class="section">1. Выберите дизайн</div>
        <design-carousel :items="designs" class="design-carousel" />
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
              v-for="(par, index) in pars"
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
      <a href="#" @click.prevent="nextPage" class="ml-black-btn">
        Продолжить
      </a>
    </div>
  </div>
</template>

<script>
import { SENDING_PAGE } from '@/helpers/const/widgetPage'
import designCarousel from '../DesignCarousel'
import par from '../Par'
import MlTextarea from '@/components/UI/MlTextarea'
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'

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
      congratulation: null
    },
    pars: [500, 1000, 3000, 5000, 10000],
    designs: [
      { img: '@/assets/img/example/design1.png' },
      { img: '@/assets/img/example/design1.png' },
      { img: '@/assets/img/example/design1.png' }
    ]
  }),
  methods: {
    // ...mapMutations('panel', [panelTypes.CURRENT_PAGE_SET]),
    changePar(value) {
      this.selectedPar = value
      this.customPar = null
    },
    nextPage() {
      this.changePanelPage(SENDING_PAGE)
      // this[panelTypes.CURRENT_PAGE_SET](SENDING_PAGE)
    }
  }
}
</script>
