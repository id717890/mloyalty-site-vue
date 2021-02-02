import types from './types'

export default {
  [types.SET_YOOKASSA_PAYMENT](state, payload) {
    state.payment = payload
  }
}
