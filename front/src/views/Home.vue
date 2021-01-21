<template lang="pug">
#home
  #content
    v-app
      Banner
</template>

<script>
import Banner from '../components/Banner.vue'

export default {
  name: 'Home',
  components: {
    Banner
  }
}
</script>
