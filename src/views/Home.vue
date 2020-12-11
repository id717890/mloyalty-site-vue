<template>
  <div class="row h100">
    <div class="col-12 h100 d-flex justify-content-center align-center">
      <div class="d-flex flex-column">
        <h2>Что мне нужно?</h2>
        <img
          src="~@/assets/img/empty-cart.png"
          alt=""
          class="empty-cart-img mb-4"
        />
      </div>
      <div class="d-flex flex-column pl-10">
        <a href="#" class="ml-black-btn mb-6" @click.prevent="togglePanel"
          >Купить сертификат</a
        >
        <a href="#" class="ml-black-btn mb-6" @click.prevent="take"
          >Получить сертификат</a
        >
        <a href="#" class="ml-black-btn" @click.prevent="balance"
          >Узнать баланс сертификата</a
        >
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapMutations } from 'vuex'
import panelTypes from '@/store/panel/types'

export default {
  name: 'Home',
  components: {},
  methods: {
    ...mapMutations('panel', [panelTypes.TOGGLE_PANEL]),

    togglePanel() {
      this[panelTypes.TOGGLE_PANEL](!this.showPanel)
    },
    take() {
      console.log('take')
    },
    balance() {
      console.log('balance')
    }
  }
}
</script>
