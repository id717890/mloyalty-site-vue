import ApiBase from './_ApiBase'
import authTypes from '../store/auth/types'
import store from '../store'
import Vue from 'vue'

export default {
  authManager() {
    const localAccessToken = Vue.auth.getAccessToken()
    const localRefreshToken = Vue.auth.getRefreshToken()
    if (localAccessToken && localRefreshToken) {
      console.log('AUTH LS')
      store.commit(`auth/${authTypes.SET_ACCESS_TOKEN}`, localAccessToken)
      store.commit(`auth/${authTypes.SET_REFRESH_TOKEN}`, localRefreshToken)
    } else {
      var data = new URLSearchParams()
      data.append('username', 'unksite')
      data.append('password', 'unksite')
      data.append('grant_type', 'password')
      return ApiBase.post('managerLogin', data).then(response => {
        if (response.status === 200) {
          console.log('AUTH API')
          const accessToken = response?.data?.access_token
          const refreshToken = response?.data?.refresh_token
          if (accessToken && refreshToken) {
            store.commit(`auth/${authTypes.SET_REFRESH_TOKEN}`, refreshToken)
            store.commit(`auth/${authTypes.SET_ACCESS_TOKEN}`, accessToken)
            Vue.auth.setAccessToken(accessToken)
            Vue.auth.setRefreshToken(refreshToken)
          }
        }
      })
    }
  },
  refreshToken() {
    const refreshToken =
      store?.state?.auth?.refreshToken ?? Vue.auth.getRefreshToken()
    if (refreshToken) {
      let data = new URLSearchParams()
      data.append('grant_type', 'refresh_token')
      data.append('refresh_token', refreshToken)
      return ApiBase.post('managerLogin', data)
        .then(response => {
          if (response.status === 200) {
            const accessToken = response?.data?.access_token
            const refreshToken = response?.data?.refresh_token
            if (accessToken && refreshToken) {
              store.commit(`auth/${authTypes.SET_REFRESH_TOKEN}`, refreshToken)
              store.commit(`auth/${authTypes.SET_ACCESS_TOKEN}`, accessToken)
              Vue.auth.setAccessToken(accessToken)
              Vue.auth.setRefreshToken(refreshToken)
            }
          } else {
            store.commit(`auth/${authTypes.SET_REFRESH_TOKEN}`, null)
            store.commit(`auth/${authTypes.SET_ACCESS_TOKEN}`, null)
            Vue.auth.logout()
          }
          return response
        })
        .catch(error => {
          store.commit(`auth/${authTypes.SET_REFRESH_TOKEN}`, null)
          store.commit(`auth/${authTypes.SET_ACCESS_TOKEN}`, null)
          Vue.auth.logout()
          return error
        })
    }
  },
  logout() {
    store.commit(`auth/${authTypes.SET_USER}`, null)
  },
  test() {
    const data = new URLSearchParams()
    data.append('Operator', 3)
    var config = {
      headers: {
        Authorization: 'Bearer null'
      }
    }
    return ApiBase.post('api/site/GetCampaigns', data, config).then(x => {
      console.log(x)
    })
  }
}
