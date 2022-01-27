<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="8">
        <Canvas :canvas-size="600" :number-of-cells="50" />
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card width="auto" class="ma-2">
          <v-card-title>
            <a
              style="text-decoration: none"
              href="https://www.encode.club/near"
            >
              Encode NEAR Bootcamp
            </a>
            ❤️
          </v-card-title>
        </v-card>
        <ColorPicker />
        <v-card width="auto" class="ma-2">
          <v-card-title>
            <a
              style="text-decoration: none"
              href="https://github.com/SaintJacques/blockpixels"
            >
              <v-icon color="black">mdi-github</v-icon>
              Source code
            </a>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Canvas from '~/components/Canvas'
import ColorPicker from '~/components/ColorPicker'

export default {
  name: 'IndexPage',
  components: {
    Canvas,
    ColorPicker,
  },
}
</script>
