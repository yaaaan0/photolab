<template lang="pug">
  #orderInfo
    v-app
      v-card
        v-banner(single-line color='rgba(75, 69, 60,0.8)' dark)
          caption 訂單編號 ｜ {{order._id}}
        v-card-text.text-1.grey.lighten-4
          v-sheet.mx-auto(max-width='800' height='250')
            span 訂單日期 ｜ {{order.date}}
            span 拍攝項目 ｜ {{order.project}}
            span 預計拍攝日期 ｜ {{order.orderDate}}
            span 攝影師 ｜ {{order.photographer}}
            span
              P 付款狀態 ｜
              v-switch(v-if="order.paid === false" color="rgb(103, 125, 53)" disabled inset dense)
              .caption.fail(v-if="order.paid === false" color="#F44336") *尚未付款
              v-switch(v-if="order.paid === true" color="rgb(103, 125, 53)" input-value="true" disabled inset dense)
              .caption.success(v-if="order.paid === true") *付款成功
        v-card-text.text-2.grey.lighten-4
          v-sheet.mx-auto(max-width='800' height='100%')
            v-card.msg(v-for='(item, index) in messages')
              h2 {{item.message}}
              pre {{item.date}}
</template>

<script>
export default {
  name: 'OrderInfo',
  data () {
    return {
      id: this.$route.params.id,
      order: this.$route.query,
      messages: []
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/messages/' + this.id)
      .then(res => {
        if (res.data.success) {
          this.messages = res.data.result
        }
      })
  }
}
</script>
