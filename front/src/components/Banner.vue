<template lang="pug">
  #banner
    v-app
      .carousel
        vue-flux(:options="options" :images="images" :transitions="transitions")
          //- template(v-slot:pagination)
          //-   flux-pagination
      .container
        kinesisdistance(:strength='50' :distance='100')
        .new.container
          kinesis-container
            kinesis-element(:strength='10')
              div.aa
            kinesis-element(:strength='20')
              p NEW

</template>

<script>
import Parallax from 'vue-parallaxy'
import Word from '../components/Word.vue'
import { KinesisContainer, KinesisElement, kinesisdistance } from 'vue-kinesis'

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
        allowFullscreen: true,
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
      images: [],
      transitions: ['fade']
    }
  },
  components: {
    Parallax,
    VueFlux,
    FluxCaption,
    FluxControls,
    FluxIndex,
    FluxPagination,
    FluxPreloader,
    KinesisContainer,
    KinesisElement,
    kinesisdistance,
    Word
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/banners/')
      .then(res => {
        const arry = res.data.result
        if (res.data.success) {
          for (let i = 0; i < arry.length; i++) {
            this.images.push(process.env.VUE_APP_API + '/photos/file/' + arry[i].file)
          }
        }
        console.log(this.images)
      })
  }
}
</script>
