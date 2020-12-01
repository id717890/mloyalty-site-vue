import { FAQ_PAGE } from '@/helpers/const/widgetPage'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      component: state => state.panelBurger.page
    }),
    title() {
      switch (this.component) {
        case FAQ_PAGE:
          return 'Частые вопросы'
      }
      return 123
    }
  }
}
