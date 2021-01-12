import appTypes from '@/store/app/types'
import { mapMutations } from 'vuex'

export default {
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleScroll)
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleScroll)
  },
  methods: {
    ...mapMutations('app', [appTypes.SET_BOTTOM_OFFSET]),
    handleScroll() {
      const el = this.observedElement
      if (el) {
        console.log('el not null')
        const windowHeight = window.innerHeight // высота видимой области
        const offsetTop = this.$refs.controlls.offsetTop // отсут контрола от верха окна
        const windowScrollY = window.scrollY
        const diff = offsetTop - windowHeight
        if (diff >= windowScrollY) {
          this[appTypes.SET_BOTTOM_OFFSET](0)
        } else {
          this[appTypes.SET_BOTTOM_OFFSET](windowScrollY - diff)
        }
      }
    }
  }
}
