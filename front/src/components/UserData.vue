<template lang="pug">
  #userData
    v-card
      v-avatar(size="100")
        v-icon(size='100') mdi-account-circle
      v-card-text
        v-text-field(
            v-model='account'
            filled
            rounded
            readonly
            prefix=' 會員帳號｜')
        v-text-field(
            v-model="name"
            filled
            rounded
            readonly
            prefix=' 會員姓名｜')
        v-text-field(
            v-model="email"
            filled
            rounded
            readonly
            prefix=' 會員信箱｜')
        v-text-field(
            v-model="phoneNumber"
            filled
            rounded
            readonly
            prefix=' 手機號碼｜')
      v-card-actions
        v-btn(text @click='edit' rounded)
          v-icon mdi-pencil
</template>

<script>
export default {
  data () {
    return {
      edit: false,
      account: this.$store.state.user.account,
      name: this.$store.state.user.name,
      email: this.$store.state.user.email,
      phoneNumber: this.$store.state.user.phoneNumber
    }
  }
}
</script>
