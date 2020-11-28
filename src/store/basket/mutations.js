import types from './types'

export default {
  [types.SET_BASKET](state, basket) {
    state.basket = basket
  }
}
