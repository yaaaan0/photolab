<template lang="pug">
#scrollEvent
  div
    v-row(justify='center' align='center')
      v-subheader Offset Top
      | {{ offsetTop }}
    v-container#scroll-target.overflow-y-auto(style='max-height: 400px')
      v-row(v-scroll:#scroll-target='onScroll' align='center' justify='center' style='height: 1000px')
</template>

<script>
export default {
  data: () => ({
    offsetTop: 1
  }),

  methods: {
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    }
  }
}
</script>
