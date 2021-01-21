<template lang="pug">
  #userMenu
    v-app
      v-btn-toggle(v-if="!user.account.includes('##')" rounded mandatory)
        v-btn(to="/user/data")
          v-icon mdi-account
          p 基本資料
        v-btn(to="/user/order")
          v-icon mdi-format-list-bulleted
          P 我的訂單
        v-btn(to="/user/favorite")
          v-icon mdi-folder-image
          p 收藏夾
        v-btn(@click='logout')
          v-icon mdi-logout
          p 登出
      v-btn-toggle(v-if="user.account.includes('##')" rounded)
        v-btn(to="/" target='_blank')
          v-icon mdi-home
          p 首頁
        //- v-btn(to="/webmaster/schedule")
        //-   v-icon mdi-film
        //-   P 攝影排程
        v-btn(to="/webmaster/allOrders")
          v-icon mdi-format-list-bulleted
          P 訂單資訊
        v-expand-transition
          .text-center
            v-menu(offset-y close-on-click dark v-show="expand" min-width="120px" open-on-hover)
              template(v-slot:activator='{ on, attrs }')
                v-btn(v-bind="attrs" v-on="on" to="/webmaster/editPages" depressed outlined @click="expand = !expand" )
                  v-icon mdi-book-open-page-variant-outline
                  p 頁面管理
              v-list
                v-list-item(v-for='(item, index) in items' :key='index')
                  v-list-item-title
                    v-btn(block small :to='(item.to)') {{ item.title }}
        v-btn(to="/webmaster/create")
          v-icon mdi-account
          p 管理員
        v-btn(@click='logout')
          v-icon mdi-logout
          p 登出
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: '首頁', to: '/webmaster/editPages/home' },
      { title: '最新消息', to: '/webmaster/editPages/new' },
      { title: '照相館', to: '/webmaster/editPages/photolab' }
    ],
    expand: false
  }),
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    click (item) {
      console.log(item)
      if (item === 0) {
        this.$router.push({ path: 'home', name: 'Home' })
      }
    },
    logout () {
      this.$swal({
        title: '是否要登出',
        showDenyButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.axios.delete(process.env.VUE_APP_API + '/users/logout')
            .then(res => {
              // 如果登出成功
              if (res.data.success) {
                this.$swal({
                  icon: 'success',
                  iconColor: '#00000',
                  title: '登出成功',
                  showConfirmButton: false,
                  timer: 1000
                })

                // 清除 vuex
                this.$store.commit('logout')

                // 導回首頁
                if (this.$route.path !== '/') {
                  this.$router.push('/')
                }
              } else {
                this.$swal({
                  icon: 'error',
                  title: '錯誤',
                  text: res.data.message
                })
              }
            })
            .catch(error => {
              // 如果回來的狀態碼不是 200，直接 alert 錯誤訊息
              this.$swal({
                icon: 'error',
                title: '錯誤',
                text: error.response.data.message
              })
            })
        }
      })
    }
  }
}
</script>
