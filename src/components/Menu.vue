<template lang="pug">
#menu
    img.img-1(src='../assets/GPlogo.jpg' height='100' width='auto')
    div.menu
      div.menu-logo
        img.img-2(src='../assets/logo-2.png' height='100px' width='auto')
      div.menu-btn
        v-btn( x-large text fixed @click="overlay = !overlay" ) | MENU |
        v-overlay(:z-index='zIndex' :value='overlay')
          v-btn.white--text.btn-close(outlined fab @click='overlay = false') X
          v-btn.white--text(x-large text fixed rounded @click='overlay = false' to="home") HOME ｜ ＧＰ首頁
          v-btn.white--text(x-large text fixed rounded @click='overlay = false' to="about") ABOUT ｜ 品牌介紹
          v-btn.white--text(x-large text fixed rounded @click='overlay = false' to="serive") SERIVE ｜ 服務內容
          v-btn.white--text(x-large text fixed rounded @click='overlay = false' to="photolab") PHOTOLAB ｜ 照相館
          v-btn.white--text(x-large text fixed rounded @click='overlay = false' to="q&a") Q&A ｜ 常見問題

</template>

<script>
export default {
  data: () => ({
    overlay: false,
    zIndex: 0
  })
}
</script>
