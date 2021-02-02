<template lang="pug">
#serive
  #content
    v-app
      v-btn-toggle(group)
        v-btn(href="#p1" @click="$vuetify.goTo('#1', options)")
          h4 自助婚紗攝影
        v-btn(href="#p2" @click="$vuetify.goTo('#2', options)")
          h4 自助單人婚紗攝影
        v-btn(href="#p3" @click="$vuetify.goTo('#3', options)")
          h4 自助姐妹婚紗攝影
        v-btn(href="#p4" @click="$vuetify.goTo('#4', options)")
          h4 自助孕媽咪寫真
        v-btn(href="#p5" @click="$vuetify.goTo('#5', options)")
          h4 自助親子寫真
        v-btn(href="#p6" @click="$vuetify.goTo('#6', options)")
          h4 自助情侶寫真
        v-btn(href="#p7" @click="$vuetify.goTo('#7', options)")
          h4 自助人像寫真
      vue-aos(animation-class='fadeIn animated')
        v-card#p1.serive_card.mb-10.mt-8
          .text.ma-10
            h1 自助婚紗攝影
            h5 時間長度不固定 · 請填寫預約單詢問方案內容
            br
            pre
              | 拍婚紗照對你們來說, 代表什麼？
              | 我認為它是一輩子只有一次的機會, 能夠透過另一個人來詮釋妳與他之間的情感;
              | 妳找的人必須可以透過紀錄, 說出妳與他之間的故事, 在往後數十年翻出回憶,
              | 依然喚起當時的幸福與堅定。
          .img
            v-img(src="../assets/123228514_3476356392457553_1705824380476565742_o.jpg" width="400px")
      vue-aos(animation-class='fadeIn animated')
        v-card#p2.serive_card.mb-10.mt-8
          .text.ma-10
            h1 自助單人婚紗攝影
            h5 時間長度不固定 · 請填寫預約單詢問方案內容
            br
            pre
              | 女孩, 從我們還是個小女孩時, 婚紗在我們眼裡就是個特別的存在,
              | 我們都曾偷偷幻想穿上它的模樣; 長大了 知道婚紗的意義,
              | 自然而然就會這麼想：“等到結婚時再穿吧!”
              | 但也許一直沒遇到對的人、沒等到對的時機、想等的實在太多...
              br
              br
              | 女生, 還是要多聽聽自己的聲音, 實現自己想要的。
              | 不必等到新郎的出現, 而是此時此刻就可以達成這樣的心願, 紀念當下的自己。
          .img
            v-img(src="../assets/個人2.jpg" width="400px")
      vue-aos(animation-class='fadeIn animated')
        v-card#p3.serive_card.mb-10.mt-8
          .text.ma-10
            h1 自助姐妹婚紗攝影
            h5 時間長度不固定 · 請填寫預約單詢問方案內容
            br
            pre
              | 拍姐妹婚紗對妳們來說, 代表什麼？
              | 我們會在意與家人、與愛人之間的留念, 但一直陪在身邊的姊妹,
              | 真正陪你走過一段段寂寞, 一起歡笑一起痛苦, 再一起成長;
              | 女孩之間的閨蜜情感, 姊妹獨有的親暱互動, 將在人生的影像中得到非凡意義的紀錄。
          .img
            v-img(src="../assets/姐妹.jpg" width="400px")
      vue-aos(animation-class='fadeIn animated')
        v-card#p4.serive_card.mb-10.mt-8
          .text.ma-10
            h1 自助孕媽咪寫真
            h5 時間長度不固定 · 請填寫預約單詢問方案內容
            br
            pre
              | 女性一生最獨特的美, 大概就是這時期。
              | 身體的線條變化、心境上的轉變...是女人一生最不一樣的時刻,
              | 感受迎接新生命的溫暖與柔情, 女人的自信來自不同的階段。懷孕的妳, 真的很美！
          .img
            v-img(src="../assets/孕媽咪.jpg" width="400px")
      vue-aos(animation-class='fadeIn animated')
        v-card#p5.serive_card.mb-10.mt-8
          .text.ma-10
            h1 自助親子寫真
            h5 時間長度不固定 · 請填寫預約單詢問方案內容
            br
            pre
              | 每個人心中都有一個家的存在, 記憶裡的我們是什麼模樣？
              | 讓攝影透過另一人寫下你們的家族史, 訴說你們的生動的表情, 留下無價的回憶。
          .img
            v-img(src="../assets/親子.jpg" width="400px")
      vue-aos(animation-class='fadeIn animated')
        v-card#p6.serive_card.mb-10.mt-8
          .text.ma-10
            h1 自助情侶寫真
            h5 時間長度不固定 · 請填寫預約單詢問方案內容
            br
            pre
              | 拍情侶寫真對你們來說, 代表什麼？
              | 妳知道妳看著他的時候是什麼模樣嗎？
              | 而他又是用什麼樣的情緒將妳放入眼底？
              | 指尖、肌膚的碰觸, 眼神的傳達, 低語的呢喃, 擁抱的氛圍。
              | 這些無數無數的小細節, 共同組成每對情侶之間獨一無二的浪漫愛情故事。
          .img
            v-img(src="../assets/情侶2.jpg" width="400px")
      vue-aos(animation-class='fadeIn animated')
        v-card#p7.serive_card.mb-10.mt-8
          .text.ma-10
            h1 自助人像寫真
            h5 時間長度不固定 · 請填寫預約單詢問方案內容
            br
            pre
              | 每段時期都有一個自己的模樣, 每一次快門, 都是過去的自己,
              | 在時間不可能倒轉的世界裡, 我們盡可能保留片段、拼湊著擁抱著生命。
              | 交出自我, 留下妳真正的模樣。
          .img
            v-img(src="../assets/個人.jpg" width="400px")
</template>

<script>
import VueAos from 'vue-aos'
import * as easings from 'vuetify/es5/services/goto/easing-patterns'

export default {
  name: 'Serive',
  data () {
    return {
      // type: 'number',
      // number: 9999,
      // selector: '#scroll-with-options',
      // duration: 1000,
      // offset: 1000,
      easing: 'easeInOutCubic',
      easings: Object.keys(easings)
    }
  },
  components: {
    VueAos
  },
  computed: {
    options () {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      }
    }
  }
}
</script>
