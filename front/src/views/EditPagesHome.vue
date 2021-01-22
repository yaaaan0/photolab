<template lang="pug">
  #editPagesHome
    v-app
      v-form(@submit.prevent="onSubmit")
        v-file-input.mt-6(v-model="image" small-chips truncate-length="15" show-size label='上傳照片' filled rounded prepend-icon='mdi-camera' color="#677d35")
        v-btn.ma-5(fab small rounded dark color="rgba(0, 0, 0, 0.8)" type="sumbit") 送出
      v-data-table.elevation-1(
        calculate-widths
        hide-default-footer
        :headers='headers'
        :items='banners')
        template(v-slot:item.src='{ item }')
          v-img.ma-3( :src='item.src' height="90px" width="150px")
        template(v-slot:item.delBtn='{ item, index }')
          //- v-btn.ma-3(rounded dark color="rgba(103, 125, 53, 0.8)") 顯示
          v-btn.ma-3(rounded dark color="rgba(212, 97, 68, 0.8)" @click="del(item, index)") 刪除
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
        { text: '檔名', value: 'file', sortable: false },
        { text: '上傳日期', value: 'date', sortable: false },
        { text: '', value: 'delBtn', sortable: false }
      ],
      banners: [],
      image: null
    }
  },
  methods: {
    onSubmit () {
      if (this.image.size > 1024 * 1024) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '圖片太大'
        })
      } else if (!this.image.type.includes('image')) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '檔案格式錯誤'
        })
      } else {
        const fd = new FormData()
        fd.append('image', this.image)

        this.axios.post(process.env.VUE_APP_API + '/banners/', fd)
          .then(res => {
            if (res.data.success) {
              res.data.result.src = process.env.VUE_APP_API + '/photos/file/' + res.data.result.file
              this.$swal({
                title: '上傳成功',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1500
              })

              this.axios.get(process.env.VUE_APP_API + '/banners/')
                .then(res => {
                  if (res.data.success) {
                    this.banners = res.data.result.map(item => {
                      item.src = process.env.VUE_APP_API + '/photos/file/' + item.file
                      return item
                    })
                    this.banners.reverse()
                  }
                })

              // 送出後清空表單
              this.image = null
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
    },
    del (item, index) {
      this.$swal({
        title: '是否要刪除',
        showDenyButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(process.env.VUE_APP_API + '/banners/' + item._id)
            .then(res => {
              if (res.data.success) {
                this.$swal({
                  title: '刪除照片',
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
    this.axios.get(process.env.VUE_APP_API + '/banners/')
      .then(res => {
        if (res.data.success) {
          this.banners = res.data.result.map(item => {
            item.src = process.env.VUE_APP_API + '/photos/file/' + item.file
            return item
          })
          this.banners.reverse()
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
