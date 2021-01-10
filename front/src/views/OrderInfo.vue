<template lang="pug">
  #orderInfo {{ orders._id }}
</template>

<script>
export default {
  name: 'OrderInfo',
  data () {
    return {
      order: {}
    }
  },
  methods: {
    orders: [
      {
        _id: '5ff87bb996a7d63a5777c946',
        orderDate: '2021-01-08',
        agreeStatement: true,
        date: '2021-01-23',
        project: '三套婚紗拍攝',
        photographer: '榮格',
        paid: false,
        state: false,
        messages: []
      },
      {
        _id: '5ff87bdd96a7d63a5777c947',
        orderDate: '2021-01-08',
        agreeStatement: true,
        date: '2021-05-05',
        project: '親子寫真',
        photographer: 'GP',
        paid: false,
        state: false,
        messages: []
      }
    ]

  },
  mounted () {
    this.order = this.orders(this.$route.params.id)
  }
}
</script>
