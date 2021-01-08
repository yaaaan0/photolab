<template lang="pug">
  #user
    UserMenu
    vue-page-transition(name='fade-in-up')
      router-view
</template>

<script>
import UserMenu from '../components/UserMenu.vue'

export default {
  name: 'user',
  components: {
    UserMenu
  },
  methods: {
  }
}
</script>
