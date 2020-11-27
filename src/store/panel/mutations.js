import types from './types'

export default {
  [types.CURRENT_PAGE_SET]: (state, page) => {
    state.page = page
  },
  [types.TOGGLE_PANEL]: (state, isShow) => {
    state.show = isShow
  }
}
