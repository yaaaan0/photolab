import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './style.css'
import VideoBackground from 'vue-responsive-video-background-player'

Vue.config.productionTip = false

Vue.component('video-background', VideoBackground)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
