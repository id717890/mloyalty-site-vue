<template>
  <div class="ml-panel-confirming-page h100 d-flex flex-column">
    <div class="pb flex-grow-1">
      <div class="row">
        <div class="col-12">
          <div class="section">Оформление</div>
        </div>
        <div class="col-12">
          <div class="total-counts">
            <span>Всего сертификатов</span>
            <span>{{ allPositions.count }}</span>
          </div>
          <div class="total-sum">
            <span>Общая стоимость</span>
            <span>{{ allPositions.price }}₽</span>
          </div>
        </div>
        <div class="col-12">
          <div class="text3">Контакты для отправки</div>
        </div>
        <div class="col-12 contacts">
          <div class="phone">
            <span>
              <template v-if="isTelegram">
                <v-icon class="mr-2">mdi-telegram</v-icon>
                <span>Telegram: </span>
              </template>
              <template v-if="isWhatsApp">
                <v-icon class="mr-2">mdi-whatsapp</v-icon>
                <span>WhatsApp: </span>
              </template>
              <template v-if="isViber">
                <img src="~@/assets/img/default/send-method-viber.png" alt="" />
                <span>Viber: </span>
              </template>
              <template v-if="isSms">
                <v-icon class="mr-2">mdi-message-processing-outline</v-icon>
                <span>СМС: </span>
              </template>
            </span>
            <span class="text-black">+7 {{ contacts.phone }}</span>
          </div>
          <div class="email">
            <span>
              <v-icon class="mr-2">mdi-email</v-icon>
              <span>E-mail: </span>
            </span>
            <span class="text-black">{{ contacts.email }}</span>
          </div>
        </div>
        <div class="col-12 pb-0">
          <div class="text3 mt-5">Карта лояльности</div>
        </div>
        <div class="col-12 pt-1">
          <v-text-field
            type="text"
            height="60"
            label="Номер карты лояльности"
            class="ml-input"
            outlined
            v-model="loyaltyCard"
          ></v-text-field>
          <p class="text2">
            Чтобы получить бонусы за покупку сертификата укажите номер карты
            лояльности BeautyBonus
          </p>
        </div>
      </div>
    </div>
    <div class="controlls">
      <a href="#" @click.prevent="next" class="ml-black-btn">
        Оплатить {{ allPositions.price }} ₽
      </a>
      <p class="text4 mt-3 mb-0">
        Нажимая кнопку "Оплатить", я соглашаюсь с Правилами использования
        подарочных карт и сертификатов и Офертой.
      </p>
    </div>
  </div>
</template>

<script>
import { SUCCESS_PAGE } from '@/helpers/const/widgetPage'
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'
import { mapGetters, mapState } from 'vuex'
import {
  SENDING_METHOD_TELEGRAM,
  SENDING_METHOD_WHATSAPP,
  SENDING_METHOD_VIBER,
  SENDING_METHOD_SMS
} from '@/helpers/const/sendingMethod'

export default {
  components: {},
  mixins: [MixinChangePanelPage],
  data: () => ({
    loyaltyCard: null
  }),
  computed: {
    ...mapGetters('basket', ['allPositions']),
    ...mapState({
      contacts: state => state.verificationCode.contacts
    }),
    isTelegram() {
      return this.contacts?.sendingMethod === SENDING_METHOD_TELEGRAM
    },
    isWhatsApp() {
      return this.contacts?.sendingMethod === SENDING_METHOD_WHATSAPP
    },
    isViber() {
      return this.contacts?.sendingMethod === SENDING_METHOD_VIBER
    },
    isSms() {
      return this.contacts?.sendingMethod === SENDING_METHOD_SMS
    }
  },
  methods: {
    next() {
      this.changePanelPage(SUCCESS_PAGE)
    }
  }
}
</script>
