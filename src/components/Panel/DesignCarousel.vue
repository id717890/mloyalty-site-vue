<template>
  <v-carousel height="230" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="(item, i) in items" :key="i">
      <v-img
        :aspect-ratio="16 / 9"
        class="ml-img-rounded"
        :src="require('@/assets/img/example/design1.png')"
      ></v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
