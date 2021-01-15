<template lang="pug">
#photolab
  Photoswipe
    vueWaterfallEasy(:imgsArr="imgsArr" @scrollReachBottom="getData" maxCols="6" @click="clickFn" height="2000px" @imgError="imgErrorFn")
        .img-info(slot-scope="props")
        div(slot='waterfall-over') end
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'

export default {
  name: 'Photolab',
  data () {
    return {
      imgsArr: [],
      props: '',
      group: 0
    }
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    getData () {
      this.axios.get(process.env.VUE_APP_API + '/photos/?group=' + this.group)
        .then(res => {
          this.group++
          if (this.group === 10) {
            this.$refs.waterfall.waterfallOver()
            return
          }
          this.imgsArr = this.imgsArr.concat(res.data)
        })
    },
    created () {
      this.getData()
    },
    imgErrorFn (imgItem) {
      console.log('圖片加載錯誤', imgItem)
    },
    // clickFn (event, { index, value }) {
    //   if (event.target.tagName.toLowerCase() === 'img') {
    //     this.$swal({
    //       title: `點擊圖片${index}`
    //     })
    //   }
    // },
    clickFn (event, { index, value }) {
      this.$Pswp.open({
        items: [
          {
            src: value.src,
            title: value.title
          },
          {
            src: value.src,
            title: value.title
          }
        ]
      })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/photos/')
      .then(res => {
        if (res.data.success) {
          this.imgsArr = res.data.result.map(item => {
            item.src = process.env.VUE_APP_API + '/photos/file/' + item.file
            item.edit = false
            item.imgdialog = false
            item.title = item.description
            delete item.description
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
