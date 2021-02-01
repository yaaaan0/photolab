<template lang="pug">
#leading
  v-container.logo(fluid)
    v-img(src='../assets/GPlogo.jpg' max-height='100' max-width='100')
  video-background(:src='require(`@/assets/video/1.mp4`)' playbackRate='1' style='height: 100%;' overlay="linear-gradient(45deg,#2a4ae430,#faebd74d)")
  //- video-background(:src='require(`@/assets/video/1_1.mp4`)' playbackRate='1' style='height: 52%;' overlay="linear-gradient(45deg,#2a4ae430,#faebd74d)")
  .bg
  v-container.btn_leading.d-flex.justify-center.align-end
    v-btn( x-large rounded fixed to="/home")
      h5 HOME
  //- vue-video-section(:elementId="'header-background-video'" :ref="'header-background-video'" mp4Source="../assets/video/10000000_762462704355095_1768026752353467266_n.mp4" :mobileBreakpoint="992" :desktopHeight="550" :mobileHeight="450" :playsinline="true" :loop="true" :autoplay="true" :autobuffer="true" :muted="true")
</template>
