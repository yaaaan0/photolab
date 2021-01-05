<template lang="pug">
#home
  #content
    Word
</template>

<script>
import Menu from '../components/Menu.vue'
import ResBtn from '../components/ResBtn.vue'
import Word from '../components/Word.vue'
import Footer from '../components/Footer.vue'
import NevBtn from '../components/NevBtn.vue'
import TopBtn from '../components/TopBtn.vue'
export default {
  name: 'Home',
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
