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
      v-btn-toggle(v-if="user.account.includes('##')" rounded mandatory)
        v-btn(to="/webmaster/create")
          v-icon mdi-account
          p 管理員
        v-btn(to="/webmaster/schedule")
          v-icon mdi-format-list-bulleted
          P 攝影排程
        v-btn(to="/webmaster/allOrders")
          v-icon mdi-format-list-bulleted
          P 訂單資訊
        .text-center
          v-menu(offset-y)
            template(v-slot:activator='{ on, attrs }')
              v-btn(v-bind="attrs" v-on="on")
                v-icon mdi-folder-image
                p 頁面管理
            v-list
              v-list-item(v-for='(item, index) in items' :key='index')
                v-list-item-title {{ item.title }}
        v-btn(@click='logout')
          v-icon mdi-logout
          p 登出
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ]
  }),
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
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
