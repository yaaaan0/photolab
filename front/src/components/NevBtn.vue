<template lang="pug">
#nevBtn
  v-bottom-navigation(grow)
    v-btn(to="/user")
      //- span Account
      v-icon mdi-account
    v-btn(to="/reserve")
      //- span Reserve
      v-icon mdi-chat-processing
    v-btn(to="/user/favorite")
      //- span Favorites
      v-icon mdi-folder-image
</template>
