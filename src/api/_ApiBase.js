import Vue from 'vue'
import axios from 'axios'
import AuthService from './AuthService'
// import config from '../init/config'
// import store from '../store'
// console.log(Vue.prototype.$auth.getToken());

const Axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  // baseURL: 'https://api.loycon.ru/WebService/UNK/unklcmanagerpartner/',
  headers: {
    // Accept: 'application/json',
    // 'Content-Type': 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
  }
})

Axios.interceptors.request.use(
  config => {
    if (config.url !== 'api/site/GetCampaigns')
      config.headers.Authorization = 'Bearer ' + Vue.auth.getAccessToken()
    return config
  },
  error => {
    Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  response => {
    // NProgress.done()
    // store.dispatch('setLoading', false)
    return response
  },
  error => {
    console.log('AXIOS ERROR IN1', error.config)
    if (error.response.status === 401) {
      console.log('AXIOS ERROR IN2')
      return AuthService.refreshToken().then(response => {
        console.log('AFTER CALL REFRESH', response)
        if (response.status === 200 || response.status === 201) {
          console.log('AFTER STATUS 200')
          // 1) put token to LocalStorage
          // localStorageService.setToken(response.data)

          // 2) Change Authorization header
          const accessToken = response?.data?.access_token
          error.config.headers['Authorization'] = `Bearer ${accessToken}`
          // error.config.baseURL = undefined

          // 3) return originalRequest object with Axios.
          return Axios.request(error.config)
        }
      })
    }
    // if (error?.response) {
    // }
    // if (error.response !== null && error.response !== undefined) {
    //   if (error.response.status === 403 || error.response.status === 401) {
    //     store.dispatch('logout')
    //     store.dispatch('redirectToSignIn')
    //   }
    // }
    // NProgress.done()
    // store.dispatch('setLoading', false)
    return Promise.reject(error)
  }
)

export default Axios
