import types from './types'

export default {
  [types.REMOVE_CERTIFICATE_ACTION]({ commit }) {
    commit(types.REMOVE_CERTIFICATE)
    return Promise.resolve()
  }
}
