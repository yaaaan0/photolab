import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './style.css'
import './scss/style.scss'
import VideoBackground from 'vue-responsive-video-background-player'
import VuePageTransition from 'vue-page-transition'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'

// 認證
import { ValidationProvider } from 'vee-validate'

// const options = {
//   confirmButtonColor: '#00000',
//   cancelButtonColor: '#ff7674'
// }

Vue.use(VueSweetalert2)

axios.defaults.withCredentials = true
Vue.config.productionTip = false

// 認證
Vue.component('ValidationProvider', ValidationProvider)

Vue.component('video-background', VideoBackground)
Vue.use(VuePageTransition)
Vue.use(VueAxios, axios)
// Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
