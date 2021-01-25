<template lang="pug">
  #allNews
    v-app
      .new.mt-10.mb-10(v-for='(item, index) in news' )
        vue-aos(animation-class='fadeIn animated')
          v-card
            v-img(:src='item.src' width='600px')
            .card-right
              .article.ma-10
                pre
                  h2.logo-color {{item.title}}
                  p.sm-font.gray {{item.date}}
                v-divider
                span {{item.content}} ...
              v-btn(dark @click='click(item)') READ MORE
</template>

<script>
import VueAos from 'vue-aos'

export default {
  name: 'allNews',
  data () {
    return {
      news: [],
      item: []
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
          name: 'Article'
        }
      )
    }
  },
  mounted () {
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
