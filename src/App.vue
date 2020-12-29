<template lang="pug">
#app
  #div
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
