<template lang="pug">
#photolab
  Photoswipe(v-if="aaa" bubble)
    vueWaterfallEasy(ref="waterfall" :imgsArr="imgsArr" @scrollLoadImg="fetchImgsData" maxCols="6" @click="clickFn" @scrollReachBottom="getData" height="100vh")
      .img-info(slot-scope="props")
      v-img(:src="props.src" v-pswp="props")
      div(slot='waterfall-over') end
  v-layout(v-else justify-center)
    div.grid( v-masonry="containerId" transition-duration='0.5s' stagger="0.03s" resize="true"  fit-width='true')
      div(v-images-loaded:on.progress='imageProgress')
        .item(v-masonry-tile v-for='(props, index) in imgsArr')
          v-card(width="300")
            Photoswipe(bubble)
              v-img(:src="props.src" v-pswp="props" @load="$redrawVueMasonry('containerId')")
</div>

</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import imagesLoaded from 'vue-images-loaded'
import imagesloaded from 'imagesloaded'
import Masonry from 'masonry-layout'

export default {
  name: 'Photolab',
  directives: {
    imagesLoaded
  },
  data () {
    return {
      aaa: false,
      imgsArr: [],
      props: '',
      group: 0,
      fetchImgsArr: [],
      blocks: [],
      isLoaded: false,
      containerId: ''
    }
  },
  components: {
    vueWaterfallEasy
  },
  methods: {
    getData () {
      this.axios.get(process.env.VUE_APP_API + '/photos/?group=' + this.group)
        .then(res => {
          this.group++
          if (this.group === 5) {
            this.$refs.waterfall.waterfallOver()
            return
          }
          this.imgsArr = this.imgsArr.concat(res.data)
        })
    },
    // initImgsArr () {
    //   const arr = []
    //   for (let i = 0; i < this.imgsArr.length; i++) {
    //     arr.push({ src: this.imgsArr[i].src, link: '', info: '一些图片描述文字' })
    //   }
    //   console.log(arr)
    //   return arr
    // },

    // fetchImgsData () { // 获取新的图片数据的方法，用于页面滚动满足条件时调用
    //   this.imgsArr = this.imgsArr.concat(this.fetchImgsArr) // 数组拼接，把下一批要加载的图片放入所有图片的数组中
    // },
    // created () {
    //   this.imgsArr = this.initImgsArr(0, 10) // 初始化第一次（即页面加载完毕时）要加载的图片数据
    //   this.fetchImgsArr = this.initImgsArr(10, 20) // 模拟每次请求的下一批新的图片的数据数据
    // },
    created () {
      this.getData()
    },
    // imgErrorFn (imgItem) {
    //   console.log('圖片加載錯誤', imgItem)
    // },
    // clickFn (event, { index, value }) {
    //   if (event.target.tagName.toLowerCase() === 'img') {
    //     this.$swal({
    //       title: `點擊圖片${index}`
    //     })
    //   }
    // },
    clickFn (event, { index, value }) {
      this.$Pswp.open({
        items: [
          {
            src: value.src,
            title: value.title
          }
        ]
      })
    },
    imageProgress (instance, image) {
      this.loaded = image.isLoaded ? 'loaded' : 'broken'
    },
    onImgLoad () {
      this.isLoaded = true
    }
  },
  updated () {
    const grid = document.querySelector('.grid')
    const msnry = new Masonry(grid, {
      itemSelector: '.item',
      fitWidth: 'true'
    })
    imagesloaded('.item', () => {
      msnry.layout() // 图片加载完成后重新绘制。
      console.log('789')
    })
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/photos/')
      .then(res => {
        if (res.data.success) {
          this.imgsArr = res.data.result.map(item => {
            item.src = process.env.VUE_APP_API + '/photos/file/' + item.file
            item.edit = false
            item.imgdialog = false
            item.title = item.description
            delete item.description
            return item
          })
          console.log(this.imgsArr)
          console.log(this.imgsArr.length)
          this.$redrawVueMasonry()
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
