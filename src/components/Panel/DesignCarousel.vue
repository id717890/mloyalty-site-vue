<template>
  <div v-if="options">
    <div class="loading-designs" v-if="loading">
      <v-progress-circular
        indeterminate
        size="30"
        color="primary"
      ></v-progress-circular>
    </div>
    <swiper
      @slideChange="slideChange"
      class="mloyalty-swiper swiper"
      ref="swiper-cert"
      :options="swiperOption"
    >
      <swiper-slide
        class="mloyalty-swiper-slide"
        v-for="(item, i) in options.certificates"
        :key="i"
      >
        <div class="mloyalty-swiper-slide-wrapper">
          <div class="overlay"></div>
          <img :src="item.img" alt="" height="200" />
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

// import style (<= Swiper 5.x)
// import 'swiper/css/swiper.css'
import 'swiper/swiper.scss'

import { Swiper as SwiperClass, Pagination } from 'swiper/swiper.esm'
// import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
SwiperClass.use([Pagination])
// Vue.use(getAwesomeSwiper(SwiperClass))

import { mapGetters, mapState } from 'vuex'
import { set } from 'date-fns'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data: () => ({
    loading: true,
    swiperOption: {
      autoHeight: true,
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      loop: true,
      // centeredSlides: true,
      spaceBetween: 8,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    }
  }),
  methods: {
    async init() {
      if (this.currentCerificate) {
        const findCertificate = this.options?.certificates.find(
          x => x.id === this.currentCerificate.certificate.id
        )
        if (findCertificate) {
          const index = this.options.certificates.indexOf(findCertificate)
          console.log('pos ', index)
          this.swiper.slideTo(index, 500, false)
          this.$emit('change-certificate', findCertificate)
        }
      } else {
        this.$emit('change-certificate', this.options.certificates[0])
      }
      setTimeout(() => {
        console.log('init + loading')
        this.offsetSlide(false)
      })
    },
    slideChange(item) {
      console.log('slideChange')
      const count = this.countCertificates
      if (!count) return
      const index = item.activeIndex
      let diff = index - count
      if (diff === count) {
        diff = 0
      } else if (diff < 0) {
        diff = index
      }
      const cert = this.options.certificates[diff]
      this.$emit('change-certificate', cert)
      this.offsetSlide()
    },
    /** Смещение слайдера как в дизайне */
    offsetSlide(isLoading = null) {
      let item = this.$refs['swiper-cert'].$swiper
      console.log('offsetSlide OUT', item)
      if (item) {
        console.log('offsetSlide IN', item)
        let el = document.getElementsByClassName('swiper-wrapper')[0]
        let translateX = item.translate
        const offset = translateX + 35
        this.$nextTick(() => {
          console.log('move ', translateX, offset)
          setTimeout(() => {
            el.style.transform = `translate3d(${offset}px, 0px, 0px)`
          }, 100)
          if (isLoading !== null) {
            this.loading = isLoading
          }
        })
      }
      return Promise.resolve()
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    ...mapState({
      options: state => state.certificate.options
    }),
    ...mapGetters(['basket/currentCertificate']),
    currentCerificate() {
      return this['basket/currentCertificate']
    },
    swiper() {
      return this.$refs['swiper-cert'].$swiper
    },
    countCertificates() {
      const count = this.options.certificates.length
      return count ? count : 0
    }
  }
}
</script>
