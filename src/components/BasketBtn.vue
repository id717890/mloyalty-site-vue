<template>
  <v-btn
    fab
    small
    width="48"
    height="48"
    class="mloyalty-circle-basket"
    elevation="0"
    @click.prevent="openShopCart"
  >
    <img
      class="shop-cart-icon"
      src="~@/assets/img/default/shopping-cart.png"
      alt=""
    />
    <span class="shop-cart-count">{{ allPositions.count }}</span>
  </v-btn>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('basket', ['allPositions'])
  },
  methods: {
    openShopCart() {
      this.$router.push('/basket')
    }
  }
}
</script>
