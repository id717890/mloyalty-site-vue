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
      <div
        class="mloyalty-answer"
        :ref="'answer-' + faq.id"
        v-html="fakeText"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Offer-Page',
  data: () => ({
    fakeText: `Здесь будет текст соответствующего раздела оферты, он будет подтягиваться из api, после того как менеджер его  задаст самостоятельно или использует типовую форму, предлагаемую сервисом.`,
    faqs: [
      {
        id: 1,
        question: 'Продавец',
        answer:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quos esse voluptate rem quas officiis perspiciatis quisquam totam, vitae maxime assumenda nemo sit voluptatem dolorem doloremque ipsam. Eaque, dolores iusto.'
      },
      {
        id: 2,
        question: 'Термины и определения',
        answer:
          'В разделе «Профиль» ты можешь подробнее рассказть нам о себе и получить за это дополнительные бонусы'
      },
      {
        id: 3,
        question: 'Предмет договора',
        answer:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quos esse voluptate rem quas officiis perspiciatis quisquam totam, vitae maxime assumenda nemo sit voluptatem dolorem doloremque ipsam. Eaque, dolores iusto.'
      },
      {
        id: 4,
        question: 'Права и обязанности',
        answer:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quos esse voluptate rem quas officiis perspiciatis quisquam totam, vitae maxime assumenda nemo sit voluptatem dolorem doloremque ipsam. Eaque, dolores iusto.'
      },
      {
        id: 5,
        question: 'Ответственность сторон',
        answer:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quos esse voluptate rem quas officiis perspiciatis quisquam totam, vitae maxime assumenda nemo sit voluptatem dolorem doloremque ipsam. Eaque, dolores iusto.'
      },
      {
        id: 6,
        question: 'Общие положения',
        answer:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quos esse voluptate rem quas officiis perspiciatis quisquam totam, vitae maxime assumenda nemo sit voluptatem dolorem doloremque ipsam. Eaque, dolores iusto.'
      },
      {
        id: 7,
        question: 'Политика конфиденциальности',
        answer:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quos esse voluptate rem quas officiis perspiciatis quisquam totam, vitae maxime assumenda nemo sit voluptatem dolorem doloremque ipsam. Eaque, dolores iusto.'
      }
    ]
  }),
  methods: {
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
