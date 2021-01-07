<template lang="pug">
  #user
    UserMenu
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
