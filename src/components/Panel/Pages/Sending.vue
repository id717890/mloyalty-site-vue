<template>
  <div class="ml-panel-sending-page">
    <div class="row">
      <div class="col-12">
        <div class="pb">
          <div class="row">
            <div class="section">Отправка</div>
          </div>
          <div class="row">
            <div class="col-12">
              <v-text-field
                append-icon="mdi-check"
                type="email"
                required
                :rules="emailRules"
                height="60"
                label="Ваш e-mail*"
                class="ml-input"
                :class="{ novalidate: validateEmail === false }"
                outlined
                v-model="form.email"
              ></v-text-field>
              <div class="ml-input-noty">
                E-mail нужен для оперативного ответа службы тех. поддержки в
                случае неуспешной отправки сертификата.
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="text1">Выберите, как вам отправить сертификат(ы)</div>
              <div class="ml-input-noty">
                Сообщение со ссылкой на сертификат(ы) будет отправлено вам по
                мессенджеру или в sms. После его получения вы сможете переслать
                его кому угодно.
              </div>
            </div>
            <div class="col-12 d-flex">
              <a
                href="#"
                class="ml-sending-method-btn mr-2"
                :class="{ active: isSendingMethodTelegram }"
                @click.prevent="form.sendingMethod = 'telegram'"
              >
                <v-icon>mdi-telegram</v-icon>
              </a>
              <a
                href="#"
                class="ml-sending-method-btn mr-2"
                :class="{ active: isSendingMethodWhatsApp }"
                @click.prevent="form.sendingMethod = 'whatsapp'"
              >
                <v-icon>mdi-whatsapp</v-icon>
              </a>
              <a
                href="#"
                class="ml-sending-method-btn mr-2"
                :class="{ active: isSendingMethodViber }"
                @click.prevent="form.sendingMethod = 'viber'"
              >
                <img src="~@/assets/img/default/send-method-viber.png" alt="" />
              </a>
              <a
                href="#"
                class="ml-sending-method-btn"
                :class="{ active: isSendingMethodSms }"
                @click.prevent="form.sendingMethod = 'sms'"
              >
                <v-icon>mdi-message-processing-outline</v-icon>
              </a>
            </div>
          </div>
          <div class="row" v-if="isShowPhone">
            <div class="col-12 d-flex flex-column">
              <v-text-field
                prepend-inner-icon="+7"
                append-icon="mdi-check"
                v-mask="'(###) ###-##-##'"
                required
                height="60"
                label="Ваш телефон*"
                class="ml-input ml-input-prepend-inner"
                :class="{ novalidate: validatePhone === false }"
                outlined
                v-model="form.phone"
              ></v-text-field>
              <button
                :disabled="!validatePhone"
                href="#"
                class="ml-black-btn w100"
              >
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-btn @click.stop="next"></v-btn>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { START_PAGE } from '@/helpers/const/widgetPage'
import panelTypes from '@/store/panel/types'
import { mask } from 'vue-the-mask'

const METHOD_TELEGRAM = 'telegram'
const METHOD_WHATSAPP = 'whatsapp'
const METHOD_VIBER = 'viber'
const METHOD_SMS = 'sms'

export default {
  directives: { mask },
  data: () => ({
    form: {
      email: null,
      phone: null,
      sendingMethod: null
    },
    emailRules: [
      v => !!v || 'Необходимо заполнить e-mail',
      v => /.+@.+/.test(v) || 'Введен некорректный e-mail'
    ]
  }),
  computed: {
    isShowPhone() {
      return this.form.sendingMethod === null ? false : true
    },
    validateEmail() {
      return /.+@.+/.test(this.form.email)
    },
    validatePhone() {
      return this.form?.phone?.length === 15
    },
    isSendingMethodTelegram() {
      return this.form.sendingMethod === METHOD_TELEGRAM
    },
    isSendingMethodWhatsApp() {
      return this.form.sendingMethod === METHOD_WHATSAPP
    },
    isSendingMethodViber() {
      return this.form.sendingMethod === METHOD_VIBER
    },
    isSendingMethodSms() {
      return this.form.sendingMethod === METHOD_SMS
    }
  },
  methods: {
    ...mapMutations('panel', [panelTypes.CURRENT_PAGE_SET]),
    isSendingMethod(value) {
      return value === this.sendingMethod
    },
    next() {
      this[panelTypes.CURRENT_PAGE_SET](START_PAGE)
    },
    preventNumericInput($event) {
      console.log($event.keyCode) //will display the keyCode value

      var keyCode = $event.keyCode ? $event.keyCode : $event.which
      if (keyCode > 47 && keyCode < 58) {
      } else {
        $event.preventDefault()
      }
    },
    inputPhone() {
      this.form.phone = this.maskedPhone(this.form.phone)
    },
    maskedPhone(text) {
      let result = ''
      if (!text.length) return text
      if (text.length > 0 && text.length <= 3) {
        result = `(${text})`
      } else if (text.length > 3 && text.length <= 6) {
        result = `(${text.substring(0, 3)}) ${text.substring(3)}`
      } else if (text.length > 6 && text.length <= 8) {
        result = `(${text.substring(0, 3)}) ${text.substring(
          3,
          6
        )} - ${text.substring(6)}`
      } else if (text.length > 8) {
        result = `(${text.substring(0, 3)}) ${text.substring(
          3,
          6
        )} - ${text.substring(6, 8)} - ${text.substring(8)}`
      }
      if (result.length > 10) result = result.substring(0, 19)
      return result
    },
    formatPhoneNumber(str) {
      console.log(str)
      //Filter only numbers from the input
      let cleaned = ('' + str).replace(/\D/g, '')

      //Check if the input is of correct length
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/)
      console.log('match', match)

      if (match) {
        return (
          '(' + match[1] + ') ' + match[2] + '-' + match[3] + '-' + match[4]
        )
      }

      return null
    }
  }
}
</script>
