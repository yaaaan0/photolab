<template lang="pug">
  #uOrder
    v-app
      v-data-table.elevation-1(:headers='headers' :items='orders' calculate-widths sort-desc)
        template(v-slot:item.state='{ item }')
          //- v-dialog(v-model='dialog' max-width='500px')
          v-switch(:value="check(item.state)" disabled inset)

</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: '訂單編號',
          align: 'start',
          sortable: false,
          value: '_id'
        },
        { text: '訂單日期', value: 'orderDate', sortable: false },
        { text: '拍攝項目', value: 'project', sortable: false },
        { text: '預計拍攝日期', value: 'date', sortable: false },
        { text: '攝影師', value: 'photographer', sortable: false },
        { text: '訂單狀態', value: 'state', sortable: false }
      ],
      orders: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    check (state) {
      if (state === false) return 'false'
      else return 'true'
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/order/' + this.user.id)
      .then(res => {
        if (res.data.success) {
          console.log(res.data.result)
          this.orders = res.data.result.orders.reverse()
        } else {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: res.data.message
          })
        }
      })
      .catch(err => {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: err.response.data.message
        })
      })
  }
}
</script>
