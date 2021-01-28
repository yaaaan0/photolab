<template lang="pug">
  #banner
    vue-flux(:options="options" :images="images" :transitions="transitions")
    vue-aos(animation-class='fadeIn animated')
      v-card
        div.aaa
          kinesis-container.ddd
            v-btn.banner_new(fab to="/news")
              h1
                kinesis-element(:strength='10')
                  span N
                kinesis-element(:strength='20')
                  span E
                kinesis-element(:strength='10')
                  span W
                kinesis-element(:strength='20')
                  span S
        v-divider(vertical)
        vue-aos(animation-class='fadeIn animated')
          div.aaa
            kinesis-container
              kinesis-element(:strength='10')
                v-btn.banner_new(fab :to= "'/news/' + news[0]._id")
                  pre.pa-5 {{news[0].title}}
        v-divider(vertical)
        vue-aos(animation-class='fadeIn animated')
          div.aaa
            kinesis-container
              kinesis-element(:strength='10')
                v-btn.banner_new(fab :to= "'/news/' + news[1]._id")
                  pre.pa-5 {{news[1].title}}
</template>

<script>
import Parallax from 'vue-parallaxy'
import Word from '../components/Word.vue'
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
      transitions: ['fade'],
      news: []
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

    this.axios.get(process.env.VUE_APP_API + '/news/')
      .then(res => {
        if (res.data.success) {
          this.news = res.data.result.map(item => {
            item.src = process.env.VUE_APP_API + '/photos/file/' + item.file
            item.content = item.content.substr(0, 100)
            return item
          })
          this.news.reverse()
          console.log(this.news)
        } else {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: res.data.message
          })
          console.log(res.data)
        }
      })
      .catch(err => {
        if (err.response.data.message === '未登入') {
          // 登出
          this.$store.commit('logout')
          // 導回首頁
          if (this.$route.path !== '/login') {
            this.$router.push('/login')
          }
        }
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: err.response.data.message
        })
      })
  }
}
</script>
