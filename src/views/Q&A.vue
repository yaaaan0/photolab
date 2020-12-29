<template lang="pug">
#qanda
  #content
    Word
  NevBtn
</template>

<script>
import Menu from '../components/Menu.vue'
import ResBtn from '../components/ResBtn.vue'
import Word from '../components/Word.vue'
import Footer from '../components/Footer.vue'
import NevBtn from '../components/NevBtn.vue'
import TopBtn from '../components/TopBtn.vue'
export default {
  name: 'Q&A',
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
