<template lang="pug">
  #login
    v-item-group(mandatory)
      v-container
        v-row
          v-col(cols='12')
            v-item(v-slot='{ active, toggle }')
              v-card.d-flex.align-center( @click='toggle' )
                h4 LOG IN | 登入
                v-form(v-if="active" @submit.prevent="onSubmit")
                  v-container
                      v-col(cols="12")
                        v-text-field(
                        :state="accountState"
                        hint="At least 4 characters"
                        append-icon="mdi-account"
                        filled
                        rounded
                        label="Account")
                        v-text-field(
                        :state="passwordState"
                        hint="At least 8 characters"
                        filled
                        rounded
                        label="Password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1")
                        #div
                          v-checkbox(v-model='checkbox' :label='`Remember me`')
                          v-btn(type="submit" rounded color='primary' dark ) 登入
          v-col(cols='12')
            v-item(v-slot='{ active, toggle }')
              v-card.d-flex.align-center( @click='toggle' )
                h4 SIGN UP | 註冊
                v-form(v-if="active" @submit.prevent="onSubmit")
                  v-container
                      v-col(cols="12")
                        h5 CREATE ACCOUNT | 創建帳號
                        v-text-field(
                        :state="accountState"
                        hint="At least 4 characters"
                        append-icon="mdi-account"
                        filled
                        rounded
                        label="Account")
                        v-text-field(
                        :state="passwordState"
                        hint="At least 8 characters"
                        filled
                        rounded
                        label="Password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1")
                        h5 PERSONAL DATA | 個人資料
                        v-text-field(
                        append-icon="mdi-account-details"
                        filled
                        rounded
                        label="Name"
                        )
                        v-text-field(
                        append-icon="mdi-email"
                        filled
                        rounded
                        label="Email"
                        )
                        v-text-field(
                        append-icon="mdi-cellphone"
                        filled
                        rounded
                        label="Phone"
                        )
                        #div
                          v-checkbox(v-model='checkbox' :label='`Do you accept the`')
                          v-btn(v-if="checkbox" type="submit" rounded dark) 註冊
                          v-btn(v-else disabled rounded) 註冊

</template>

<script>
export default {
  name: 'Log',
  data () {
    return {
      account: '',
      password: '',
      name: '',
      email: '',
      phone: '',
      show1: false,
      checkbox: false
    }
  },
  computed: {
    accountState () {
      if (this.account.length === 0) {
        return null
      } else if (this.account.length >= 4 && this.account.length <= 20) {
        return true
      } else {
        return false
      }
    },
    passwordState () {
      if (this.password.length === 0) {
        return null
      } else if (this.password.length >= 8 && this.password.length <= 20) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onSubmit () {
      // 如果帳號密碼驗證通過
      if (this.accountState && this.passwordState) {
        this.axios.post(process.env.VUE_APP_API + '/users/', this.$data)
          .then(res => {
            if (res.data.success) {
              this.$swal({
                icon: 'success',
                title: '註冊成功',
                text: '歡迎加入線上相簿'
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
      }
    }
  }
}
</script>
