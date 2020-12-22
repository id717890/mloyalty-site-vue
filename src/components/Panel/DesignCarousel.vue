<template>
  <v-carousel
    v-if="options"
    @change="change"
    height="210"
    hide-delimiter-background
    show-arrows-on-hover
    class="mb-0 ml-certificate-carousel"
  >
    <v-carousel-item v-for="(item, i) in options.certificates" :key="i">
      <v-img
        height="210"
        :aspect-ratio="16 / 9"
        class="ml-img-rounded"
        :src="item.img"
      ></v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {
    change(value) {
      this.$emit('change-certificate', this.options.certificates[value])
    }
  },
  computed: {
    ...mapState({
      options: state => state.certificate.options
    })
  }
}
</script>
