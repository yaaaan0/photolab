<template lang="pug">
  #editPagesHome
    v-app
      v-data-table.elevation-1(
        hide-default-footer
        :headers='headers'
        :items='banners')
        template(v-slot:item.src='{ item }')
          v-img( :src='item.src' height="90px" width="150px")
      v-file-input(label='上傳照片' filled rounded prepend-icon='mdi-camera' color="#677d35")
</template>

<script>
export default {
  name: 'EditPagesHome',
  data () {
    return {
      headers: [
        {
          text: '預覽圖片',
          align: 'start',
          sortable: false,
          value: 'src'
        },
        { text: '上傳日期', value: 'date', sortable: false },
        { text: '顯示按鈕', value: 'display', sortable: true },
        { text: '刪除按鈕', value: 'icon', sortable: true }
      ],
      banners: []
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/banners/')
      .then(res => {
        if (res.data.success) {
          this.banners = res.data.result.map(item => {
            item.src = process.env.VUE_APP_API + '/photos/file/' + item.file
            return item
          })
          console.log(this.banners)
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
