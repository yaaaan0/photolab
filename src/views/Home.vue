<template lang="pug">
#home
  #top
    Menu
    ResBtn
  #content
    Word

  #footer
</template>

<script>
import Menu from '../components/Menu.vue'
import ResBtn from '../components/ResBtn.vue'
import Word from '../components/Word.vue'
export default {
  name: 'Home',
  components: {
    Menu,
    ResBtn,
    Word
  }
}
</script>
