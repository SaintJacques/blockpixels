<template>
  <v-snackbar v-model="snackbar" tile :color="this.$props.color">
    {{ errorMessage }}
    <template v-slot:action="{ attrs }">
      <v-btn color="black" text v-bind="attrs" @click="closeUp"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Error',
  props: {
    color: {
      type: String,
      default: 'amber accent-4',
    },
  },
  data: () => ({
    snackbar: false,
    errorMessage: '',
  }),
  mounted() {
    this.$nuxt.$on('new_error', (newErrorMessage) => {
      this.errorMessage = newErrorMessage
      this.snackbar = true
    })
  },
  methods: {
    closeUp() {
      this.snackbar = false
      this.errorMessage = ''
    },
  },
}
</script>
