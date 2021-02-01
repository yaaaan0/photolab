<template lang="pug">
  #login
    v-app
      v-expansion-panels(v-model="model" mandatory tile)
        v-container
          validation-observer(ref="observer" v-slot="{ invalid }")
              v-col(cols='12')
                v-expansion-panel(value="login")
                    v-expansion-panel-header LOG IN ｜ 登入
                    v-expansion-panel-content
                      validation-observer
                        v-form( @submit.prevent="onLoginSubmit")
                          v-container
                              v-col(cols="12")
                                validation-provider(v-slot="{ errors }" name="Account" rules="required|max:20|min:4")
                                  v-text-field(
                                    color="#677d35"
                                  :state="accountState"
                                  v-model="account"
                                  :error-messages="errors"
                                  required
                                  append-icon="mdi-account"
                                  filled
                                  rounded
                                  label="Account")
                                validation-provider(v-slot="{ errors }" name="Password" rules="required|max:20|min:4")
                                  v-text-field(
                                  color="#677d35"
                                  :state="passwordState"
                                  v-model="password"
                                  :error-messages="errors"
                                  filled
                                  rounded
                                  label="Password"
                                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                  :type="show1 ? 'text' : 'password'"
                                  @click:append="show1 = !show1")
                                  #div
                                    v-checkbox( color="#000000" :label='`Remember me`')
                                    v-btn(type="submit" rounded dark ) 登入
              v-col(cols='12')
                v-expansion-panel(value="signup")
                    v-expansion-panel-header SIGN UP ｜ 註冊
                    v-expansion-panel-content
                      validation-observer
                        v-form(@submit.prevent="onSingupSubmit")
                          v-container
                              v-col(cols="12")
                                h5 CREATE ACCOUNT ｜ 創建帳號
                                validation-provider(v-slot="{ errors }" name="Account" rules="required|max:20|min:4")
                                  v-text-field(
                                  color="#677d35"
                                  :state="accountState"
                                  v-model="account"
                                  :error-messages="errors"
                                  required
                                  append-icon="mdi-account"
                                  filled
                                  rounded
                                  label="Account")
                                validation-provider(v-slot="{ errors }" name="Password" rules="required|max:20|min:4")
                                  v-text-field(
                                  color="#677d35"
                                  :state="passwordState"
                                  v-model="password"
                                  :error-messages="errors"
                                  required
                                  filled
                                  rounded
                                  label="Password"
                                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                  :type="show1 ? 'text' : 'password'"
                                  @click:append="show1 = !show1")
                                  h5 PERSONAL DATA ｜ 個人資料
                                validation-provider(v-slot="{ errors }" name="Nmae" rules="required|max:10")
                                  v-text-field(
                                  color="#677d35"
                                  v-model="name"
                                  :error-messages="errors"
                                  label="Name"
                                  append-icon="mdi-account-details"
                                  filled
                                  rounded
                                  )
                                validation-provider(v-slot="{ errors }" name="Email" rules="required|email")
                                  v-text-field(
                                  color="#677d35"
                                  v-model="email"
                                  :error-messages="errors"
                                  label="E-mail"
                                  required
                                  append-icon="mdi-email"
                                  filled
                                  rounded
                                  )
                                validation-provider(v-slot="{ errors }" name="PhoneNumber" rules="required|digits:10")
                                  v-text-field(
                                  color="#677d35"
                                  v-model="phoneNumber"
                                  :error-messages="errors"
                                  label="Phone Number"
                                  :counter="10"
                                  required
                                  append-icon="mdi-cellphone"
                                  filled
                                  rounded)
                                  //- v-app
                                  //-   v-switch(color="red" v-model='switch1' inset :label="`Switch 1: ${switch1.toString()}`")
                                  #div
                                    validation-provider(name="checkbox" v-slot="{ errors }" rules="required")
                                      v-checkbox(color="#000000" v-model='checkbox' type="checkbox" value="1" required label='Check your data')
                                    v-btn(type="submit" :disabled="invalid" rounded color="#000000" dark) 註冊
                                      //- v-btn(disabled rounded) 註冊

</template>

<script>
import { required, digits, email, max, regex, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits.'
})

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
})

extend('min', {
  ...min,
  message: '{_field_} at least {length} characters'
})

extend('regex', {
  ...regex,
  message: '{_field_} must be valid'
})

extend('email', {
  ...email,
  message: '{_field_} must be valid'
})

export default {
  name: 'Log',
  data () {
    return {
      account: '',
      password: '',
      name: '',
      email: '',
      phoneNumber: '',
      show1: false,
      featuresOpen: true,
      model: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
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
      } else if (this.password.length >= 4 && this.password.length <= 20) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onSingupSubmit () {
      this.$refs.observer.validate()

      // 如果帳號密碼驗證通過
      if (this.accountState && this.passwordState) {
        this.axios.post(process.env.VUE_APP_API + '/users/signup', this.$data)
          .then(res => {
            if (res.data.success) {
              this.$swal({
                icon: 'success',
                title: '註冊成功',
                showConfirmButton: false,
                timer: 1000
              }).then(() => {
                this.$router.push('/login')
                this.model = 'login'
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
    },
    onLoginSubmit () {
      this.$refs.observer.validate()

      // 如果帳號密碼驗證通過
      if (this.accountState && this.passwordState) {
        this.axios.post(process.env.VUE_APP_API + '/users/login', this.$data)
          .then(res => {
            if (res.data.success) {
              this.$store.commit('login', res.data.result)
              this.$swal({
                icon: 'success',
                title: '登入成功',
                showConfirmButton: false,
                timer: 1000
              }).then(() => {
                // sweet alert 對話框關掉後才跳到相簿頁
                this.$router.push('/home')
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
