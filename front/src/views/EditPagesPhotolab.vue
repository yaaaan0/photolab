<template lang="pug">
  #editPagesPhotolab.show_tab(v-if="display ==='tab'")
    v-app
      .show
        p.mt-3 編輯模式
        v-btn-toggle(v-model='display' color='#677d35' rounded mandatory)
          v-btn(value='tab') 表格
          v-btn(value='img') 圖示
    ShowTab
  #editPagesPhotolab.show_img(v-else-if="display ==='img'")
    v-app
      .show
        p.mt-3 編輯模式
        v-btn-toggle(v-model='display' color='#677d35' rounded mandatory)
          v-btn(value='tab') 表格
          v-btn(value='img') 圖示
    ShowImg
</template>

<script>
import ShowImg from '../components/Show_img.vue'
import ShowTab from '../components/Show_tab.vue'

export default {
  name: 'EditPagesPhotolab',
  data () {
    return {
      display: 'tab'
    }
  },
  components: {
    ShowImg,
    ShowTab
  }
  // data () {
  //   return {
  //     headers: [
  //       {
  //         text: '預覽圖片',
  //         align: 'start',
  //         sortable: false,
  //         value: 'src'
  //       },
  //       { text: '攝影師', value: 'photographer', sortable: false },
  //       { text: '項目', value: 'project', sortable: false },
  //       { text: '標題', value: 'title', sortable: false },
  //       { text: '', value: 'delBtn', sortable: false }
  //     ],
  //     dialog: false,
  //     items: [],
  //     project: '',
  //     photographer: '',
  //     description: '',
  //     image: null,
  //     photoSize: '',
  //     imgsArr: [],
  //     fetchImgsArr: [],
  //     group: 0,
  //     pullDownDistance: 0,
  //     props: '',
  //     width: '',
  //     height: '',
  //     display: 'tab'
  //   }
  // },
  // computed: {
  //   user () {
  //     return this.$store.state.user
  //   }
  // },
  // components: {
  //   ValidationProvider,
  //   ValidationObserver,
  //   vueWaterfallEasy,
  //   ShowImg,
  //   ShowTab
  // },
  // methods: {
  //   create () {
  //     this.dialog = true

  //     this.image = null
  //     this.photographer = ''
  //     this.project = ''
  //     this.description = ''
  //   },
  //   onSubmit () {
  //     if (this.image.size > 1024 * 1024) {
  //       this.$swal({
  //         icon: 'error',
  //         title: '錯誤',
  //         text: '圖片太大'
  //       })
  //     } else if (!this.image.type.includes('image')) {
  //       this.$swal({
  //         icon: 'error',
  //         title: '錯誤',
  //         text: '檔案格式錯誤'
  //       })
  //     } else {
  //       const fd = new FormData()
  //       fd.append('image', this.image)
  //       fd.append('photographer', this.photographer)
  //       fd.append('project', this.project)
  //       fd.append('description', this.description)

  //       this.axios.post(process.env.VUE_APP_API + '/photos/', fd)
  //         .then(res => {
  //           if (res.data.success) {
  //             res.data.result.src = process.env.VUE_APP_API + '/photos/file/' + res.data.result.file
  //             res.data.result.edit = false
  //             res.data.result.imgdialog = false
  //             res.data.result.title = res.data.result.description
  //             delete res.data.result.description
  //             this.$swal({
  //               title: '上傳成功',
  //               showConfirmButton: false,
  //               timerProgressBar: true,
  //               timer: 1000
  //             })
  //             this.imgsArr.push(res.data.result)
  //             console.log(res.data.result)
  //             // 送出後清空表單
  //             this.image = null
  //             this.photographer = ''
  //             this.project = ''
  //             this.description = ''
  //           } else {
  //             this.$swal({
  //               icon: 'error',
  //               title: '錯誤',
  //               text: res.data.message
  //             })
  //           }
  //         })
  //         .catch(err => {
  //           this.$swal({
  //             icon: 'error',
  //             title: '錯誤',
  //             text: err.response.data.message
  //           })
  //         })
  //     }
  //   },
  //   onEditSubmit (props) {
  //     this.axios.patch(process.env.VUE_APP_API + '/photos/' + props.value._id, this.$data)
  //       .then(res => {
  //         if (res.data.success) {
  //           props.value.edit = false
  //           props.value.project = res.data.result.project
  //           props.value.photographer = res.data.result.photographer
  //           props.value.description = res.data.result.description
  //           this.$swal({
  //             title: '編輯成功',
  //             showConfirmButton: false,
  //             timerProgressBar: true,
  //             timer: 1000
  //           })
  //           console.log(this.$data)
  //         } else {
  //           this.$swal({
  //             icon: 'error',
  //             title: '錯誤',
  //             text: res.data.message
  //           })
  //         }
  //       })
  //       .catch(err => {
  //         this.$swal({
  //           icon: 'error',
  //           title: '錯誤',
  //           text: err.response.data.message
  //         })
  //       })
  //   },
  //   edit (props) {
  //     props.value.edit = true
  //     props.value.imgdialog = true
  //     this.photographer = props.value.photographer
  //     this.project = props.value.project

  //     if (props.value.description === 'undefined') {
  //       this.description = ''
  //     } else {
  //       this.description = props.value.description
  //     }
  //   },
  //   del (props) {
  //     this.$swal({
  //       title: '是否要刪除',
  //       showDenyButton: true,
  //       confirmButtonText: 'Yes'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.axios.delete(process.env.VUE_APP_API + '/photos/' + props.value._id)
  //           .then(res => {
  //             if (res.data.success) {
  //               this.imgsArr.splice(props.index, 1)
  //               this.$swal({
  //                 title: '刪除照片',
  //                 showConfirmButton: false,
  //                 timerProgressBar: true,
  //                 timer: 1000
  //               })
  //             } else {
  //               this.$swal({
  //                 icon: 'error',
  //                 title: '錯誤',
  //                 text: res.data.message
  //               })
  //             }
  //           })
  //           .catch(err => {
  //             this.$swal({
  //               icon: 'error',
  //               title: '錯誤',
  //               text: err.response.data.message
  //             })
  //           })
  //       }
  //     })
  //   }
  // },
  // mounted () {
  //   this.axios.get(process.env.VUE_APP_API + '/photos/')
  //     .then(res => {
  //       if (res.data.success) {
  //         this.imgsArr = res.data.result.map(item => {
  //           item.src = process.env.VUE_APP_API + '/photos/file/' + item.file
  //           item.edit = false
  //           item.imgdialog = false
  //           item.title = item.description
  //           return item
  //         })
  //         console.log(this.imgsArr)
  //       } else {
  //         this.$swal({
  //           icon: 'error',
  //           title: '錯誤',
  //           text: res.data.message
  //         })
  //       }
  //     })
  //     .catch(err => {
  //       if (err.response.data.message === '未登入') {
  //         // 登出
  //         this.$store.commit('logout')
  //         // 導回首頁
  //         if (this.$route.path !== '/login') {
  //           this.$router.push('/login')
  //         }
  //       }
  //       this.$swal({
  //         icon: 'error',
  //         title: '錯誤',
  //         text: err.response.data.message
  //       })
  //     })
  // }
}
</script>
