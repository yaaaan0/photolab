<template lang="pug">
  #webmaster
    UserMenu
    TopBtn
    vue-page-transition(name='fade-in-up')
      router-view
</template>

<script>
import UserMenu from '../components/UserMenu.vue'
import TopBtn from '../components/TopBtn.vue'

export default {
  name: 'Webmaster',
  components: {
    UserMenu,
    TopBtn
  }
}
</script>
