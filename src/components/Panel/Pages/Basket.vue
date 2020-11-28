<template>
  <div class="ml-panel-basket-page h100">
    <div class="d-flex flex-column align-center" v-if="!basket">
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
    <div class="h100 d-flex flex-column" v-else>
      <div class="pb">
        <div class="row">
          <div class="col-12">
            <div class="section">Корзина</div>
          </div>
        </div>
        <div class="row" v-for="(item, itemIndex) in basket" :key="itemIndex">
          <div class="col-12">
            <div class="ml-basket-item">
              <div class="image">
                <v-img
                  :aspect-ratio="16 / 9"
                  class="ml-img-rounded"
                  :src="require('@/assets/img/example/design1.png')"
                ></v-img>
              </div>
              <div class="content">
                <div class="first">
                  {{ shortText(item.certification.text) }}
                </div>
                <!-- <div class="first">{{ 123 }}</div> -->
                <div class="second">
                  <MlNumeric v-model="item.count"> </MlNumeric>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 basket-total">
            <div class="text1">Общая стоимость</div>
            <div class="text1">{{ totalPrice }}₽</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <a href="#" @click.prevent="" class="ml-silver-btn">
              <v-icon>mdi-plus</v-icon>
              Добавить еще сертификат
            </a>
          </div>
        </div>
      </div>
      <div class="pb flex-grow-1" style="border-top: 1px solid #E6E6E6">
        <div class="section">Контакты для отправки</div>
        <div class="text2">
          Укажите ваши контакты, чтобы мы могли отправить на них сообщение со
          ссылкой на сертификаты(ы). После получения сообщения вы сможете
          переслать его кому угодно.
        </div>
      </div>
      <div class="controlls">
        <a href="#" @click.prevent="nextPage" class="ml-black-btn">
          Указать контакты для отправки
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'
import { START_PAGE } from '@/helpers/const/widgetPage'
import { mapState } from 'vuex'
import MlNumeric from '@/components/UI/MlNumeric'

export default {
  mixins: [MixinChangePanelPage],
  components: {
    MlNumeric
  },
  computed: {
    ...mapState({
      basket: state => state.basket.basket
    }),
    totalPrice() {
      let sum = 0
      if (this.basket) {
        this.basket.forEach(item => {
          const price = item?.price
          const count = item?.count
          if (price) sum += price * count
        })
      }
      return sum
    }
  },
  methods: {
    shortText(str) {
      if (str && str.length > 50) {
        return `${str.substring(0, 50)}...`
      }
      return str
    },
    addCertificate() {
      let i = this.changePanelPage(START_PAGE)
    }
  }
}
</script>
