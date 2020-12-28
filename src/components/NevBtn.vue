<template lang="pug">
#nevBtn
  v-bottom-navigation(shift grow hide-on-scroll scroll-target='#hide-on-scroll')
    v-btn(color='deep-purple')
      span Account
      v-icon mdi-account
    v-btn(color='deep-purple')
      span Reserve
      v-icon mdi-chat-processing
    v-btn(color='deep-purple')
      span Favorites
      v-icon mdi-panorama
</template>

<script>
export default {
  data: () => ({ value: 'recent' })
}
</script>
