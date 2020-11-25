import types from './types'

export default {
  [types.TEMPLATE_CODE_SET]: (state, code) => {
    state.code = code
  }
}
