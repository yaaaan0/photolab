<template lang="pug">
  #userData
    v-card
      validation-observer(ref="observer" v-slot="{ invalid }")
          v-avatar(size="100")
            v-icon(size='100') mdi-account-circle
          v-card-text
            validation-provider(v-slot="{ errors }" name="Nmae" rules="required|max:10")
              v-text-field(
                v-model='account'
                filled
                rounded
                readonly
                prefix=' 會員帳號｜')
            validation-provider(v-slot="{ errors }" name="Nmae" rules="required|max:10")
              v-text-field(
                  v-model="name"
                  :error-messages="errors"
                  filled
                  rounded
                  :readonly="readonly"
                  prefix=' 會員姓名｜')
            validation-provider(v-slot="{ errors }" name="Email" rules="required|email")
              v-text-field(
                v-model="email"
                :error-messages="errors"
                filled
                rounded
                :readonly="readonly"
                prefix=' 會員信箱｜')
            validation-provider(v-slot="{ errors }" name="PhoneNumber" rules="required|digits:10")
              v-text-field(
                v-model="phoneNumber"
                :error-messages="errors"
                filled
                rounded
                :readonly="readonly"
                prefix=' 手機號碼｜')
          v-card-actions
            v-btn.edit(v-if="onEdit" @click="edit" text rounded)
              v-icon mdi-pencil
              p 編輯
            v-btn.save(v-if="!onEdit" :disabled="invalid" @click="save" text rounded)
              v-icon mdi-checkbox-marked-circle-outline
              p 確認
            v-btn.cancel(v-if="!onEdit" @click="cancel" text rounded)
              v-icon mdi-close-circle-outline
              p 取消
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
  data () {
    return {
      account: this.$store.state.user.account,
      name: this.$store.state.user.name,
      email: this.$store.state.user.email,
      phoneNumber: this.$store.state.user.phoneNumber,
      onEdit: true,
      readonly: true,
      text: false
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    edit () {
      this.onEdit = false
      this.readonly = false
      this.text = true
    },
    cancel () {
      this.onEdit = true
      this.readonly = true

      this.name = this.$store.state.user.name
      this.email = this.$store.state.user.email
      this.phoneNumber = this.$store.state.user.phoneNumber
    },
    save () {
      this.onEdit = true
      this.readonly = true

      this.axios.patch(process.env.VUE_APP_API + '/users/' + this.$store.state.user._id)
        .then(res => {
          if (res.data.success) {
            this.$swal({
              title: '確認資料是否正確',
              text: this.$data,
              showDenyButton: true,
              confirmButtonText: 'Yes'
            })
          } else {
            this.$swal({
              icon: 'error',
              title: '發生錯誤',
              text: res.data.message
            })

            this.name = this.$store.state.user.name
            this.email = this.$store.state.user.email
            this.phoneNumber = this.$store.state.user.phoneNumber
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: '發生錯誤',
            text: err.response.data.message
          })

          this.name = this.$store.state.user.name
          this.email = this.$store.state.user.email
          this.phoneNumber = this.$store.state.user.phoneNumber
        })
    }
  }
  // ,
  // mounted () {
  //   this.axios.get(process.env.VUE_APP_API + '/albums/user/' + this.user.id)
  //     .then(res => {
  //       if (res.data.success) {
  //         this.images = res.data.result.map(image => {
  //           image.src = process.env.VUE_APP_API + '/albums/file/' + image.file
  //           image.title = image.description
  //           image.edit = false
  //           image.model = image.description
  //           delete image.file
  //           delete image.description
  //           return image
  //         })
  //       } else {
  //         this.$swal({
  //           icon: 'error',
  //           title: '錯誤',
  //           text: res.data.message
  //         })
  //       }
  //     })
  //     .catch(err => {
  //       this.$swal({
  //         icon: 'error',
  //         title: '錯誤',
  //         text: err.response.data.message
  //       })
  //     })
  // }
}
</script>
