<template lang="pug">
#leadingPage
  v-container(fluid)
    v-img(src='../assets/GPlogo.jpg' max-height='100' max-width='100')
  //- .jarallax(data-jarallax-video='https://www.youtube.com/watch?v=TYJBXuEU-zQ' data-speed='0.1')
  //-     p.h-100.display-3.d-flex.justify-content-center.align-items-center.text-white jarallax
  v-container.w-100.h-100.d-flex.justify-center.align-end
    v-row(align='center' justify='center')
      v-btn( x-large rounded text fixed to="home") HOME
</template>

<script>
export default {
  name: 'LeadingPage'
}
</script>
