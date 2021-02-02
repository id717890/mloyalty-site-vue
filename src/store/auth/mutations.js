import types from './types'

export default {
  [types.SET_ACCESS_TOKEN](state, accessToken) {
    console.log('SET ACCESS TOKEN', accessToken)
    state.accessToken = accessToken
  },
  [types.SET_REFRESH_TOKEN](state, refreshToken) {
    console.log('SET REFRESH TOKEN', refreshToken)
    state.refreshToken = refreshToken
  }
}
