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
  },
  {
    path: '/serive',
    name: 'Serive',
    component: () => import(/* webpackChunkName: "serive" */ '../views/Serive.vue'),
    mate: {
      title: 'GP photolab | 服務內容',
      login: false
    }
  },
  {
    path: '/photolab',
    name: 'Photolab',
    component: () => import(/* webpackChunkName: "photolab" */ '../views/Photolab.vue'),
    mate: {
      title: 'GP photolab | 照相館',
      login: false
    }
  },
  {
    path: '/q&a',
    name: 'Q&A',
    component: () => import(/* webpackChunkName: "q&a" */ '../views/Q&A.vue'),
    mate: {
      title: 'GP photolab | 常見問題',
      login: false
    }
  },
  {
    path: '/reserve',
    name: 'Reserve',
    component: () => import(/* webpackChunkName: "reserve" */ '../views/Reserve.vue'),
    mate: {
      title: 'GP photolab | 預約表單',
      login: true
    }
  },
  {
    path: '/login',
    name: 'Longin',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    mate: {
      title: 'GP photolab | 登入註冊',
      login: false
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
