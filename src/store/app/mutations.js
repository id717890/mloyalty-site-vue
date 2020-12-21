import types from './types'

export default {
  [types.SET_TYPE_BROWSER]: (state, isMobile) => {
    state.isMobile = isMobile
  },
  [types.TEMPLATE_CODE_SET]: (state, code) => {
    state.code = code
  },
  [types.SET_LOADING_APP]: (state, loading) => {
    state.loading = loading
  },
  [types.SET_APP_CODE]: (state, code) => {
    state.code = code
  }
}
