<template lang="pug">
  #uFavorite
    v-app
      v-item-group(v-model="selected" multiple)
        v-layout(justify-center)
          div.grid
            Photoswipe(bubble)
              .item(v-masonry-tile v-for='(props, index) in imgsArr')
                  v-card(width='300')
                    v-img(:src="props.src" v-pswp="props")
                  v-item(v-slot="{ active, toggle }" :value="props.p_id")
                    v-form(@submit.prevent="onSubmit(props,active,index)")
                      v-btn(v-if="user.account.length > 0 " icon @click="toggle" type="submit")
                        v-icon(color='rgba(255, 255, 255, 0.7)') {{ active ? 'mdi-heart' : 'mdi-heart-outline' }}
</template>

<script>
import imagesloaded from 'imagesloaded'
import Masonry from 'masonry-layout'

export default {
  data () {
    return {
      imgsArr: [],
      props: '',
      selected: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    onSubmit (props, active, index) {
      if (active === false) {
        this.axios.delete(process.env.VUE_APP_API + '/users/image/' + this.$store.state.user.id + '/' + props.p_id)
          .then(res => {
            if (res.data.success) {
              this.$swal({
                title: '取消收藏',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1000
              })
              setTimeout(() => {
                this.imgsArr.splice(index, 1)
                const arry = res.data.result.images
                for (let i = 0; i < arry.length; i++) {
                  this.selected.push(arry[i].p_id)
                }
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
    }
  },
  updated () {
    const grid = document.querySelector('.grid')
    const msnry = new Masonry(grid, {
      itemSelector: '.item',
      fitWidth: 'true'
    })
    imagesloaded('.item', () => {
      setTimeout(() => {
        msnry.layout()
      }, 150)
    })
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/image/' + this.user.id)
      .then(res => {
        if (res.data.success) {
          this.imgsArr = res.data.result.images.map(item => {
            item.src = process.env.VUE_APP_API + '/photos/file/' + item.file
            item.title = item.description
            delete item.description
            return item
          })
          this.imgsArr.reverse()

          const arry = res.data.result.images
          for (let i = 0; i < arry.length; i++) {
            this.selected.push(arry[i].p_id)
          }
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
