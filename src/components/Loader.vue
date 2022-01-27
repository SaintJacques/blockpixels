<template>
  <v-progress-linear
    fixed
    color="black"
    buffer-value="0"
    stream
    height="15"
    :active="isActive"
  ></v-progress-linear>
</template>

<script>
export default {
  data: () => ({
    isActive: false,
  }),
  created() {
    this.$nuxt.$on('loading-enable', (value) => {
      this.isActive = value
    })
  },
}
</script>
