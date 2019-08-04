import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import Books from './views/Books.vue'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Signin from './views/Signin.vue'
import Signup from './views/Signup.vue'
import Words from './views/Words.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/books',
      name: 'books',
      component: Books
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/words',
      name: 'words',
      component: Words
    }
  ]
})
