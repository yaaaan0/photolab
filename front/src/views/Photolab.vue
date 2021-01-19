<template lang="pug">
#photolab
  v-item-group(v-model="selected" multiple)
      v-layout(justify-center)
          div.grid
            Photoswipe(bubble)
              .item(v-masonry-tile v-for='(props, index) in imgsArr' :key="index")
                  v-card(width='300')
                    v-img(:src="props.src" v-pswp="props")
                  v-item(v-slot="{ active, toggle }")
                    v-form(@submit.prevent="onSubmit(props,active)")
                      v-btn(v-model="likeBtn" v-if="user.account.length > 0 " icon :value="{props, active}" @click="toggle" type="submit")
                        v-icon(:value="props.p_id" color='rgba(255, 255, 255, 0.7)') {{ active ? 'mdi-heart' : 'mdi-heart-outline' }}

</div>

</template>

<script>
import imagesloaded from 'imagesloaded'
import Masonry from 'masonry-layout'

export default {
  name: 'Photolab',
  data () {
    return {
      imgsArr: [],
      props: '',
      selected: [],
      like: false,
      active: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
    // likeBtn (props) {
    //   if (props.like === true) {
    //     return this.active
    //   }
    // }
  },
  methods: {
    onSubmit (props, active) {
      if (active === true) {
        props.like = true
        console.log(props)
        this.axios.post(process.env.VUE_APP_API + '/users/image/' + this.$store.state.user.id, props)
          .then(res => {
            if (res.data.success) {
              this.$swal({
                icon: 'success',
                title: '收藏',
                showConfirmButton: false,
                timer: 1000
              })
            } else {
              this.$swal({
                icon: 'error',
                title: '發生錯誤',
                text: res.data.message
              })
            }
          })
          .catch(err => {
            this.$swal({
              icon: 'error',
              title: '發生錯誤',
              text: err.response.data.message
            })
          })
      } else if (active === false) {

      }
      this.$swal({
        icon: 'success',
        iconColor: '#00000',
        title: '收藏',
        showConfirmButton: false,
        timer: 1000
      })
      console.log(props, active)
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
      }, 100)
    })
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/photos/')
      .then(res => {
        if (res.data.success) {
          this.imgsArr = res.data.result.map(item => {
            item.src = process.env.VUE_APP_API + '/photos/file/' + item.file
            item.p_id = item._id
            item.title = item.description
            item.like = ''
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
    this.axios.get(process.env.VUE_APP_API + '/users/image/' + this.user.id)
      .then(res => {
        if (res.data.success) {
          console.log(res.data.result.images)
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
