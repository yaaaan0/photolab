<template lang="pug">
#menu
    img.img-1(src='../assets/GPlogo.jpg')
    div.menu
      div.menu-logo
        img.img-2(src='../assets/logo-2.png')
      div.menu-btn
        v-btn( x-large text @click="overlay = !overlay" ) ｜ MENU ｜
    v-overlay(:z-index='zIndex' :value='overlay' :opacity="opacity")
      v-btn.white--text.btn-close(outlined fab @click='overlay = false') X
      v-btn.white--text(x-large text fixed rounded @click='overlay = false' to="/home") HOME ｜ ＧＰ首頁
      v-btn.white--text(x-large text fixed rounded @click='overlay = false' to="/about") ABOUT ｜ 品牌介紹
      v-btn.white--text(x-large text fixed rounded @click='overlay = false' to="/news") NEWS ｜ 最新消息
      v-btn.white--text(x-large text fixed rounded @click='overlay = false' to="/serive") SERIVE ｜ 服務內容
      v-btn.white--text(x-large text fixed rounded @click='overlay = false' to="/photolab") PHOTOLAB ｜ 照相館
      v-btn.white--text(x-large text fixed rounded @click='overlay = false' to="/reserve") RESERVE ｜ 我要預約
      //- v-btn.white--text(x-large text fixed rounded @click='overlay = false' to="/q&a") Q&A ｜ 常見問題

</template>

<script>
export default {
  data: () => ({
    opacity: 0.9,
    overlay: false,
    zIndex: 99
  })
}
</script>
