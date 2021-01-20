<template lang="pug">
  #homeParallaxy
    v-app
      .carousel
        vue-flux(:options="options" :images="images" :transitions="transitions")
          //- template(v-slot:pagination)
          //-   flux-pagination
</template>

<script>
import Parallax from 'vue-parallaxy'
import {
  VueFlux,
  FluxCaption,
  FluxControls,
  FluxIndex,
  FluxPagination,
  FluxPreloader
} from 'vue-flux'

export default {
  data () {
    return {
      options: {
        allowFullscreen: false,
        allowToSkipTransition: true,
        autohideTime: 2500,
        autoplay: true,
        bindKeys: false,
        delay: 2000,
        enableGestures: false,
        infinite: true,
        lazyLoad: true,
        lazyLoadAfter: 3
      },
      images: ['https://picsum.photos/2048/1365?random=3',
        'https://picsum.photos/2048/1365?random=2',
        'https://picsum.photos/2048/1365?random=1'],
      transitions: ['slide']
    }
  },
  components: {
    Parallax,
    VueFlux,
    FluxCaption,
    FluxControls,
    FluxIndex,
    FluxPagination,
    FluxPreloader
  }
}
</script>
