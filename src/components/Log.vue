<template lang="pug">
  #login
    v-item-group(mandatory)
      v-container
        v-row
          v-col(cols='12')
            v-item(v-slot='{ active, toggle }')
              v-card.d-flex.align-center( @click='toggle' )
                h4 LOG IN | 登入
                v-form(v-if="active")
                  v-container
                      v-col(cols="12")
                        v-text-field(
                        filled
                        rounded
                        label="Account")
                        v-text-field(
                        filled
                        rounded
                        label="Password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1")
                        #div
                          v-checkbox(v-model='checkbox' :label='`Remember me`')
                          v-btn( rounded color='primary' dark) 登入
          v-col(cols='12')
            v-item(v-slot='{ active, toggle }')
              v-card.d-flex.align-center( @click='toggle' )
                h4 SIGN UP | 註冊
                v-form(v-if="active")
                  v-container
                      v-col(cols="12")
                        v-text-field(
                        filled
                        rounded
                        label="Account")
                        v-text-field(
                        filled
                        rounded
                        label="Password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1")
                        #div
                          v-checkbox(v-model='checkbox' :label='`Remember me`')
                          v-btn( rounded color='primary' dark) 登入

</template>

<script>
export default {
  data () {
    return {
      show1: false,
      password: 'Password',
      checkbox: true
    }
  }
}
</script>
