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
      login: false
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      title: 'GP photolab ｜ GP首頁',
      login: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'GP photolab ｜ 品牌介紹',
      login: false
    }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import(/* webpackChunkName: "news" */ '../views/News.vue'),
    meta: {
      title: 'GP photolab ｜ 最新消息',
      login: false
    },
    children: [
      {
        path: '',
        name: 'News',
        component: () => import(/* webpackChunkName: "news" */ '../views/AllNews.vue'),
        meta: {
          title: 'GP photolab ｜ 最新消息',
          login: false
        }
      },
      {
        path: '',
        name: 'AllNews',
        component: () => import(/* webpackChunkName: "allNews" */ '../views/AllNews.vue'),
        meta: {
          title: 'GP photolab ｜ 最新消息',
          login: false
        }
      },
      {
        path: ':id',
        name: 'Article',
        component: () => import(/* webpackChunkName: "article" */ '../views/Article.vue'),
        meta: {
          title: 'GP photolab ｜ 最新消息',
          login: false
        }
      }
    ]
  },
  {
    path: '/serive',
    name: 'Serive',
    component: () => import(/* webpackChunkName: "serive" */ '../views/Serive.vue'),
    meta: {
      title: 'GP photolab ｜ 服務內容',
      login: false
    }
  },
  {
    path: '/photolab',
    name: 'Photolab',
    component: () => import(/* webpackChunkName: "photolab" */ '../views/Photolab.vue'),
    meta: {
      title: 'GP photolab ｜ 照相館',
      login: false
    }
  },
  {
    path: '/q&a',
    name: 'Q&A',
    component: () => import(/* webpackChunkName: "q&a" */ '../views/Q&A.vue'),
    meta: {
      title: 'GP photolab ｜ 常見問題',
      login: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      title: 'GP photolab ｜ 登入註冊',
      login: false
    }
  },
  {
    path: '/reserve',
    name: 'Reserve',
    component: () => import(/* webpackChunkName: "reserve" */ '../views/Reserve.vue'),
    meta: {
      title: 'GP photolab ｜ 預約表單',
      login: true
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    meta: {
      title: 'GP photolab ｜ 會員專區',
      login: true
    },
    children: [
      {
        path: '',
        name: 'User',
        component: () => import(/* webpackChunkName: "userData" */ '../views/UserData.vue'),
        meta: {
          title: 'GP photolab ｜ 會員專區',
          login: true
        }
      },
      {
        path: 'data',
        name: 'UserData',
        component: () => import(/* webpackChunkName: "userData" */ '../views/UserData.vue'),
        meta: {
          title: 'GP photolab ｜ 基本資料',
          login: true
        }
      },
      {
        path: 'order',
        name: 'UserOrder',
        component: () => import(/* webpackChunkName: "userOrder" */ '../views/UserOrder.vue'),
        meta: {
          title: 'GP photolab ｜ 我的訂單',
          login: true
        },
        children: [
          {
            path: '',
            name: 'OrderList',
            component: () => import(/* webpackChunkName: "orderList" */ '../views/OrderList.vue'),
            meta: {
              title: 'GP photolab ｜ 我的訂單',
              login: true
            }
          },
          {
            path: ':id',
            name: 'OrderInfo',
            component: () => import(/* webpackChunkName: "orderInfo" */ '../views/OrderInfo.vue'),
            meta: {
              title: 'GP photolab ｜ 我的訂單',
              login: true,
              props: true
            }
          }
        ]
      },
      {
        path: 'favorite',
        name: 'UserFavorite',
        component: () => import(/* webpackChunkName: "userfavorite" */ '../views/UserFavorite.vue'),
        meta: {
          title: 'GP photolab ｜ 收藏夾',
          login: true
        }
      }
    ]
  },
  {
    path: '/webmaster',
    name: 'WebMaster',
    component: () => import(/* webpackChunkName: "webmaster" */ '../views/Webmaster.vue'),
    meta: {
      title: 'GP photolab ｜ 管理者',
      login: true
    },
    children: [
      {
        path: '',
        name: 'WebMaster',
        component: () => import(/* webpackChunkName: "create" */ '../views/Create.vue'),
        meta: {
          title: 'GP photolab ｜ 管理者',
          login: true
        }
      },
      {
        path: 'create',
        name: 'Create',
        component: () => import(/* webpackChunkName: "create" */ '../views/Create.vue'),
        meta: {
          title: 'GP photolab ｜ 管理者',
          login: true
        }
      },
      {
        path: 'schedule',
        name: 'Schedule',
        component: () => import(/* webpackChunkName: "schedule" */ '../views/Schedule.vue'),
        meta: {
          title: 'GP photolab ｜ 攝影排程',
          login: true
        }
      },
      {
        path: 'allOrders',
        name: 'AllOrders',
        component: () => import(/* webpackChunkName: "allOrders" */ '../views/AllOrders.vue'),
        meta: {
          title: 'GP photolab ｜ 訂單資訊',
          login: true
        },
        children: [
          {
            path: '',
            name: 'AllOrders',
            component: () => import(/* webpackChunkName: "allOrderList" */ '../views/AllOrderList.vue'),
            meta: {
              title: 'GP photolab ｜ 我的訂單',
              login: true,
              props: true
            }
          },
          {
            path: 'AllOrderList',
            name: 'AllOrderList',
            component: () => import(/* webpackChunkName: "allOrderList" */ '../views/AllOrderList.vue'),
            meta: {
              title: 'GP photolab ｜ 我的訂單',
              login: true,
              props: true
            }
          },
          {
            path: ':id',
            name: 'AllOrderInfo',
            component: () => import(/* webpackChunkName: "allOrderInfo" */ '../views/AllOrderInfo.vue'),
            meta: {
              title: 'GP photolab ｜ 我的訂單',
              login: true,
              props: true
            }
          }
        ]
      },
      {
        path: 'editPages',
        name: 'EditPages',
        component: () => import(/* webpackChunkName: "editPages" */ '../views/EditPages.vue'),
        meta: {
          title: 'GP photolab ｜ 頁面管理',
          login: true
        },
        children: [
          {
            path: '',
            name: 'EditPages',
            component: () => import(/* webpackChunkName: "editPages" */ '../views/EditPagesHome.vue'),
            meta: {
              title: 'GP photolab ｜ 頁面管理',
              login: true
            }
          },
          {
            path: 'home',
            name: 'Home',
            component: () => import(/* webpackChunkName: "editPages" */ '../views/EditPagesHome.vue'),
            meta: {
              title: 'GP photolab ｜ 頁面管理',
              login: true
            }
          },
          {
            path: 'new',
            name: 'New',
            component: () => import(/* webpackChunkName: "editPages" */ '../views/EditPagesNew.vue'),
            meta: {
              title: 'GP photolab ｜ 頁面管理',
              login: true
            }
          },
          {
            path: 'photolab',
            name: 'Photolab',
            component: () => import(/* webpackChunkName: "editPages" */ '../views/EditPagesPhotolab.vue'),
            meta: {
              title: 'GP photolab ｜ 頁面管理',
              login: true
            }
          }
        ]
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
      title: '未登入',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 1000
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
