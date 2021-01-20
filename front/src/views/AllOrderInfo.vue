<template lang="pug">
  #allOrderInfo
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
            span(v-if='!paid')
              P 付款狀態 ｜
              v-switch(color="rgb(103, 125, 53)" disabled inset dense)
              .caption.fail(@click="pay" color="#F44336") *尚未付款
            span(v-if='paid')
              P 付款狀態 ｜
              v-switch(color="rgb(103, 125, 53)" input-value="true" disabled inset dense)
              .caption.success(@click="pay") *付款成功
        v-card-text.text-2.grey.lighten-4
          v-sheet.mx-auto(max-width='800' height='500')
</template>

<script>
export default {
  name: 'AllOrderInfo',
  data () {
    return {
      id: this.$route.params.id,
      order: this.$route.query,
      paid: this.$route.query.paid
    }
  },
  methods: {
    pay () {
      if (this.paid === false) {
        this.$swal({
          title: '是否更改付款狀態',
          showDenyButton: true,
          confirmButtonText: 'Yes'
        })
        if (this.isConfirmed === true) {
          this.paid = true
        }
      } else {
        this.$swal({
          title: '是否更改付款狀態',
          showDenyButton: true,
          confirmButtonText: 'Yes'
        })

        if (this.isConfirmed === true) {
          this.paid = false
        }
      }
    }
  }
}
</script>
