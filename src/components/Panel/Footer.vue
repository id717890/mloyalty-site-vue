<template>
  <div class="mloyalty-panel-footer">
    <div>
      <img
        class="shop-cart-icon"
        src="~@/assets/img/default/shopping-cart.png"
        alt=""
      />
      <span class="shop-cart-block" @click.prevent="openShopCart">
        Корзина
        <span class="shop-cart-count">2</span>
      </span>
    </div>

    <div class="d-flex mr-5">
      <a href="#" class="social-btn">
        <img src="~@/assets/img/default/social-icon-vk.png" alt="" />
      </a>
      <a href="#" class="social-btn">
        <img src="~@/assets/img/default/social-icon-facebook.png" alt="" />
      </a>
      <a href="#" class="social-btn">
        <img src="~@/assets/img/default/social-icon-ok.png" alt="" />
      </a>
    </div>
  </div>
</template>

<script>
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'
import { BASKET_PAGE } from '@/helpers/const/widgetPage'

export default {
  mixins: [MixinChangePanelPage],
  methods: {
    openShopCart() {
      this.changePanelPage(BASKET_PAGE)
    }
  }
}
</script>

<style></style>
