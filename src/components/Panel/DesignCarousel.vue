<template>
  <div v-if="options">
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
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data: () => ({
    swiperOption: {
      autoHeight: true,
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      loop: true,
      centeredSlides: true,
      spaceBetween: 8,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    }
  }),
  methods: {
    init() {
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
    },
    change(value) {
      this.$emit('change-certificate', this.options.certificates[value])
    },
    slideChange(item) {
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
