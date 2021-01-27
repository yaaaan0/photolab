<template lang="pug">
  #allOrderInfo
    v-app
      v-card
        v-banner(single-line color='rgba(75, 69, 60,0.8)' dark)
          caption 訂單編號 ｜ {{order._id}}
        v-card-text.data.text-1.grey.lighten-4
          v-sheet.mx-auto(max-width='800' height='250')
              span 訂單日期 ｜ {{order.date}}
              span 拍攝項目 ｜ {{order.project}}
              span 預計拍攝日期 ｜ {{order.orderDate}}
              span 攝影師 ｜ {{order.photographer}}
              span
                P 付款狀態 ｜
                v-switch(v-if="paid === false" color="rgb(103, 125, 53)" disabled inset dense)
                .caption.fail(v-if="paid === false" @click="pay" color="#F44336") *尚未付款
                v-switch(v-if="paid === true" color="rgb(103, 125, 53)" input-value="true" disabled inset dense)
                .caption.success(v-if="paid === true" @click="pay") *付款成功
        v-card-text.text-2.grey.lighten-4
          v-sheet#chatRecord.mx-auto.x_auto(min-height='300' max-width='800' max-height='500px')
            div(v-for='(item, index) in messages')
              v-layout.webmaster
                v-textarea.msg(
                  v-if="!item.user_account.includes('##')"
                  filled
                  dense
                  rounded
                  auto-grow
                  rows="1"
                  name="input-7-1"
                  prepend-icon="mdi-account-circle"
                  :value='item.message'
                  :hint='item.date'
                  :prefix="item.user_name"
                  persistent-hint
                  readonly
                  color="rgb(107 102 96)"
                  )
                v-textarea.msg_web(
                  v-if="item.user_account.includes('##')"
                  background-color="rgba(255,255,255,0.4)"
                  filled
                  dense
                  rounded
                  auto-grow
                  rows="1"
                  name="input-7-1"
                  append-outer-icon="mdi-account-circle"
                  :value='item.message'
                  :hint='item.date'
                  :suffix="item.user_name"
                  persistent-hint
                  readonly
                  color="rgb(107 102 96)"
                  )
          div.mt-10
            v-text-field.sendMessage(
              v-model="message"
              label="message"
              append-outer-icon="mdi-send"
              @click:append-outer="sendMessage"
              @keyup.enter="sendMessage"
              filled
              dense
              rounded
              auto-grow
              rows="1"
              color="#677d35")
</template>

<script>
export default {
  name: 'AllOrderInfo',
  data () {
    return {
      id: this.$route.params.id,
      order: this.$route.query,
      paid: this.$route.query.paid,
      messages: [],
      message: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    pay () {
      if (this.paid === false) {
        this.paid = true
      } else {
        this.paid = false
      }
      this.axios.patch(process.env.VUE_APP_API + '/users/' + this.order._id, this.$data)
        .then(res => {
          if (res.data.success) {
            console.log(this.$data)
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
    },
    sendMessage () {
      this.axios.post(process.env.VUE_APP_API + '/messages/' + this.user.id + '/' + this.id, this.$data)
        .then(res => {
          if (res.data.success) {
            this.axios.get(process.env.VUE_APP_API + '/messages/' + this.id)
              .then(res => {
                if (res.data.success) {
                  this.messages = res.data.result
                } else {
                  this.$swal({
                    icon: 'error',
                    title: '錯誤',
                    text: res.data.message
                  })
                }
              })
              .catch(err => {
                if (err.response.data.message === '未登入') {
                  // 登出
                  this.$store.commit('logout')
                  // 導回首頁
                  if (this.$route.path !== '/login') {
                    this.$router.push('/login')
                  }
                }
                this.$swal({
                  icon: 'error',
                  title: '錯誤',
                  text: err.response.data.message
                })
              })
            this.message = ''
          }
        }).catch(err => {
          if (err.response.data.message === '未登入') {
            // 登出
            this.$store.commit('logout')
            // 導回首頁
            if (this.$route.path !== '/login') {
              this.$router.push('/login')
            }
          }
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: err.response.data.message
          })
        })

      this.$vuetify.goTo(this.target, this.options)
    }
  },
  updated () {
    // 聊天定位到底部
    const ele = document.getElementById('chatRecord')
    ele.scrollTop = ele.scrollHeight
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/')
      .then(res => {
        if (res.data.success) {
          // console.log(this.orders)
          // console.log(userData)
          // this.orders = res.data.result.orders.reverse()
        } else {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: res.data.message
          })
        }
      })
      .catch(err => {
        if (err.response.data.message === '未登入') {
          // 登出
          this.$store.commit('logout')
          // 導回首頁
          if (this.$route.path !== '/login') {
            this.$router.push('/login')
          }
        }
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: err.response.data.message
        })
      })
    this.axios.get(process.env.VUE_APP_API + '/messages/' + this.id)
      .then(res => {
        if (res.data.success) {
          this.messages = res.data.result
        }
      })
      .catch(err => {
        if (err.response.data.message === '未登入') {
          // 登出
          this.$store.commit('logout')
          // 導回首頁
          if (this.$route.path !== '/login') {
            this.$router.push('/login')
          }
        }
      })
  }
}
</script>
