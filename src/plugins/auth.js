export default function(Vue) {
  Vue.auth = {
    getAccessToken() {
      // if (this.isExpired()) {
      //   this.logout()
      //   return null
      // }
      let token = localStorage.getItem('access_token')
      if (!token) {
        return null
      }
      return token
    },
    getRefreshToken() {
      let token = localStorage.getItem('refresh_token')
      if (!token) {
        return null
      }
      return token
    },
    setAccessToken(token) {
      localStorage.setItem('access_token', token)
    },
    setRefreshToken(token) {
      localStorage.setItem('refresh_token', token)
    },
    logout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  }
  Object.defineProperties(Vue.prototype, {
    $auth: {
      get() {
        return Vue.auth
      }
    }
  })
}
