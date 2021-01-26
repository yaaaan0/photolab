<template lang="pug">
  #editPagesNew
    v-app
      v-btn.create.mt-15( width='200' dark rounded @click='create') 新增文章
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
          v-btn.ma-3(rounded dark color="rgba(103, 125, 53, 0.8)" @click="edit(item)") 編輯
          v-btn.ma-3(rounded dark color="rgba(212, 97, 68, 0.8)" @click="del(item, index)") 刪除
      v-dialog(v-model='dialog' max-width='500px' background-color='#ffffff' fullscreen hide-overlay transition="dialog-bottom-transition" scrollable)
        v-form(@submit.prevent="onSubmit")
          v-btn.ma-5( absolute right icon @click='close')
            v-icon mdi-close
          v-card-text.editPagesNew
            img-inputer.addimg.mx-auto(
              v-model="image"
              icon="img"
              size="large"
              placeholder="請選擇圖片"
              bottom-text="點擊或拖曳更換圖片"
              :max-size="1024"
              exceedSizeText="檔案大小不能超過"
              accept="image/*"
            )
            v-textarea(v-model="title" outlined name='input-7-4' label='標題' value='' color="#677d35" rows="2")
            v-textarea(v-model="content" outlined name='input-7-4' label='內容' value='' color="#677d35" rows="14")
            .btn
              v-btn(type="reset" text @click='reset' rounded) 重置
              v-btn(type="submit" text @click='dialog = false' rounded) 送出
      v-dialog(v-model='editDialog' max-width='500px' background-color='#ffffff' fullscreen hide-overlay transition="dialog-bottom-transition" scrollable)
        v-form(@submit.prevent="onEditSubmit(item)")
          v-btn.ma-5( absolute right icon @click='close')
            v-icon mdi-close
          v-card-text.editPagesNew
            img-inputer.addimg.mx-auto(
              v-model="image"
              ref="img"
              icon="img"
              size="large"
              placeholder="請選擇圖片"
              bottom-text="點擊或拖曳更換圖片"
              :max-size="1024"
              exceedSizeText="檔案大小不能超過"
              accept="image/*"
              :img-src='editsrc'
              @onChange="setFileChange"
            )
            v-textarea(v-model="title" outlined name='input-7-4' label='標題' value='' color="#677d35" rows="2")
            v-textarea(v-model="content" outlined name='input-7-4' label='內容' value='' color="#677d35" rows="14")
            .btn
              v-btn(type="reset" text @click='reset' rounded) 重置
              v-btn(type="submit" text rounded) 儲存
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
      item: [],
      image: null,
      dialog: false,
      editDialog: false,
      title: '',
      content: '',
      editsrc: null,
      change: false
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
        fd.append('title', this.title)
        fd.append('content', this.content)

        this.axios.post(process.env.VUE_APP_API + '/news/', fd)
          .then(res => {
            if (res.data.success) {
              res.data.result.src = process.env.VUE_APP_API + '/photos/file/' + res.data.result.file
              this.$swal({
                title: '上傳成功',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1500
              })

              this.axios.get(process.env.VUE_APP_API + '/news/')
                .then(res => {
                  if (res.data.success) {
                    this.news = res.data.result.map(item => {
                      item.src = process.env.VUE_APP_API + '/photos/file/' + item.file
                      return item
                    })
                    this.news.reverse()
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
    create () {
      this.dialog = true
      this.title = ''
      this.content = ''
      this.image = null
    },
    close () {
      this.dialog = false
      this.editDialog = false
      this.title = ''
      this.content = ''
      this.image = null
    },
    reset () {
      this.title = ''
      this.content = ''
      this.image = null
    },
    edit (item) {
      this.editDialog = true
      this.editsrc = item.src
      this.title = item.title
      this.content = item.content
      this.item = item
    },
    setFileChange (file, name) {
      // const imgurl = this.$refs.img.value
      // console.log(this.image)
      this.change = true
    },
    onEditSubmit (item) {
      this.editDialog = false
      if (this.change === true) {
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
          fd.append('title', this.title)
          fd.append('content', this.content)
          this.axios.patch(process.env.VUE_APP_API + '/news/' + this.item._id + '/imgEdit', fd)
            .then(res => {
              console.log(res.data)
              if (res.data.success) {
                this.item.title = res.data.result.title
                this.item.content = res.data.result.content
                this.item.src = this.$refs.img.dataUrl
                this.$swal({
                  title: '編輯成功',
                  showConfirmButton: false,
                  timerProgressBar: true,
                  timer: 1000
                })
                this.change = false
                this.editsrc = null
              } else {
                console.log(res.data)
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
      } else {
        this.axios.patch(process.env.VUE_APP_API + '/news/' + this.item._id + '/textEdit', this.$data)
          .then(res => {
            if (res.data.success) {
              this.item.title = res.data.result.title
              this.item.content = res.data.result.content
              this.$swal({
                title: '編輯成功',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1000
              })
              console.log(this.$data)
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
      console.log(index)
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
                  this.news.splice(index, 1)
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
