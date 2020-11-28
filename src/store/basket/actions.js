import types from './types'

const testBasket = [
  {
    certification: {
      text:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla unde architecto quod nostrum minus numquam sint blanditiis distinctio. Voluptates facere eaque beatae vero eum, neque dolor odit facilis. Aperiam, eligendi?'
    },
    count: 2,
    price: 3000
  }
]

export default {
  [types.INIT_EMPTY_BASKET]({ commit }) {
    commit(types.SET_BASKET, null)
  },
  [types.INIT_TEST_BASKET]({ commit }) {
    commit(types.SET_BASKET, testBasket)
  }
}
