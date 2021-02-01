<template lang="pug">
  #uOrder
    v-app
      v-data-table.elevation-1(
        :headers='headers'
        :items='orders'
        @click:row='handleRowClick')
        template(v-slot:item.state='{ item }')
          v-switch(v-if="!item.state" :value="check(item.state)" disabled inset)
          v-switch(v-if="item.state" :value="check(item.state)" color="rgb(103, 125, 53)" input-value="true" disabled inset)
        //- template(v-slot:item.messages_othersum='{ item }')
        //-   v-badge(value color="#cd5c5c" dot v-if='!item.messages[item.messages.length-1].user_account.includes("##")')
        //-     v-icon mdi-message-processing-outline
        //-   v-badge( color="#cd5c5c" dot v-if='item.messages[item.messages.length-1].user_account.includes("##")')
        //-     v-icon mdi-message-processing-outline
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
        { text: '訂單日期', value: 'orderDate', sortable: true },
        { text: '拍攝項目', value: 'project', sortable: false },
        { text: '預計拍攝日期', value: 'date', sortable: true },
        { text: '攝影師', value: 'photographer', sortable: false },
        { text: '訂單狀態', value: 'state', sortable: false }
        // { text: '', value: 'messages_othersum', sortable: false }
      ],
      orders: [],
      show: false
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
    this.axios.get(process.env.VUE_APP_API + '/users/order/' + this.user.id)
      .then(res => {
        if (res.data.success) {
          console.log(res.data.result)
          this.orders = res.data.result.orders.reverse()
          // for (let i = 0; i < this.orders.length; i++) {
          //   this.axios.get(process.env.VUE_APP_API + '/messages/' + this.orders[i]._id)
          //     .then(res => {
          //       if (res.data.success) {
          //         this.orders[i].messages = res.data.result
          //       }
          //     })
          //   this.axios.get(process.env.VUE_APP_API + '/messages/' + this.orders[i]._id + '/orderSum')
          //     .then(res => {
          //       if (res.data.success) {
          //         this.orders[i].messages_sum = res.data.result
          //       }
          //     })
          //   this.axios.get(process.env.VUE_APP_API + '/messages/' + this.orders[i]._id + '/orderUserSum')
          //     .then(res => {
          //       if (res.data.success) {
          //         this.orders[i].messages_usersum = res.data.result
          //       }
          //     })
          //   this.axios.get(process.env.VUE_APP_API + '/messages/' + this.orders[i]._id + '/orderWebmasterSum')
          //     .then(res => {
          //       if (res.data.success) {
          //         this.orders[i].messages_othersum = res.data.result
          //       }
          //     })
          // }
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
