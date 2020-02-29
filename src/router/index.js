import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../Home.vue'
import Register from '../components/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/components/',
    name: 'Register',
    component: Register
  },
  {
    path: '/notas',
    name: 'notas',
    component: () => import(/* webpackChunkName: "about" */ '../components/notas.vue')
  } 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
