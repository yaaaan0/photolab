import Vue from 'vue'
import VueRouter from 'vue-router'
import LeadingPage from '../views/LeadingPage.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LeadingPage',
    component: LeadingPage,
    mate: {
      title: 'GP photolab',
      login: false
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    mate: {
      title: 'GP photolab',
      login: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    mate: {
      title: 'GP photolab | 品牌介紹',
      login: false
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
