<template lang="pug">
#about
  #content
    v-app
      vue-aos(animation-class='fadeIn animated')
        v-card.about
          kinesis-container
            kinesis-element(:strength='10')
              v-img(src='../assets/126326514_3530834480343077_5722785913041014548_o.jpg' width="500")
          pre
            h1 品 牌 故 事
            span story
            br
            br
            br
            p
              | 因為愛上攝影而踏上旅程的小雞，觀景窗帶領著她探索這個世界，這一路上她遇到各式各樣的人，也參與了許多故事。
              | 攝影陪著小雞一路成長，在每個故事的尾聲她總是收到人們贈與的信物，她小心翼翼地收藏著，她說那些都是情感所幻化 ...
              | ▍ 來自森林深處的松針
              | ▍ 爺爺口袋裡的松果
              | ▍ 北方國度的婚禮捧花
              | ▍ 詩唱班童帽上的羽毛
              | ▍ 哼著歌的男孩替女孩繫上的胸花
              | ▍ 偎在壁爐旁的奶奶手捻著麻繩
              | ▍ 南國妹妹摘的野生雛菊
              | ▍ 農場婦人收集穀物
              | ▍ 豐收季節的麥穗
              | ▍ 鑲滿累累果實的樹枝
              | 8年的旅程繞了一圈回到家鄉，收藏的信物也繞成了一個圓滿的花環，掛在牆上滿載著情感.....
      v-divider
      vue-aos(animation-class='fadeIn animated')
        v-card.about.concept.mb-10
          pre
            h1.concept 品 牌 理 念
            span.concept_span concept
            br
            p
            | GP Photolab | Garland Pheasant
            | 鏡頭就像是信物花環，透過它看到的世界，充滿歡笑淚水幸福的色彩，任何的美好畫面都將被這以『愛』為基礎的圓所裱框。
            |
            | 【Garland】
            | 花環在GP Photolab 的設定中，是情感的最高象徵。由各種素材環繞一圈都可稱之，因此它也是熱鬧、豐富、溫馨的象徵。
            | 花環，總是掛在每個家中的牆上，代表團圓、圓滿，我們服務無數家庭，在我心中卻都團聚成一個大家庭。
            |
            |【Pheasant】
            | 野雞，又稱雉雞，羽毛色澤極為漂亮，是鳳凰的原型。野雞是野生禽鳥，生命力及適應力強，對環境的要求不高，就像是我的心路歷程。
            | 對於攝影，一直都是用一股生命力與熱情去執行，並不愛專研器材跟動腦筋，無論怎樣的環境我都能繼續開心地投入拍照。
            | 雖然我很愛身著亮色感染周遭，那就像是野雞身上的羽毛，亮麗並不代表高貴，她依然嚮往最自然野生的生活，樸實的人們，南國的家。
            |
            | 【Photolab】
            | 是底片時代具有沖洗技術的照相館，在數位的現在也許是個很復古的說法，但我們是一群熱愛最原始的底片膠卷的人，
            | 工作室每個攝影師都會延續這樣的膠卷精神。
            |
            | 歡迎走進GP的照相館，讓我們為您拍張照吧！
      //- vue-aos(animation-class='fadeIn animated')
      //-   .marquee
      //-     vue-marquee.mt-15(style='height:500px; width="70vw' showprogress='false' duration ='25000')
      //-       vue-marquee-slide(v-for="(item, index) in lists", :key="index")
      //-         v-card.logo-bgcolor(width="600" hight="500")
      //-           h3 {{ item.name }}
      //-           v-avatar(size="10")
      //-             v-img(src='../assets/GPlogo.jpg')
      vue-aos(animation-class='fadeIn animated')
        v-sheet.mt-15.mb-15(color="rgb(231 219 202)")
          v-slide-group.pa-4(prev-icon="mdi-minus" next-icon="mdi-plus" show-arrows='always')
            v-slide-item.photography
              v-card.p2.ma-4(width="400px" href='https://www.facebook.com/GP.foto' target="_bank")
                v-row.fill-height(align='center' justify='center')
                  v-avatar(size="180")
                    v-img.photography_img(src='../assets/photography_GP.jpg')
                  .info
                    pre
                      | 雞皮 GP
                      | Photography
                    v-icon mdi-camera
                    v-icon mdi-facebook
            v-slide-item.photography
              v-card.p2.ma-4(width="400px" href='https://www.facebook.com/Jung.photolab/' target="_bank")
                v-row.fill-height(align='center' justify='center')
                  v-avatar(size="180")
                    v-img.photography_img(src='../assets/photography_jung.jpg')
                  .info
                    pre
                      | 榮格Jung
                      | Photography
                    v-icon mdi-camera
                    v-icon mdi-facebook
            v-slide-item.photography
              v-card.p2.ma-4(width="400px" href='https://www.facebook.com/Where11.foto' target="_bank")
                v-row.fill-height(align='center' justify='center')
                  v-avatar(size="180")
                    v-img.photography_img(src='../assets/photography_11.jpg')
                  .info
                    pre
                      | 壹壹where11
                      | Photography
                    v-icon mdi-camera
                    v-icon mdi-facebook
            v-slide-item.photography
              v-card.p2.ma-4(width="400px" href='https://www.facebook.com/dnypfrstyle/' target="_bank")
                v-row.fill-height(align='center' justify='center')
                  v-avatar(size="180")
                    v-img.photography_img(src='../assets/photography_bush.jpg')
                  .info
                    pre
                      | 刷牙
                      | Photography
                    v-icon mdi-camera
                    v-icon mdi-facebook

</template>

<script>
import VueAos from 'vue-aos'
export default {
  name: 'About',
  // data () {
  //   return {
  //     photography: [
  //       {
  //         name: '雞皮 GP',
  //         title: 'Photography',
  //         image: 'http://localhost:8080/img/photography_GP.8799c2bb.jpg',
  //         fb: 'https://www.facebook.com/GP.foto'
  //       },
  //       {
  //         name: '榮格Jung',
  //         title: 'Photography',
  //         image: 'http://localhost:8080/img/photography_jung.e7f68c2a.jpg',
  //         fb: 'https://www.facebook.com/Jung.photolab/'
  //       },
  //       {
  //         name: '壹壹where11',
  //         title: 'Photography',
  //         image: 'http://localhost:8080/img/photography_11.644781e4.jpg',
  //         fb: 'https://www.facebook.com/Where11.foto'
  //       },
  //       {
  //         name: '刷牙',
  //         title: 'Photography',
  //         image: 'http://localhost:8080/img/photography_bush.9f07f80d.jpg',
  //         fb: 'https://www.facebook.com/dnypfrstyle/'
  //       }
  //     ]
  //   }
  // },
  components: {
    VueAos
  }
}
</script>
