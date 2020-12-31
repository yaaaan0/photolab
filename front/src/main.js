import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './style.css'
import VideoBackground from 'vue-responsive-video-background-player'
import VuePageTransition from 'vue-page-transition'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { ValidationProvider } from 'vee-validate'

axios.defaults.withCredentials = true
Vue.config.productionTip = false

// 認證
Vue.component('ValidationProvider', ValidationProvider)

Vue.component('video-background', VideoBackground)
Vue.use(VuePageTransition)
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
