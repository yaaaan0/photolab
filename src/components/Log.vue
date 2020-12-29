<template lang="pug">
  #login
    v-form
      v-container
          v-col(cols="12")
            h2 LOG IN
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
</template>

<script>
export default {
  data () {
    return {
      show1: false,
      password: 'Password'
    }
  }
}
</script>
