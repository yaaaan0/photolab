<template lang="pug">
  #user
    UserMenu
    UserData
</template>

<script>
import UserMenu from '../components/UserMenu.vue'
import UserData from '../components/UserData.vue'
export default {
  name: 'user',
  components: {
    UserMenu,
    UserData
  },
  methods: {
  }
}
</script>
