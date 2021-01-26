<template lang="pug">
  #artical
    v-app
      v-card.p1
        pre
          h1.logo-color {{artical.title}}
          span.gray {{artical.date}}
        br
        br
        v-img(:src='src')
        pre
          p {{artical.content}}
      vue-aos(animation-class='fadeIn animated')
        v-sheet.mt-10.mb-10
          v-slide-group.pa-4(prev-icon="mdi-minus" next-icon="mdi-plus" show-arrows='always' )
            v-slide-item(v-for='(item, index) in news')
              v-card.p2.ma-4( @click='click(item)')
                v-row.fill-height(align='center' justify='center')
                  v-img.mb-2(:src='item.src' width='180px')
                  br
                  h6 {{item.title}}

</template>

<script>
import VueAos from 'vue-aos'

export default {
  name: 'artical',
  data () {
    return {
      artical: [],
      news: [],
      src: ''
    }
  },
  components: {
    VueAos
  },
  methods: {
    click (item) {
      this.$router.push(
        {
          params: { id: item._id },
          name: 'Article',
          meta: {
            transition: 'fade-in-up'
          }
        }
      )

      this.axios.get(process.env.VUE_APP_API + '/news/' + item._id)
        .then(res => {
          if (res.data.success) {
            this.artical = res.data.result
            this.src = process.env.VUE_APP_API + '/photos/file/' + this.artical.file
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: res.data.message
            })
          }
        }).catch(err => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: err.response.data.message
          })
        })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/news/' + this.$route.params.id)
      .then(res => {
        if (res.data.success) {
          this.artical = res.data.result
          this.src = process.env.VUE_APP_API + '/photos/file/' + this.artical.file
        } else {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: res.data.message
          })
        }
      }).catch(err => {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: err.response.data.message
        })
      })
    this.axios.get(process.env.VUE_APP_API + '/news/')
      .then(res => {
        if (res.data.success) {
          this.news = res.data.result.map(item => {
            item.src = process.env.VUE_APP_API + '/photos/file/' + item.file
            item.content = item.content.substr(0, 30)
            return item
          })
          this.news.reverse()
        } else {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: res.data.message
          })
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
