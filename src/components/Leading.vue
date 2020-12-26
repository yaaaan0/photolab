<template lang="pug">
#leading
  v-container.logo(fluid)
    v-img(src='../assets/GPlogo.jpg' max-height='100' max-width='100')
  v-container.video(fluid)
    v-parallax
      video-background(src='https://www.youtube.com/watch?v=_uagkcwzVRc')
    v-parallax
      video-background(src='https://www.youtube.com/watch?v=_uagkcwzVRc')
  v-container.btn.d-flex.justify-center.align-end
      v-btn( x-large rounded text fixed to="home") HOME
</template>
