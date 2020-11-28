<template>
  <div class="ml-panel-basket-page">
    <div class="d-flex flex-column align-center">
      <img src="~@/assets/img/empty-cart.png" alt="" class="empty-cart-img" />
      <section class="empty-text">
        <div>Ваша корзина пока пуста.</div>
        <div>Добавьте первый сертификат</div>
      </section>
      <a href="#" @click.prevent="addCertificate" class="ml-black-btn">
        <v-icon>mdi-plus</v-icon>
        Добавить сертификат
      </a>
    </div>
  </div>
</template>

<script>
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'
import { START_PAGE } from '@/helpers/const/widgetPage'
export default {
  mixins: [MixinChangePanelPage],
  methods: {
    addCertificate() {
      this.changePanelPage(START_PAGE)
    }
  }
}
</script>

<style></style>
