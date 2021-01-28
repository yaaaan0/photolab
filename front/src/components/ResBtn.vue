<template lang="pug">
#resBtn
  v-btn.btn-1(v-if="user.account.length === 0" fab outlined medium to="/login")
    h6  登入註冊
  v-btn.btn-1(v-if="user.account.length > 0 && !user.account.includes('##')" fab outlined medium to="/user")
    h6  會員專區
  v-btn.btn-2(v-if="user.account.length > 0 && user.account.includes('##')" fab outlined medium to="/webmaster/allOrders" target='_blank')
    h6 網頁管理
  v-btn.btn-2(v-if="(user.account.length > 0 && !user.account.includes('##')) || user.account.length === 0" fab outlined medium to="/reserve")
    h6 預約
  </template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>
