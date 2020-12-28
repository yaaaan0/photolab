<template lang="pug">
#photolab
  #top
    Menu
    ResBtn
  #content
    Word
  NevBtn
  #botton
    Footer
</template>

<script>
import Menu from '../components/Menu.vue'
import ResBtn from '../components/ResBtn.vue'
import Word from '../components/Word.vue'
import Footer from '../components/Footer.vue'
import NevBtn from '../components/NevBtn.vue'
export default {
  name: 'Photolab',
  components: {
    Menu,
    ResBtn,
    Word,
    Footer,
    NevBtn
  }
}
</script>
