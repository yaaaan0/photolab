<template lang="pug">
  #banner
    vue-flux(:options="options" :images="images" :transitions="transitions")
    vue-aos(animation-class='fadeIn animated')
      v-card
        v-btn.about(text to='/about')
          kinesisdistance(:strength='50' :distance='100')
            kinesis-container.ddd
              h1
                kinesis-element(:strength='10')
                  span N
                kinesis-element(:strength='20')
                  span E
                kinesis-element(:strength='10')
                  span W
                kinesis-element(:strength='20')
                  span S
                //- kinesis-element(:strength='50')
                //-   span T
        v-divider(vertical)
        p.pa-5
          | GP Photolab | Garland Pheasant
          br
          | 準備好回娘家約會了嗎?
</template>

<script>
import Parallax from 'vue-parallaxy'
import Word from '../components/Word.vue'
import { KinesisContainer, KinesisElement, kinesisdistance } from 'vue-kinesis'
import VueAos from 'vue-aos'

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
    VueAos,
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
