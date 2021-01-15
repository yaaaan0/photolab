<template lang="pug">
  #photo
    v-app
      vueWaterfallEasy(:imgsArr="imgsArr")
        v-img
        .img-info(slot-scope="props")
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'

export default {
  data () {
    return {
      imgsArr: []
    }
  },
  components: {
    vueWaterfallEasy
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/photos/')
      .then(res => {
        if (res.data.success) {
          this.imgsArr = res.data.result.map(item => {
            item.src = process.env.VUE_APP_API + '/photos/file/' + item.file
            item.edit = false
            item.imgdialog = false
            return item
          })
          console.log(this.imgsArr)
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
