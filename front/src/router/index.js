import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import LeadingPage from '../views/LeadingPage.vue'
import NotFound from '../views/NotFound.vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LeadingPage',
    component: LeadingPage,
    meta: {
      title: 'GP photolab',
      login: false,
      transition: 'fade-in-down'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      title: 'GP photolab | GP首頁',
      login: false,
      transition: 'fade-in-down'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'GP photolab | 品牌介紹',
      login: false
    }
  },
  {
    path: '/serive',
    name: 'Serive',
    component: () => import(/* webpackChunkName: "serive" */ '../views/Serive.vue'),
    meta: {
      title: 'GP photolab | 服務內容',
      login: false
    }
  },
  {
    path: '/photolab',
    name: 'Photolab',
    component: () => import(/* webpackChunkName: "photolab" */ '../views/Photolab.vue'),
    meta: {
      title: 'GP photolab | 照相館',
      login: false
    }
  },
  {
    path: '/q&a',
    name: 'Q&A',
    component: () => import(/* webpackChunkName: "q&a" */ '../views/Q&A.vue'),
    meta: {
      title: 'GP photolab | 常見問題',
      login: false
    }
  },
  {
    path: '/reserve',
    name: 'Reserve',
    component: () => import(/* webpackChunkName: "reserve" */ '../views/Reserve.vue'),
    meta: {
      title: 'GP photolab | 預約表單',
      login: true
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    meta: {
      title: 'GP photolab | 會員專區',
      login: true
    },
    children: [
      {
        path: '',
        name: 'User',
        component: () => import(/* webpackChunkName: "userData" */ '../views/UserData.vue'),
        meta: {
          title: 'GP photolab | 會員專區',
          login: true
        }
      },
      {
        path: 'data',
        name: 'UserData',
        component: () => import(/* webpackChunkName: "userData" */ '../views/UserData.vue'),
        meta: {
          title: 'GP photolab | 會員專區',
          login: true
        }
      },
      {
        path: 'order',
        name: 'UserOrder',
        component: () => import(/* webpackChunkName: "userOrder" */ '../views/UserOrder.vue'),
        meta: {
          title: 'GP photolab | 會員專區',
          login: true
        }
      },
      {
        path: 'favorite',
        name: 'UserFavorite',
        component: () => import(/* webpackChunkName: "userfavorite" */ '../views/UserFavorite.vue'),
        meta: {
          title: 'GP photolab | 會員專區',
          login: true
        }
      }
    ]
  },
  // {
  //   path: '/favourite',
  //   name: 'Favourite',
  //   component: () => import(/* webpackChunkName: "favourite" */ '../views/Favourite.vue'),
  //   meta: {
  //     title: 'GP photolab | 收藏夾',
  //     login: true
  //   }
  // },
  {
    path: '/login',
    name: 'Longin',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      title: 'GP photolab | 登入註冊',
      login: false
    }
  },
  {
    path: '/*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '找不到頁面'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 若即將訪問的頁面需登入且 vuex 狀態並沒有登入
  if (to.meta.login && !store.state.user.id) {
    Swal.fire({
      icon: 'error',
      title: '未登入'
    })
    next('/login')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  let title = ''
  title = to.meta.title
  document.title = title
  window.scrollTo(0, 0)
})

export default router
