<template>
  <div>
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
      </div>
    </div>
    <v-btn @click.stop="next"></v-btn>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { SENDING_PAGE } from '@/helpers/const/widgetPage'
import panelTypes from '@/store/panel/types'
import designCarousel from '../DesignCarousel'
import par from '../Par'
import MlTextarea from '@/components/UI/MlTextarea'

export default {
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
    ...mapMutations('panel', [panelTypes.CURRENT_PAGE_SET]),
    changePar(value) {
      this.selectedPar = value
      this.customPar = null
    },
    next() {
      this[panelTypes.CURRENT_PAGE_SET](SENDING_PAGE)
    }
  }
}
</script>
