// import Home from '../views/Home.vue'
import MainPage from '../views/MainPage.vue'
// import Template from '../views/Template.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Home',
    component: MainPage,
    // components: {
    //   default: MainPage,
    //   main: Home
    // },
    children: [
      {
        path: '',
        name: 'Template',
        components: {
          main: () =>
            import(/* webpackChunkName: "about" */ '../views/Home.vue')
        }
      },
      {
        path: 'orders',
        name: 'Orders',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
          main: () =>
            import(/* webpackChunkName: "about" */ '../views/Order.vue')
        }
      },
      {
        path: 'contact',
        name: 'Contact',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
          main: () =>
            import(/* webpackChunkName: "about" */ '../views/Contact.vue')
        }
      }
    ]
  }
  // {
  //   path: '/template/:code',
  //   name: 'Template',
  //   component: Template
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
