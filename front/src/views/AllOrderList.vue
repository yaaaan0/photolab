<template lang="pug">
  #allOrderList
    v-app
      v-data-table.elevation-1(
        :headers='headers'
        :items='orders'
        @click:row='handleRowClick')
        template(v-slot:item.paid='{ item }')
          v-switch(v-if="!item.paid" :value="check(item.paid)" color="rgb(103, 125, 53)" disabled inset)
          v-switch(v-if="item.paid" :value="check(item.paid)" color="rgb(103, 125, 53)" disabled input-value="true" inset)
        //- template(v-slot:item.state='{ item }')
        //-   v-switch(v-if="!item.state" :value="check(item.state)" color="rgb(103, 125, 53)" inset)
        //-   v-switch(v-if="item.state" :value="check(item.state)" color="rgb(103, 125, 53)" input-value="true" inset)
</template>

<script>
export default {
  name: 'AllOrderList',
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
        { text: '付款狀態', value: 'paid', sortable: false }
        // { text: '訂單狀態', value: 'state', sortable: false }
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
          name: 'AllOrderInfo'
        })
      console.log(item)
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
              arry[i].orders[j].user_id = arry[i]._id
              arry[i].orders[j].account = arry[i].account
              arry[i].orders[j].name = arry[i].name
              arry[i].orders[j].email = arry[i].email
              arry[i].orders[j].phoneNumber = arry[i].phoneNumber
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
