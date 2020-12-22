import types from './types'

const testOptions = {
  certificates: [
    {
      id: 1,
      img: require('@/assets/img/example/design1.png'),
      price: 1000
    },
    {
      id: 2,
      img: require('@/assets/img/example/design2.png'),
      price: 2000
    },
    {
      id: 3,
      img: require('@/assets/img/example/design3.png'),
      price: 3000
    },
    {
      id: 4,
      img: require('@/assets/img/example/design4.png'),
      price: 4000
    },
    {
      id: 5,
      img: require('@/assets/img/example/design5.png'),
      price: 5000
    }
  ],
  pars: [500, 1000, 3000, 5000, 10000]
}

export default {
  [types.GET_CERTIFICATE_OPTIONS]({ commit }) {
    commit('app/SET_LOADING_APP', true, { root: true })
    setTimeout(() => {
      commit(types.SET_CERTIFICATE_OPTIONS, testOptions)
      commit('app/SET_LOADING_APP', false, { root: true })
    }, 1000)
  }
}
