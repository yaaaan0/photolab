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
  }
}
</script>
