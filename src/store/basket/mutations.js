import types from './types'
import { v4 as uuid } from 'uuid'

export default {
  [types.SET_PREVIEW](state, item) {
    state.preview = item
  },
  /**
   * Добавляет сертификат в корзину
   * @param {Object} state
   * @param {Object} item - добавляемый объект корзины
   */
  [types.ADD_CERTIFICATE](state, item) {
    if (item) {
      item.id = uuid()
    }
    if (!state.basket) {
      state.basket = [item]
    } else {
      const findTheSame = state.basket.find(
        cert =>
          cert.certificate.id === item.certificate.id &&
          cert.price === item.price &&
          cert.congratulation === item.congratulation
      )
      if (findTheSame) {
        item.count += findTheSame.count
        state.basket.splice(state.basket.indexOf(findTheSame), 1, item)
        // state.basket.push(item)
      } else {
        state.basket.push(item)
      }
    }
  },
  /**
   * Изменение сертификата корзины
   * @param {Object} state
   * @param {Object} item - объект измененного сертификата
   */
  [types.UPDATE_CERTIFICATE](state, item) {
    if (item.count === 0) {
      state.modalConfirmRemove.show = true
      state.modalConfirmRemove.item = item
    } else {
      let find = state.basket.find(x => x.id === item.id)
      if (find) {
        state.basket.splice(state.basket.indexOf(find), 1, item)
      }
    }
  },
  /**
   * Удаление сертификата из корзины
   * @param {Object} state
   */
  [types.REMOVE_CERTIFICATE](state) {
    const basketItem = state.modalConfirmRemove.item
    if (basketItem) {
      const find = state.basket.find(item => item.id === basketItem.id)
      if (find) {
        state.basket.splice(state.basket.indexOf(find), 1)
      }
    }
    state.modalConfirmRemove.show = false
    state.modalConfirmRemove.item = null
    state.currentCertificate = null
  },
  /**
   * Отмена удаления сертификата из корзины
   * @param {Object} state
   */
  [types.CANCEL_REMOVE_CERTIFICATE](state) {
    let basketItem = state.modalConfirmRemove.item
    basketItem.count = 1
    const find = state.basket.find(item => item.id === basketItem.id)
    if (find) {
      state.basket.splice(state.basket.indexOf(find), 1, basketItem)
    }
    state.modalConfirmRemove.show = false
    state.modalConfirmRemove.item = null
  },
  [types.SET_BASKET](state, basket) {
    state.basket = basket
  },
  [types.SET_CURRENT_CERTIFICATE](state, basketItem) {
    state.currentCertificate = basketItem
  },
  [types.CALL_CONFIRM_MODAL](state, basketItem) {
    state.modalConfirmRemove.show = true
    state.modalConfirmRemove.item = basketItem
  }
}
