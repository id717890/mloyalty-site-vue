<template>
  <div class="pb">
    <div
      class="mloyalty-faq-item"
      :ref="'mloyalty-faq-item-' + faq.id"
      v-for="faq in faqs"
      :key="faq.id"
    >
      <div class="mloyalty-question" @click="toggleFaq(faq.id)">
        {{ faq.question }}
        <img
          class="mloyalty-faq-arrow-right"
          src="~@/assets/img/faq-arrow-right.png"
        />
        <img
          class="mloyalty-faq-arrow-down"
          src="~@/assets/img/faq-arrow-down.png"
        />
      </div>
      <div class="mloyalty-answer" :ref="'answer-' + faq.id">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quos
        esse voluptate rem quas officiis perspiciatis quisquam totam, vitae
        maxime assumenda nemo sit voluptatem dolorem doloremque ipsam. Eaque,
        dolores iusto.
      </div>
    </div>
    <div class="text2">
      Не нашли ответ на свой вопрос? <br />
      <a href="#" @click.prevent="goToSupport">Свяжитесь с нами</a>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import panelBurgerTypes from '@/store/panelBurger/types'
import MixinChangeBurgerPage from '@/helpers/mixins/burger/changePage'
import { SUPPORT } from '@/helpers/const/widgetPage'

export default {
  name: 'FAQ-Page',
  mixins: [MixinChangeBurgerPage],
  data: () => ({
    faqs: [
      {
        id: 1,
        question: 'Что такое есть?',
        answer:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quos esse voluptate rem quas officiis perspiciatis quisquam totam, vitae maxime assumenda nemo sit voluptatem dolorem doloremque ipsam. Eaque, dolores iusto.'
      },
      {
        id: 2,
        question: 'Как начисляютяс бонусы?',
        answer:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quos esse voluptate rem quas officiis perspiciatis quisquam totam, vitae maxime assumenda nemo sit voluptatem dolorem doloremque ipsam. Eaque, dolores iusto.'
      },
      {
        id: 3,
        question: 'Как считаются бонусы?',
        answer:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quos esse voluptate rem quas officiis perspiciatis quisquam totam, vitae maxime assumenda nemo sit voluptatem dolorem doloremque ipsam. Eaque, dolores iusto.'
      },
      {
        id: 4,
        question: 'Где узнать об акциях?',
        answer:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quos esse voluptate rem quas officiis perspiciatis quisquam totam, vitae maxime assumenda nemo sit voluptatem dolorem doloremque ipsam. Eaque, dolores iusto.'
      },
      {
        id: 5,
        question: 'Где узнать о Партнёрах?',
        answer:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quos esse voluptate rem quas officiis perspiciatis quisquam totam, vitae maxime assumenda nemo sit voluptatem dolorem doloremque ipsam. Eaque, dolores iusto.'
      }
    ]
  }),
  methods: {
    ...mapMutations('panelBurger', [panelBurgerTypes.TOGGLE_PANEL_BURGER]),
    goToSupport() {
      this[panelBurgerTypes.TOGGLE_PANEL_BURGER](true)
      this.changePanelBurgerPage(SUPPORT)
    },
    toggleFaq(id) {
      let elFaq = this.$refs['mloyalty-faq-item-' + id][0]
      elFaq.classList.toggle('active')
      let el = this.$refs['answer-' + id][0]
      if (el.style.maxHeight) {
        el.style.maxHeight = null
        el.style.paddingTop = '0px'
      } else {
        el.style.maxHeight = el.scrollHeight + 10 + 'px'
        el.style.paddingTop = '10px'
      }
    }
  }
}
</script>
