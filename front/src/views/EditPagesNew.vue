<template lang="pug">
  #editPagesNew
    v-app
      v-data-table.elevation-1.mt-15(
        :headers='headers'
        :items='news')
        template(v-slot:item.src='{ item }')
          v-img.ma-3( :src='item.src' height="200px" width="300px")
        template(v-slot:item.title='{ item }')
          span.titlee {{item.title}}
        template(v-slot:item.content='{ item }')
          span.content {{item.content}}
        template(v-slot:item.delBtn='{ item, index }')
          v-btn.ma-3(rounded dark color="rgba(103, 125, 53, 0.8)") 編輯
          v-btn.ma-3(rounded dark color="rgba(212, 97, 68, 0.8)" @click="del(item, index)") 刪除
      v-btn.create(fab bottom left absolute @click='create')
        v-icon mdi-plus
</template>

<script>
export default {
  name: 'EditPagesNew',
  data () {
    return {
      headers: [
        {
          text: '預覽圖片',
          align: 'start',
          sortable: false,
          value: 'src'
        },
        { text: '標題', value: 'title', sortable: false },
        { text: '內容', value: 'content', sortable: false },
        { text: '上傳日期', value: 'date', sortable: false },
        { text: '', value: 'delBtn', sortable: false }
      ],
      news: [],
      image: null
    }
  },
  methods: {
    del (item, index) {
      this.$swal({
        title: '是否要刪除',
        showDenyButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(process.env.VUE_APP_API + '/news/' + item._id)
            .then(res => {
              if (res.data.success) {
                this.$swal({
                  title: '刪除文章',
                  showConfirmButton: false,
                  timerProgressBar: true,
                  timer: 1000
                })
                setTimeout(() => {
                  this.banners.splice(index, 1)
                }, 1000)
              } else {
                this.$swal({
                  icon: 'error',
                  title: '錯誤',
                  text: res.data.message
                })
              }
            })
            .catch(err => {
              this.$swal({
                icon: 'error',
                title: '錯誤',
                text: err.response.data.message
              })
            })
        }
      })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/news/')
      .then(res => {
        if (res.data.success) {
          this.news = res.data.result.map(item => {
            item.src = process.env.VUE_APP_API + '/photos/file/' + item.file
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
