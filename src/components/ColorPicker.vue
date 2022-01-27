<template>
  <v-card width="auto" class="ma-2">
    <v-card-title>Choose a color</v-card-title>
    <v-card-text>
      <v-color-picker
        dot-size="25"
        swatches-max-height="200"
        v-model="selectedColor"
        @input="changeColor"
      ></v-color-picker>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ColorPicker',
  data: () => ({
    selectedColor: '#7d7d7d',
  }),
  methods: {
    changeColor: function () {
      $nuxt.$emit('change_color', this.selectedColor)
    },
  },
}
</script>

<style scoped></style>
