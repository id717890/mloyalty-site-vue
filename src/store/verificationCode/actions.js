import types from './types'

export default {
  [types.SEND_VERIFICATIONCODE_VIA_SMS]: async ({ commit }, payload) => {
    commit(types.INIT_VERIFICATION_CODE_PROCESS, true)
    const fakePromise = new Promise(resolve => {
      setTimeout(() => {
        if (payload === 1111) {
          resolve({ success: true })
        } else {
          resolve({ success: false })
        }
        commit(types.INIT_VERIFICATION_CODE_PROCESS, false)
      }, 1000)
    })
    return fakePromise
  },
  [types.SEND_VERIFICATIONCODE_VIA_MESSANGER]: async ({ commit }, payload) => {
    commit(types.INIT_VERIFICATION_CODE_PROCESS, true)
    const fakePromise = new Promise(resolve => {
      setTimeout(() => {
        if (payload === 1111) {
          resolve({ success: true })
        } else {
          resolve({ success: false })
        }
        commit(types.INIT_VERIFICATION_CODE_PROCESS, false)
      }, 1000)
    })
    return fakePromise
  }
}
