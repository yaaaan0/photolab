<template lang="pug">
  #webmaster
    UserMenu
    vue-page-transition(name='fade-in-up')
      router-view
</template>

<script>
import UserMenu from '../components/UserMenu.vue'

export default {
  name: 'Webmaster',
  components: {
    UserMenu
  },
  methods: {
  }
}
</script>
