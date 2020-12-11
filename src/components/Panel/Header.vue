<template>
  <section>
    <div class="mloyalty-panel-header" v-if="!preview">
      <img class="logo" src="~@/assets/img/default/header-logo.png" alt="" />
      <a href="#" class="how-its-work">
        Дарить легко
      </a>
      <a href="#" class="how-its-work" @click.prevent="goHowItsWork">
        Как это работает
      </a>
      <img
        src="~@/assets/img/default/burger.png"
        class="burger"
        alt=""
        @click.stop="togglePanelBurger"
      />
    </div>
    <div class="mloyalty-panel-header px-8" v-else>
      <a href="#" class="back-link" @click.prevent="goBack">
        <img src="@/assets/img/arrow-left.png" alt="" class="mr-2" />
        Назад
      </a>
      <div class="title flex-grow-1">Предпросмотр</div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import panelBurgerTypes from '@/store/panelBurger/types'
import MixinBurgerChagePage from '@/helpers/mixins/burger/changePage'
import MixinChagePage from '@/helpers/mixins/panel/changePage'
import { HOW_ITS__WORK, START_PAGE } from '@/helpers/const/widgetPage'

export default {
  props: {
    preview: {
      type: Boolean,
      default: false
    }
  },
  mixins: [MixinChagePage, MixinBurgerChagePage],
  computed: {},
  methods: {
    ...mapMutations('panelBurger', [panelBurgerTypes.TOGGLE_PANEL_BURGER]),
    togglePanelBurger() {
      this[panelBurgerTypes.TOGGLE_PANEL_BURGER]()
    },
    goHowItsWork() {
      this.changePanelBurgerPage(HOW_ITS__WORK)
      this.togglePanelBurger()
    },
    goBack() {
      this.changePanelPage(START_PAGE)
    }
  }
}
</script>
