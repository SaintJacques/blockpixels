<template>
  <v-container>
    <v-row justify="center">
      <canvas
        :width="canvasSize"
        :height="canvasSize"
        @click="updatePixel($event)"
      />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Canvas',
  props: {
    canvasSize: {
      type: Number,
      required: true,
    },
    numberOfCells: {
      type: Number,
      required: true,
    },
    strokeStyle: {
      type: String,
      default: '#222222',
    },
  },
  data: () => ({
    cellSize: null,
    pixels: [],
    canvas: null,
    ctx: null,
    isUpdated: false,
    selectedColor: '#7d7d7d',
    unauthErrorMessage:
      'To start drawing, you need to log in to your wallet ❤️',
    blockErrorMessage: 'Wait until it updates, please 🤗',
    sameСolorsErrorMessage: 'Oh, I think you should change the color 😅',
  }),
  created() {
    this.$nuxt.$on('change_color', (newColor) => {
      this.selectedColor = newColor
    })
    this.$nuxt.$on('keep_the_updated_pixels', (newPixels) => {
      this.pixels = newPixels
      this.draw()
    })
    this.$nuxt.$on('loading-enable', (value) => {
      this.isUpdated = value
    })
  },
  async mounted() {
    this.cellSize = parseInt(this.$props.canvasSize / this.$props.numberOfCells)
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.$store.dispatch('getPixels')
  },
  methods: {
    draw: function () {
      this.pixels.map((row) =>
        row.map((cell) => {
          this.ctx.fillStyle =
            cell.color == 0
              ? `#${'0'.repeat(6)}`
              : `#${cell.color.toString(16)}`
          this.ctx.strokeStyle = this.$props.strokeStyle
          this.ctx.fillRect(
            cell.y_coord,
            cell.x_coord,
            this.cellSize,
            this.cellSize
          )
          this.ctx.strokeRect(
            cell.y_coord,
            cell.x_coord,
            this.cellSize,
            this.cellSize
          )
        })
      )
    },
    findIndex: function (xCoord, yCoord) {
      return [
        parseInt(yCoord / this.cellSize),
        parseInt(xCoord / this.cellSize),
      ]
    },
    updatePixel: function (e) {
      if (!this.$store.getters['isSignedIn']) {
        $nuxt.$emit('new_error', this.unauthErrorMessage)
        return
      }
      if (this.isUpdated) {
        $nuxt.$emit('new_error', this.blockErrorMessage)
        return
      }
      const rect = this.canvas.getBoundingClientRect()
      const [i, j] = this.findIndex(e.clientX - rect.left, e.clientY - rect.top)

      if (
        this.pixels[i][j].color ===
        parseInt(this.selectedColor.split('#')[1], 16)
      ) {
        $nuxt.$emit('new_error', this.sameСolorsErrorMessage)
        return
      }
      this.$store.dispatch('updatePixel', {
        x_coord: i,
        y_coord: j,
        new_color: parseInt(this.selectedColor.split('#')[1], 16),
      })
    },
  },
}
</script>
