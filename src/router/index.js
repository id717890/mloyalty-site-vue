import Template from '../views/Template.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'NewCertificate',
    component: () => import('../views/NewCertificate.vue')
  },
  {
    path: '/sending',
    name: 'Sending',
    component: () => import('../views/Sending.vue')
  },
  {
    path: '/confirming',
    name: 'Confirming',
    component: () => import('../views/Confirming.vue')
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import('../views/Success.vue')
  },
  {
    path: '/basket',
    name: 'Basket',
    component: () => import('../views/Basket.vue')
  },
  {
    path: '/preview-mobile',
    name: 'PreviewMobile',
    component: () => import('../views/PreviewMobile.vue')
  },
  {
    path: '/example',
    name: 'Example',
    component: Template,
    meta: {
      title: 'MLoyalty - Пример страницы'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //При перехоадах сбрасываем отсутп от низ для кнопок бургера и корзины
  store.commit('app/SET_BOTTOM_OFFSET', 0)
  store.commit('app/SET_OPACITY', 1)

  if (to?.path === '/preview-mobile') {
    window?.xprops?.onHideClose(true)
  } else {
    window?.xprops?.onHideClose(false)
  }
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title)
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title
  next()
})

export default router
