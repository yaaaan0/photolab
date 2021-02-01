<template lang="pug">
  #show_img
    v-app
      v-sheet( elevation="2" outlined shaped)
        Photoswip
          vueWaterfallEasy(:imgsArr="imgsArr")
            v-img(:src='props.src' v-pswp="props")
            .img-info(slot-scope="props")
              v-dialog(open-delay="5" transition="dialog-bottom-transition" max-width="500px" eager)
                template(v-slot:activator="{ on, attrs }")
                  v-btn.edit(fab text depressed absolute x-small v-bind="attrs" v-on="on" @click="edit(props)")
                    v-icon mdi-pencil
                template(v-slot:default="imgdialog")
                  v-form(@submit.prevent="onEditSubmit(props)")
                    v-card.editDialog
                      v-img(:src="props.value.src" width="430px" height="250px")
                      v-textarea.mt-5(v-model="description" outlined name='input-7-4' label='說明 (200字以內)' value='' color="#677d35" auto-grow counter="200" rows="1")
                      h5 攝影師
                      v-chip-group(v-model='photographer' mandatory)
                        v-chip(value="GP") GP
                        v-chip(value="榮格") 榮格
                        v-chip(value="壹壹") 壹壹
                        v-chip(value="刷牙") 刷牙
                      h5.mt-5 項目
                      v-chip-group(v-model='project' mandatory)
                        v-chip(value="婚紗") 婚紗
                        v-chip(value="姊妹婚紗") 姊妹婚紗
                        v-chip(value="孕媽咪" ) 孕媽咪
                        v-chip(value="親子寫真") 親子寫真
                        v-chip(value="情侶寫真") 情侶寫真
                      v-card-actions
                        //- v-btn.mt-5(@click="imgdialog.value = false" rounded text fab depressed left plain) 取消
                        v-btn.mt-5(@click="imgdialog.value = false" rounded text fab depressed left plain type="submit" ) 儲存
              v-btn.del(fab text depressed absolute x-small @click="del(props)")
                v-icon mdi-delete-outline
            div(slot='waterfall-over') end
        v-btn(fab bottom left absolute @click='create')
          v-icon mdi-plus
      v-dialog.create(v-model='dialog' max-width='500px' background-color='#ffffff')
        v-form(@submit.prevent="onSubmit")
          v-card-text
            img-inputer.mx-auto(
              v-model="image"
              icon="img"
              size="large"
              placeholder="請選擇圖片"
              bottom-text="點擊或拖曳更換圖片"
              :max-size="1024"
              exceedSizeText="檔案大小不能超過"
              accept="image/*"
            )
            v-textarea(v-model="description" outlined name='input-7-4' label='說明 (200字以內)' value='' color="#677d35" auto-grow counter="200" rows="1")
            h5 攝影師
            v-chip-group(v-model='photographer' mandatory)
              v-chip(value="GP") GP
              v-chip(value="榮格") 榮格
              v-chip(value="壹壹") 壹壹
              v-chip(value="刷牙") 刷牙
            h5 項目
            v-chip-group(v-model='project' mandatory)
              v-chip(value="婚紗") 婚紗
              v-chip(value="姊妹婚紗") 姊妹婚紗
              v-chip(value="孕媽咪" ) 孕媽咪
              v-chip(value="親子寫真") 親子寫真
              v-chip(value="情侶寫真") 情侶寫真
          v-card-actions
            v-spacer
            v-btn(type="submit" text @click='dialog = false' rounded) 送出
</template>

<script>
// 瀑布流
import vueWaterfallEasy from 'vue-waterfall-easy'

import { required, numeric } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('numeric', {
  ...numeric,
  message: '{_field_} needs to be {length} digits.'
})

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

export default {
  data () {
    return {
      headers: [
        {
          text: '預覽圖片',
          align: 'start',
          sortable: false,
          value: 'src'
        },
        { text: '攝影師', value: 'photographer', sortable: false },
        { text: '項目', value: 'project', sortable: false },
        { text: '標題', value: 'title', sortable: false },
        { text: '', value: 'delBtn', sortable: false }
      ],
      dialog: false,
      items: [],
      project: '',
      photographer: '',
      description: '',
      image: null,
      photoSize: '',
      imgsArr: [],
      fetchImgsArr: [],
      group: 0,
      pullDownDistance: 0,
      props: '',
      width: '',
      height: '',
      display: 'tab'
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    vueWaterfallEasy
  },
  methods: {
    // sizeState () {
    //   if (this.photoSize === 'landscape') {
    //     this.width = 1875
    //     this.height = 1250
    //   } else if (this.photoSize === 'portrait') {
    //     this.width = 1250
    //     this.height = 1875
    //   } else if (this.photoSize === 'resizing') {
    //     this.width = null
    //     this.height = null
    //   }
    // },
    create () {
      this.dialog = true

      this.image = null
      this.photographer = ''
      this.project = ''
      this.description = ''
    },
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
        fd.append('photographer', this.photographer)
        fd.append('project', this.project)
        fd.append('description', this.description)

        this.axios.post(process.env.VUE_APP_API + '/photos/', fd)
          .then(res => {
            if (res.data.success) {
              res.data.result.src = process.env.VUE_APP_API + '/photos/file/' + res.data.result.file
              res.data.result.edit = false
              res.data.result.imgdialog = false
              res.data.result.title = res.data.result.description
              delete res.data.result.description
              this.$swal({
                title: '上傳成功',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1000
              })
              this.imgsArr.splice(0, 0, res.data.result)
              console.log(res.data.result)
              // 送出後清空表單
              this.image = null
              this.photographer = ''
              this.project = ''
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
    },
    onEditSubmit (props) {
      this.axios.patch(process.env.VUE_APP_API + '/photos/' + props.value._id, this.$data)
        .then(res => {
          if (res.data.success) {
            props.value.edit = false
            props.value.project = res.data.result.project
            props.value.photographer = res.data.result.photographer
            props.value.description = res.data.result.description
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
    },
    edit (props) {
      props.value.edit = true
      props.value.imgdialog = true
      this.photographer = props.value.photographer
      this.project = props.value.project

      if (props.value.description === 'undefined') {
        this.description = ''
      } else {
        this.description = props.value.description
      }
    },
    del (props) {
      this.$swal({
        title: '是否要刪除',
        showDenyButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(process.env.VUE_APP_API + '/photos/' + props.value._id)
            .then(res => {
              if (res.data.success) {
                this.imgsArr.splice(props.index, 1)
                this.$swal({
                  title: '刪除照片',
                  showConfirmButton: false,
                  timerProgressBar: true,
                  timer: 1000
                })
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
    this.axios.get(process.env.VUE_APP_API + '/photos/')
      .then(res => {
        if (res.data.success) {
          this.imgsArr = res.data.result.map(item => {
            item.src = process.env.VUE_APP_API + '/photos/file/' + item.file
            item.edit = false
            item.imgdialog = false
            item.title = item.description
            return item
          })
          this.imgsArr.reverse()
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
