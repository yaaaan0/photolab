<template lang="pug">
  #editPagesPhotolab
    v-app
      v-btn(fab color='cyan accent-2' bottom left absolute @click='dialog = !dialog')
        v-icon mdi-plus
      v-dialog(v-model='dialog' max-width='500px' background-color='#ffffff')
          v-card-text
            v-file-input(label='圖片上傳' filled prepend-icon='mdi-camera' rounded color='#677d35')
            h5 攝影師
            v-chip-group(v-model='photographer' mandatory color="#677d35" )
              v-chip(value="GP") GP
              v-chip(value="榮格") 榮格
              v-chip(value="壹壹") 壹壹
              v-chip(value="刷牙") 刷牙
            h5 項目
            v-chip-group(v-model='photographer' mandatory color="#677d35")
              v-chip(value="婚紗") 婚紗
              v-chip(value="姊妹婚紗") 姊妹婚紗
              v-chip(value="孕媽咪" ) 孕媽咪
              v-chip(value="親子寫真") 親子寫真
              v-chip(value="情侶寫真") 情侶寫真
          v-card-actions
            v-spacer
            v-btn(text @click='dialog = false' rounded) Submit
      waterfall(:line-gap='200' :watch='items')
        waterfall-slot(v-for='(item, index) in items' :width='item.width' :height='item.height' :order='index' :key='item.id')
</template>

<script>
// 瀑布流
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

export default {
  name: 'EditPagesPhotolab',
  data () {
    return {
      dialog: false,
      items: []
    }
  },
  components: {
    Waterfall,
    WaterfallSlot
  },
  methode: {
    onSubmit () {
      if (this.item.size > 1024 * 1024) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '圖片太大'
        })
      } else if (!this.item.type.includes('image')) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '檔案格式錯誤'
        })
      } else {
        const fd = new FormData()
        fd.append('image', this.image)
        fd.append('descrziption', this.description)

        this.axios.post(process.env.VUE_APP_API + '/albums/', fd)
          .then(res => {
            if (res.data.success) {
              // 將新增的圖片塞進相簿陣列
              res.data.result.src = process.env.VUE_APP_API + '/albums/file/' + res.data.result.file
              res.data.result.title = res.data.result.description
              res.data.result.edit = false
              res.data.result.model = res.data.result.description
              delete res.data.result.file
              delete res.data.result.description
              this.images.push(res.data.result)
              // 送出後清空表單
              this.image = null
              this.description = ''
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
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/photos/')
      .then(res => {
        if (res.data.success) {
          const fd = new FormData()
          fd.append('items', this.items)
          this.items = res.data.result
          console.log(this.items)
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
