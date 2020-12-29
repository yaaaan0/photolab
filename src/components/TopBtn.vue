<template lang="pug">
    #topBtn
        v-btn(
            elevation='5'
            icon
            href='#'
            @click="$vuetify.goTo(target, options)")
            v-icon mdi-chevron-up
</template>

<script>
import * as easings from 'vuetify/es5/services/goto/easing-patterns'

export default {
  data () {
    return {
      type: 'number',
      number: -1,
      duration: 1000,
      offset: 1000,
      easing: 'easeInOutCubic',
      easings: Object.keys(easings)
    }
  },
  computed: {
    target () {
      const value = this[this.type]
      if (!isNaN(value)) return Number(value)
      else return value
    },
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
