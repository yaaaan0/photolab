<template lang="pug">
#app
  #div(v-if="isShow")
    #top
      Menu
      ResBtn
      TopBtn
      NevBtn
    #content
      vue-page-transition(name='fade-in-down')
        router-view
    #botton
      Footer
  #div(v-else)
    vue-page-transition(name='fade-in-down')
      router-view
</template>

<script>
import Menu from './components/Menu.vue'
import ResBtn from './components/ResBtn.vue'
import Word from './components/Word.vue'
import Footer from './components/Footer.vue'
import NevBtn from './components/NevBtn.vue'
import TopBtn from './components/TopBtn.vue'

export default {
  name: 'App',
  computed: {
    user () {
      return this.$store.state.user
    },
    isShow () {
      if (this.$route.path === '/') {
        return false
      } else {
        return true
      }
    }
  },
  components: {
    Menu,
    ResBtn,
    Word,
    Footer,
    NevBtn,
    TopBtn
  },
  methods: {
    heartbeat () {
      this.axios.get(process.env.VUE_APP_API + '/users/heartbeat')
        .then(res => {
          // 如果 vuex 是登入中
          if (this.user.id.length > 0) {
            // 但是後端沒登入
            if (!res.data) {
              this.$swal({
                icon: 'error',
                title: '錯誤',
                text: '登入時效已過'
              })
              // 登出
              this.$store.commit('logout')
              // 導回首頁
              if (this.$route.path !== '/') {
                this.$router.push('/')
              }
            }
          }
        })
        .catch(() => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '發生錯誤'
          })
          // 登出
          this.$store.commit('logout')
          // 導回首頁
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
    },
    // 當vue元件準備好時 要做的動作
    mounted () {
      this.heartbeat()
      setInterval(() => {
        this.heartbeat()
      }, 5000)
    }
  }
}
</script>
