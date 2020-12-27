<template>
  <div class="vh100 mloyalty-preview-mobile">
    <div
      v-if="!show"
      class="vh100 d-flex justify-content-center align-items-center"
    >
      <SwipeButton
        ref="swipeButton"
        initialInstructionText="потяните, чтобы открыть"
        class="ml-swipe-button"
        @actionConfirmed="onActionConfirmed"
      />
    </div>
    <div style="width: 100%" v-show="show">
      <div class="mloyalty-panel-header-2 px-8 ">
        <a
          href="#"
          class="d-flex align-items-center ml-title-14-20 ml-text-grey"
          @click.prevent="goBack"
        >
          <img src="@/assets/img/arrow-left.png" alt="" class="mr-2" />
          Назад
        </a>
        <div class="ml-text-16-24-600 flex-grow-1 text-center">
          Предпросмотр
        </div>
      </div>
      <img
        class="mloyalty-confeti"
        ref="confeti"
        src="@/assets/img/confetti.png"
        alt=""
      />
      <div
        class="mloyalty-perview-card mloyalty-perview-card-shrink"
        ref="preview"
      >
        <div style="padding: 0 40px">
          <div class="row">
            <div
              class="col-12 text-center d-flex flex-column align-items-center"
            >
              <img src="@/assets/img/example/riv-gosh.png" alt="" />
              <div class="ml-title1-24-32-600 mb-2">Сертификат</div>
              <div class="ml-title1-24-32-600 mb-2">на 3000 ₽</div>
              <div class="ml-title1-24-32-600 mb-2 m-title-hidden">
                «РивГош»
              </div>
              <div class="ml-title3-14-24 mt-2 mb-1">
                Действует до 29.04.2020
              </div>
              <div class="ml-text-16-24 ml-text-grey1 mt-6 text-left">
                С днем рождения! Желаю крепкого здоровья, удачи, благополучия,
                добра, радости, любви, счастья, хорошего настроения, улыбок,
                ярких впечатлений. Пусть тепло и уют всегда наполняют твой дом,
                пусть солнечный свет согревает в любую погоду, при одной мысли о
                них.
              </div>
            </div>
            <div class="col-12 d-flex flex-column align-items-center">
              <img
                src="@/assets/img/example/riv-gosh-card.png"
                alt=""
                class="mb-8 mloyalty-certificate-image"
              />
              <img
                src="@/assets/img/example/riv-gosh-bar-code.png"
                class="mb-2"
                alt=""
              />
              <div class="ml-text-16-24 ml-text-grey">
                Номер: 2998760000012
              </div>
              <div class="ml-title-4-18-32-500">
                PIN-код: 6789
              </div>
            </div>
            <div class="col-12  d-flex flex-column align-items-center">
              <a
                href="#"
                class="ml-silver-btn w100 d-flex align-items-center justify-content-center mb-2"
                style="min-width: 290px"
              >
                <img
                  class="mr-3"
                  src="@/assets/img/example/wallet.png"
                  alt=""
                />
                Сохранить в Wallet
              </a>
              <a
                href="#"
                class="ml-silver-btn mb-2 w100"
                style="min-width: 290px"
              >
                Сохранить в галерею
              </a>
              <a
                href="#"
                class="ml-silver-btn mb-3 w100"
                style="min-width: 290px"
              >
                Отправить на E-mail
              </a>
            </div>
          </div>
          <div class="row ">
            <div class="col-12 how-use">
              <div class="ml-text-20-32-600 mb-3 mt-3">
                Как использовать?
              </div>
              <div class="item">
                <div class="numb">1</div>
                <div class="content">Сохраните сертификат и PIN-код</div>
              </div>
              <div class="item">
                <div class="numb">2</div>
                <div class="content">
                  Выберите магазин, в котором можно использовать сертификат
                </div>
              </div>
              <div class="item">
                <div class="numb">3</div>
                <div class="content">
                  Сообщите или введите в магазине номер сертификата и PIN-код
                </div>
              </div>
              <div class="item">
                <div class="numb">4</div>
                <div class="content">
                  Оплатите всю или часть покупки сертификатом
                </div>
              </div>

              <div class="ml-text-13-24 my-6">
                <span>
                  Подробности на сайте
                  <a href="https://rivegauche.ru" target="_blank">
                    rivegauche.ru</a
                  >
                </span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="text7 mt-2 mb-2">Часто задаваемые вопросы</div>
              <faq style="margin-left: -32px; margin-right: -32px" />
            </div>
          </div>
        </div>
        <certificate-footer />
      </div>
    </div>
  </div>
</template>

<script>
import SwipeButton from '@/components/UI/SwipeButton'
import faq from '@/components/Burger/Pages/FAQ'
import certificateFooter from '@/components/CertificateFooter'

export default {
  components: { SwipeButton, faq, certificateFooter },
  data: () => ({
    show: false
  }),
  methods: {
    goBack() {
      this.$router.push('/')
    },
    onActionConfirmed() {
      this.$refs.preview.classList.add('mloyalty-perview-card-shrink')
      setTimeout(() => {
        this.show = true
        this.bounce()
        // this.$refs.swipeButton.reset()
      }, 300)
    },
    bounce() {
      setTimeout(() => {
        this.$refs.preview.classList.remove('mloyalty-perview-card-shrink')
        this.$refs.confeti.classList.add('mloyalty-confeti-bounce')
        setTimeout(() => {
          this.$refs.confeti.remove()
        }, 400)
      }, 100)
    }
  },
  mounted() {
    // this.bounce()
  }
}
</script>
