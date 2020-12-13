<template>
  <div>
    <div class="row pb">
      <div class="col-12">
        <div class="section">Проверка баланса</div>
      </div>
      <div class="col-12">
        <span class="text2">Введите последние 4 цифры номера сертификата</span>
        <MlInputCode4 @change="numberOfCertificate = $event" />
      </div>
      <div class="col-12">
        <span class="text2">Введите ПИН код</span>
        <MlInputCode4 @change="pincode = $event" />
      </div>
      <div class="col-12">
        <span class="text2">Введите номер телефона</span>
        <v-text-field
          color="dark"
          prepend-inner-icon="+7"
          append-icon="mdi-check"
          v-mask="'(###) ###-##-##'"
          required
          height="60"
          label="Ваш телефон*"
          class="ml-input ml-input-prepend-inner"
          :class="{ novalidate: validatePhone === false }"
          outlined
          v-model="phone"
        ></v-text-field>
        <button
          v-if="!successVerification && !isSentVerificationCode"
          :disabled="!validatePhone"
          href="#"
          class="ml-black-btn w100"
          @click.stop="sendVerificationCode"
        >
          Подтвердить
        </button>
      </div>
      <div class="col-12">
        <verification-code
          @success="successVerificationProcess"
          v-if="isSentVerificationCode && !successVerification"
          :type="verificationType"
        />
        <template v-if="successVerification">
          <div class="col-12 px-0 pt-0">
            <v-icon class="success-message">mdi-check-circle</v-icon>
            <span class="ml-2">Номер подтвержден!</span>
          </div>
          <div class="col-12 px-0">
            <button
              :disabled="!validatePhone"
              href="#"
              @click.prevent="nextPage"
              class="ml-black-btn w100"
            >
              Узнать баланс
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import MlInputCode4 from '@/components/UI/MlInputCode4'
import { mask } from 'vue-the-mask'
import { VERIFICATION_BY_SMS } from '@/helpers/const/sendingMethod'
import verificationCode from '@/components/Panel/VerificationCode'

export default {
  directives: {
    mask
  },
  components: {
    MlInputCode4,
    verificationCode
  },
  data: () => ({
    numberOfCertificate: null,
    pincode: null,
    phone: null,
    successVerification: null,
    isSentVerificationCode: false
  }),
  computed: {
    verificationType() {
      return VERIFICATION_BY_SMS
    },
    validatePhone() {
      return this.phone?.length === 15
    }
  },
  methods: {
    sendVerificationCode() {
      this.isSentVerificationCode = true
    },
    successVerificationProcess() {
      this.successVerification = true
    }
  }
}
</script>

<style></style>
