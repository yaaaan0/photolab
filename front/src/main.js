import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './style.css'
// import './scss/style.scss'
import VideoBackground from 'vue-responsive-video-background-player'
import VuePageTransition from 'vue-page-transition'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import VueKinesis from 'vue-kinesis'
import VueMarquee from 'vue-marquee-component'

// 認證
import { ValidationProvider } from 'vee-validate'

// 圖片上傳
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'

import VueSilentbox from 'vue-silentbox'
import Photoswipe from 'vue-pswipe'

import { VueMasonryPlugin } from 'vue-masonry'

import 'vue-video-section/dist/vue-video-section.css'
import VueVideoSection from 'vue-video-section'

axios.defaults.withCredentials = true
Vue.config.productionTip = false

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ImgInputer', ImgInputer)
Vue.component('video-background', VideoBackground)
Vue.component('vue-video-section', VueVideoSection)
Vue.use(VuePageTransition)
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
Vue.use(VueSilentbox)
Vue.use(Photoswipe)
Vue.use(VueMasonryPlugin)
Vue.use(VueKinesis)
Vue.use(VueMarquee)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
