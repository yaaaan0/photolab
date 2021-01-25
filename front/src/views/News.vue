<template lang="pug">
  #news
    vue-page-transition(name='fade-in-up')
      router-view
</template>

<script>
export default {
  name: 'news'
}
</script>
