<template lang="pug">
#resBtn
  v-btn.btn-1(v-if="user.id.length === 0" fab outlined medium to="login")
    h6  登入註冊
  v-btn.btn-1(v-if="user.id.length > 0" fab outlined medium to="user")
    h6  會員專區
  v-btn.btn-2(fab outlined medium to="reserve")
    h6 預約
  </template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      this.axios.delete(process.env.VUE_APP_API + '/users/logout')
        .then(res => {
          // 如果登出成功
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              title: '成功',
              text: '登出成功'
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
  }
}
</script>
