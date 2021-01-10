<template lang="pug">
  #uOrder
    v-app
      v-data-table.elevation-1(
        :headers='headers'
        :items='orders'
        @click:row='handleRowClick')
        template(v-slot:item.state='{ item }')
          v-switch(:value="check(item.state)" disabled inset)
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      dialogDelete: false,
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
      orders: [],
      id: this.$route.params.id
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
    },
    handleRowClick (item) {
      this.$router.push({ path: `/user/order/${item._id}`, name: 'OrderInfo' })
      console.log(`/user/order/${item._id}`)
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
  }
}
</script>
