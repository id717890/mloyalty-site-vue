import types from './types'

export default {
  [types.INIT_VERIFICATION_CODE_PROCESS]: (state, isLoading) => {
    state.isInitCodeInProccess = isLoading
  },
  [types.TOGGLE_PANEL_BURGER]: state => {
    state.show = !state.show
  }
}
