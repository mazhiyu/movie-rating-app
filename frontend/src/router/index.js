import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contact',
    name: 'Contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Contact.vue')
  },
  {
    path: '/movies/add',
    name: 'AddMovie',
    component: () => import('../views/AddMovie.vue')
  },
  {
    path: '/movies/:id',
    name: 'Movie',
    component: () => import('../views/Movie.vue')
  },
  {
    path: '/users/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/users/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
