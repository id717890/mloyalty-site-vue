<template>
  <div class="mloyalty-panel-footer">
    <div>
      <img
        class="shop-cart-icon"
        src="~@/assets/img/default/shopping-cart.svg"
        alt=""
      />
      <span class="ml-text-13-20 shop-cart-block" @click.prevent="openShopCart">
        Корзина
        <span class="shop-cart-count">{{ allPositions.count }}</span>
      </span>
    </div>

    <div class="d-flex mr-5">
      <a href="#" class="mloyalty-social-btn">
        <img src="~@/assets/img/default/social-icon-vk.png" alt="" />
      </a>
      <a href="#" class="mloyalty-social-btn">
        <img src="~@/assets/img/default/social-icon-facebook.png" alt="" />
      </a>
      <a href="#" class="mloyalty-social-btn">
        <img src="~@/assets/img/default/social-icon-ok.png" alt="" />
      </a>
    </div>
  </div>
</template>

<script>
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'
import { BASKET_PAGE, SENDING_PAGE } from '@/helpers/const/widgetPage'
import basketTypes from '@/store/basket/types'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  mixins: [MixinChangePanelPage],
  computed: {
    ...mapState({
      currentPage: state => state.panel.page
    }),
    ...mapGetters('basket', ['allPositions'])
  },
  methods: {
    openShopCart() {
      this.changePanelPage(BASKET_PAGE)
    }
  }
}
</script>
