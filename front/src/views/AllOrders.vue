<template lang="pug">
  #allOrders
    v-app
      v-data-table.elevation-1(
        :headers='headers'
        :items='orders'
        @click:row='handleRowClick')
        template(v-slot:item.state='{ item }')
          v-switch(v-if="!item.state" :value="check(item.state)" disabled inset)
          v-switch(v-if="item.state" :value="check(item.state)" color="rgb(103, 125, 53)" input-value="true" disabled inset)
</template>

<script>
export default {
  name: 'AllOrders',
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
        { text: '使用者', value: 'name', sortable: false },
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
    },
    handleRowClick (item) {
      this.$router.push(
        {
          params: { id: item._id },
          query: item,
          name: 'OrderInfo'
        })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/')
      .then(res => {
        if (res.data.success) {
          const arry = res.data.result
          const userData = []
          for (let i = 0; i < arry.length; i++) {
            for (let j = 0; j < arry[i].orders.length; j++) {
              this.orders.push(arry[i].orders[j])
              userData.push(arry[i].name)
            }
          }
          console.log(this.orders)
          console.log(userData)
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
  }
}
</script>
