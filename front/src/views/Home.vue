<template lang="pug">
#home
  #content
    v-app
      HomeParallaxy
</template>

<script>
import Menu from '../components/Menu.vue'
import ResBtn from '../components/ResBtn.vue'
import Word from '../components/Word.vue'
import Footer from '../components/Footer.vue'
import NevBtn from '../components/NevBtn.vue'
import TopBtn from '../components/TopBtn.vue'
import HomeParallaxy from '../components/HomeParallaxy.vue'

export default {
  name: 'Home',
  components: {
    Menu,
    ResBtn,
    Word,
    Footer,
    NevBtn,
    TopBtn,
    HomeParallaxy
  }
}
</script>
